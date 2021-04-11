import React, { useState } from "react"
import { Content, Tabs, Form } from "react-bulma-components"
import * as yup from "yup"
import { Radio } from "../formUtils"
const { Field, Control } = Form

export const CARD = "card"
export const TRANSFER = "transfer"
export const CASH = "cash"
export const inputName = "payment-method"

export const schema = yup.object().shape({
  [inputName]: yup
    .string()
    .required("Please select a payment method")
    .oneOf([CARD, CASH, TRANSFER], "Please select a payment method"),
})

export const BankDetails = () => (
  <>
    Auckland University Underwater Club
    <br />
    06 0158 0352081 000 (ANZ Bank)
    <ul>
      <li>Particulars – Name</li>
      <li>Code – Membership Number</li>
      <li>Reference – "Membership"</li>
    </ul>
  </>
)

const MembershipPaymentMethod = ({ formContext: { register }, prices }) => {
  const [paymentMethod, setPaymentMethod] = useState(CARD)
  return (
    <>
      <Content>
        {prices && (
          <input
            name="amount-due"
            value={prices.price}
            ref={register}
            hidden
            readOnly
          />
        )}
        <p>Your membership will be confirmed once payment has been received.</p>
        <b>Total:</b> $
        {paymentMethod === CARD ? prices?.stripe.price : prices?.price}
        <p>Please select a payment method:</p>
      </Content>
      <Field>
        <Control>
          <Tabs type="boxed">
            <Tabs.Tab
              active={paymentMethod === CARD}
              onClick={() => {
                setPaymentMethod(CARD)
              }}
            >
              <Radio
                name={inputName}
                value={CARD}
                checked={paymentMethod === CARD}
                domRef={register}
                readOnly
              >
                Card
              </Radio>
            </Tabs.Tab>
            <Tabs.Tab
              active={paymentMethod === TRANSFER}
              onClick={() => {
                setPaymentMethod(TRANSFER)
              }}
            >
              <Radio
                name={inputName}
                value={TRANSFER}
                checked={paymentMethod === TRANSFER}
                domRef={register}
                readOnly
              >
                Bank Transfer
              </Radio>
            </Tabs.Tab>
            <Tabs.Tab
              active={paymentMethod === CASH}
              onClick={() => {
                setPaymentMethod(CASH)
              }}
            >
              <Radio
                name={inputName}
                value={CASH}
                checked={paymentMethod === CASH}
                domRef={register}
                readOnly
              >
                Cash/Card (In-person)
              </Radio>
            </Tabs.Tab>
          </Tabs>
        </Control>
        <Content>
          {paymentMethod === CARD && (
            <>
              <p>
                Pay with your Debit/Credit Card - small fee applies. Total
                including the fee: ${prices?.stripe.price}
              </p>
            </>
          )}
          {paymentMethod === TRANSFER && (
            <>
              <p>
                Make your payment directly into our bank account. Please use the
                following –
              </p>
              <pre>
                <BankDetails />
              </pre>
            </>
          )}
          {paymentMethod === CASH && (
            <div>
              <p>
                We prefer for people not to pay with cash but if this is the
                only way please:
                <br />
                Bring New Zealand Dollars (the exact amount) to any ANZ branch
                and ask to deposit a payment to
              </p>
              <pre>
                <BankDetails />
              </pre>
              <p>
                <i>
                  If you have no other option bring New Zealand Dollars (the
                  exact amount) to one of our regular club meetings.
                </i>
              </p>
            </div>
          )}
        </Content>
      </Field>
    </>
  )
}

export default MembershipPaymentMethod
