import React from "react"
import { Form } from "react-bulma-components"
import { Radio, Input } from "./formUtils"
const { Field, Control, Label, Help } = Form

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
    <Label>Address</Label>
    <Field>
      <Control>
        <Input placeholder="Street Address" name="address-street" />
      </Control>
    </Field>
    <Field kind="group">
      <Control fullwidth>
        <Input placeholder="Suburb" name="address-suburb" />
      </Control>
      <Control fullwidth>
        <Input placeholder="City" name="address-city" />
      </Control>
    </Field>
    <Field kind="group">
      <Control fullwidth>
        <Input placeholder="Postcode" name="address-postcode" />
      </Control>
      <Control fullwidth>
        <Input placeholder="Country" name="address-country" />
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
        <Input placeholder="Email" name="email" />
      </Control>
    </Field>
    <Field>
      <Label>Date of Birth</Label>
      <Control>
        <input type="date" className="input" name="dob" />
      </Control>
    </Field>
    <Field>
      <Label>Student Status</Label>
      <Control>
        <Radio name="student" value="true">
          Student
        </Radio>
        <Radio name="student" value="false">
          Non-Student
        </Radio>
      </Control>
    </Field>
  </>
)

export default ContactDetails
