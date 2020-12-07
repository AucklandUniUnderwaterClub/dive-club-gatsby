import React, { useState } from "react"
import { navigate } from "gatsby"
import { loadStripe } from "@stripe/stripe-js"
import { v4 as uuid } from "uuid"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MembershipForm from "../components/membership/form"
import { emailName } from "../components/membership/contactDetails"
import { MEMBER_ID_PARAM } from "../pages/membership-confirmation"
import {
  CASH,
  CARD,
  TRANSFER,
  inputName as paymentMethodInputName,
} from "../components/membership/paymentMethods"

let stripePromise = loadStripe(process.env.GATSBY_STRIPE_API_KEY, {
  apiVersion: "2020-03-02",
})
// const getStripe = () => {
//   if (!stripePromise) {
//     stripePromise = loadStripe(process.env.GATSBY_STRIPE_API_KEY, {
//       apiVersion: "2020-03-02",
//     })
//   }
//   return stripePromise
// }

const doCardPayment = async (
  clientReferenceId,
  memberNo,
  email,
  setResponse
) => {
  // TODO handle different prices
  // const stripe = await getStripe()
  const stripe = await stripePromise
  const { error } = await stripe.redirectToCheckout({
    mode: "payment",
    lineItems: [{ price: "price_1HCdo9HvqxNwufpjvJCzdk51", quantity: 1 }],
    successUrl: `${window.location.origin}/membership-confirmation/?id=${clientReferenceId}&paid=true&${MEMBER_ID_PARAM}=${memberNo}`,
    cancelUrl: `${window.location.origin}/join-us/?id=${clientReferenceId}`,
    customerEmail: email,
    clientReferenceId: clientReferenceId,
  })
  if (error) {
    console.error(error)
    setResponse({ result: "error", message: error.message })
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
  console.log(data)
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
    setResponse({ result: "error", response: response })
    setIsLoading(false)
    return
  }
  setResponse({ result: "ok", status: "awaiting response data" })
  const responseData = await response.json()
  console.log("response ok:", responseData)
  pay[paymentMethod](clientReferenceId, responseData?.id, email, setResponse)
}

const JoinUsPage = ({ location }) => {
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
  return (
    <Layout title="Join Us">
      <SEO title="Join Us" />
      <MembershipForm
        onSubmit={submit(id, setSubmissionResponse, setIsSubmitting)}
        isLoading={isSubmitting}
        sessionId={id}
      />
      {submissionResponse && JSON.stringify(submissionResponse)}
    </Layout>
  )
}

export default JoinUsPage
