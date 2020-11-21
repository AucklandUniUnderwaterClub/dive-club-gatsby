import React, { useState } from "react"
import { navigate } from "gatsby"
import { loadStripe } from "@stripe/stripe-js"
import { v4 as uuid } from "uuid"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MembershipForm from "../components/membershipForm"
import { emailName } from "../components/membershipContactDetails"
import {
  CASH,
  CARD,
  TRANSFER,
  inputName as paymentMethodInputName,
} from "../components/membershipPaymentMethods"

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

/**
 * Communications with google appscripts can be interfered with by some browser plugins.
 * In particular: a response that has content may get stuck in limbo and the
 * code will wait forever. However an empty response is more likely to get through.
 * A partial work around is to generate an id client-side. Then if a request takes too long
 * the success of the request can be tested by empty HTTP 200 from a separate call.
 */
const id = new URLSearchParams(window.location.search).get("id") || uuid()

const doCardPayment = async (memberNo, email, setResponse) => {
  // TODO handle different prices
  // const stripe = await getStripe()
  const stripe = await stripePromise
  const { error } = await stripe.redirectToCheckout({
    mode: "payment",
    lineItems: [{ price: "price_1HCdo9HvqxNwufpjvJCzdk51", quantity: 1 }],
    successUrl: `${window.location.origin}/membership-confirmation/?id=${id}&paid=true`,
    cancelUrl: `${window.location.origin}/join-us/?id=${id}`,
    customerEmail: email,
    clientReferenceId: id,
  })
  if (error) console.error(error) // TODO handle stripe checkout error
}

const doManualPayment = paymentMethod => data => {
  navigate(`/membership-confirmation/?id=${id}`, {
    state: { paymentMethod: paymentMethod, membershipNo: data },
  })
}

const pay = {
  [CARD]: doCardPayment,
  [TRANSFER]: doManualPayment(TRANSFER),
  [CASH]: doManualPayment(CASH),
}

const submit = (setResponse, setIsLoading) => async e => {
  // TODO reliability: wait timeout and check submission
  e.preventDefault()
  setIsLoading(true)
  const data = Object.fromEntries(new FormData(e.currentTarget))
  console.log(JSON.stringify(data))
  const email = data[emailName]
  const paymentMethod = data[paymentMethodInputName]
  let response = await fetch(process.env.GATSBY_URL_SUBMIT_MEMBERSHIP, {
    method: "POST",
    cache: "no-cache",
    referrerPolicy: "no-referrer",
    redirect: "follow",
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    // TODO better UI error handle
    console.error("response not ok:", response)
    setResponse({ result: "error", response: response })
    setIsLoading(false)
    return
  }
  setData({ result: "ok", status: "awaiting resonse data" })
  const responseData = await response.json()
  console.log(responseData)
  pay[paymentMethod](responseData?.id, email, setResponse)
}

const JoinUsPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [membershipData, setMembershipData] = useState(null)
  return (
    <Layout title="Join Us">
      <SEO title="Join Us" />
      <MembershipForm
        submit={submit(setMembershipData, setIsSubmitting)}
        isLoading={isSubmitting}
        sessionId={id}
      />
      {membershipData && JSON.stringify(membershipData)}
    </Layout>
  )
}

export default JoinUsPage
