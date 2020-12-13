import React from "react"
import { Content } from "react-bulma-components"

import Layout from "../components/layout"
import { BankDetails } from "../components/membership/paymentMethods"

export const MEMBER_ID_PARAM = "member"

const MembershipConfirmationPage = ({ location: { state, search } }) => {
  const searchParams = new URLSearchParams(search)
  const paid = searchParams.get("paid") === "true"
  // const requestId = searchParams.get("id")
  const membershipNo = state?.membershipNo
    ? state.membershipNo
    : searchParams.get(MEMBER_ID_PARAM)
  // TODO show bank/cash payment information if payment not confirmed
  // TODO better page interface?
  return (
    <Layout title={paid ? "Membership Confirmed!" : "Details Registered"}>
      <Content>
        {paid ? (
          <p>Payment Complete! Your membership is confirmed</p>
        ) : (
          <p>
            Thanks, we have registered your details. Membership is confirmed
            once payment is recieved. Ways to pay are listed on the website.
          </p>
        )}
        {membershipNo && (
          <p>
            Your Membership number {paid ? "is" : "will be"}:
            <b> {membershipNo}</b>
          </p>
        )}
        {state?.paymentMethod && (
          <p>
            Selected payment method: {state.paymentMethod}
            <pre>
              <BankDetails />
            </pre>
          </p>
        )}
        <p>You should recieve a confirmation email soon.</p>
      </Content>
    </Layout>
  )
}

export default MembershipConfirmationPage
