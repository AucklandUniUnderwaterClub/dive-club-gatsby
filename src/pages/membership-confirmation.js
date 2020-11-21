import React from "react"
import Layout from "../components/layout"

const MembershipConfirmationPage = ({ location: { state, search } }) => {
  const searchParams = new URLSearchParams(search)
  const paid = searchParams.get("paid")
  const requestId = searchParams.get("id")
  const membershipNo = state?.membershipNo
    ? state.membershipNo
    : searchParams.get("membership")
  // TODO show bank/cash payment information if payment not confirmed
  // TODO better page interface?
  return (
    <Layout title={paid ? "Membership Confirmed!" : "Details Registered"}>
      {paid
        ? "Payment Complete! Your membership is confirmed"
        : "Thanks, we have registered your details."}
      <br />
      {membershipNo && (
        <>
          Your Membership number is: <b>{membershipNo}</b>
          <br />
        </>
      )}
      {state?.paymentMethod &&
        `Membership is confirmed once payment is recieved. Ways to pay are listed on the website. Selected payment method: ${state.paymentMethod}`}
      <br />
      You should recieve a confirmation email soon.
    </Layout>
  )
}

export default MembershipConfirmationPage
