import React from "react"
import { Form } from "react-bulma-components"
import { Radio, Input } from "./formUtils"
const { Field, Control, Label, Help } = Form

export const emailName = "email"

const ContactDetails = () => (
  <>
    <Label>Name</Label>
    <Field kind="group">
      <Control fullwidth>
        <Input placeholder="First name" name="first-name" />
      </Control>
      <Control fullwidth>
        <Input placeholder="Last name" name="last-name" />
      </Control>
    </Field>
    <Field>
      <Label>Gender</Label>
      <Control>
        <Radio name="gender">Male</Radio>
        <Radio name="gender">Female</Radio>
        <Radio name="gender">Other</Radio>
      </Control>
    </Field>
    <Field>
      <Label>Phone</Label>
      <Control>
        <Input placeholder="Phone" name="phone" />
      </Control>
      <Help>Mobile or Landline</Help>
    </Field>
    <Field>
      <Label>Email</Label>
      <Control>
        <Input placeholder="Email" name={emailName} />
      </Control>
    </Field>
    <Field>
      <Label>Student Status</Label>
      {/* TODO change to select input, add student number input
       */}
      <Control>
        <Radio name="student-status" value="uoa">
          Student - UoA
        </Radio>
        <Radio name="student-status" value="other-uni">
          Student - other Uni
        </Radio>
        <Radio name="student-status" value="alumni">
          UoA Alumni*
        </Radio>
        <Radio name="student-status" value="non-student">
          Non-Student
        </Radio>
      </Control>
    </Field>
  </>
)

export default ContactDetails
