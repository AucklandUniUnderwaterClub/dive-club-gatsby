import React from "react"
import { Form } from "react-bulma-components"
import { Input } from "./formUtils"
const { Field, Control, Label } = Form

const EmergencyContact = () => (
  <>
    <Field>
      <Label>Emergency Contact Name</Label>
      <Control>
        <Input name="emergency-contact-name" />
      </Control>
    </Field>
    <Field>
      <Label>Relationship to you</Label>
      <Control>
        <Input name="emergency-contact-rel" />
      </Control>
    </Field>
    <Field>
      <Label>Emergency Contact Phone Number</Label>
      <Control>
        <Input name="emergency-contact-phone" />
      </Control>
    </Field>
  </>
)

export default EmergencyContact
