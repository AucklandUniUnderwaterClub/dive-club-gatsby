import React, { useState } from "react"
import { graphql, navigate } from "gatsby"
import { loadStripe } from "@stripe/stripe-js"
import { v4 as uuid } from "uuid"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MembershipForm from "../components/membership/form"
import { emailName } from "../components/membership/contactDetails"
import {
  studentStatusName,
  isStudent,
} from "../components/membership/studentStatus"
import { MEMBER_ID_PARAM } from "../pages/membership-confirmation"
import {
  CASH,
  CARD,
  TRANSFER,
  inputName as paymentMethodInputName,
} from "../components/membership/paymentMethods"

let stripePromise = loadStripe(process.env.GATSBY_STRIPE_API_PUBLIC_KEY, {
  apiVersion: "2020-03-02",
})
// const getStripe = () => {
//   if (!stripePromise) {
//     stripePromise = loadStripe(process.env.GATSBY_STRIPE_API_PUBLIC_KEY, {
//       apiVersion: "2020-03-02",
//     })
//   }
//   return stripePromise
// }

const doCardPayment = async (
  clientReferenceId,
  memberNo,
  email,
  price,
  setResponse
) => {
  // const stripe = await getStripe()
  const stripe = await stripePromise
  const { error } = await stripe.redirectToCheckout({
    mode: "payment",
    lineItems: [{ price: price.id, quantity: 1 }],
    successUrl: `${window.location.origin}/membership-confirmation/?id=${clientReferenceId}&paid=true&${MEMBER_ID_PARAM}=${memberNo}`,
    cancelUrl: `${window.location.origin}/membership-confirmation/?id=${clientReferenceId}&paid=false&${MEMBER_ID_PARAM}=${memberNo}`,
    customerEmail: email,
    clientReferenceId: clientReferenceId,
  })
  if (error) {
    console.error(error)
    setResponse(`Payment error: ${error.message}`)
  }
}

const doManualPayment = paymentMethod => (
  clientReferenceId,
  memberNo,
  email
) => {
  navigate(`/membership-confirmation/?id=${clientReferenceId}`, {
    state: {
      paymentMethod: paymentMethod,
      membershipNo: memberNo,
      email: email,
    },
  })
}

const pay = {
  [CARD]: doCardPayment,
  [TRANSFER]: doManualPayment(TRANSFER),
  [CASH]: doManualPayment(CASH),
}

const submit = (clientReferenceId, setResponse, setIsLoading, prices) => async (
  data,
  e
) => {
  // TODO reliability: wait timeout and check submission
  setIsLoading(true)
  const email = data[emailName]
  const paymentMethod = data[paymentMethodInputName]
  const price = isStudent(data[studentStatusName])
    ? prices.student
    : prices.nonStudent
  try {
    let response = await fetch(process.env.GATSBY_URL_SUBMIT_MEMBERSHIP, {
      method: "POST",
      cache: "no-cache",
      referrerPolicy: "no-referrer",
      redirect: "follow",
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      // TODO better UI error handle
      console.error("error response:", response)
      setResponse(`Error: ${response}`)
      setIsLoading(false)
      return
    }
    setResponse("Recieving response...")
    const responseData = await response.json()
    console.log("response ok:", responseData)
    pay[paymentMethod](
      clientReferenceId,
      responseData?.id,
      email,
      price.stripe,
      setResponse
    )
  } catch (e) {
    console.error(e)
    setResponse("Oops, some error occured :(")
    setIsLoading(false)
  }
}

// TODO put price data merge somewhere else (with build time execution)
const mergePriceData = (pricePeriods, stripePrices) => {
  const currentPeriod = pricePeriods.find(
    period => period.startDate >= 0 && period.endDate <= 0
  )
  const nonStudentStripe = stripePrices.find(
    price => price.id === currentPeriod.nonStudentPriceStripeId
  )
  const studentStripe = stripePrices.find(
    price => price.id === currentPeriod.studentPriceStripeId
  )
  return {
    student: {
      price: currentPeriod.studentPrice.toFixed(2),
      stripe: {
        id: studentStripe?.id,
        price: (studentStripe?.unit_amount / 100).toFixed(2),
      },
    },
    nonStudent: {
      price: currentPeriod.nonStudentPrice.toFixed(2),
      stripe: {
        id: nonStudentStripe?.id,
        price: (nonStudentStripe?.unit_amount / 100).toFixed(2),
      },
    },
  }
}

const JoinUsPage = ({
  location,
  data: {
    allGoogleSpreadsheetMembershipPrices: { pricePeriods },
    allStripePrice: { stripePrices },
  },
}) => {
  /**
   * Communications with google appscripts can be interfered with by some browser plugins.
   * In particular: a response that has content may get stuck in limbo and the
   * code will wait forever. However an empty response is more likely to get through.
   * A partial work around is to generate an id client-side. Then if a request takes too long
   * the success of the request can be tested by empty HTTP 200 from a separate call.
   */
  const id = new URLSearchParams(location.search).get("id") || uuid()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionResponse, setSubmissionResponse] = useState(null)
  const prices = mergePriceData(pricePeriods, stripePrices)

  return (
    <Layout title="Join Us">
      <SEO title="Join Us" />
      <MembershipForm
        onSubmit={submit(id, setSubmissionResponse, setIsSubmitting, prices)}
        isLoading={isSubmitting}
        sessionId={id}
        prices={prices}
      />
      {submissionResponse && submissionResponse}
    </Layout>
  )
}

export const query = graphql`
  query {
    allGoogleSpreadsheetMembershipPrices {
      pricePeriods: nodes {
        startDate(difference: "days")
        endDate(difference: "days")
        studentPrice
        studentPriceStripeId
        nonStudentPrice
        nonStudentPriceStripeId
      }
    }
    allStripePrice(filter: { active: { eq: true } }) {
      stripePrices: nodes {
        id
        unit_amount
      }
    }
  }
`

export default JoinUsPage
