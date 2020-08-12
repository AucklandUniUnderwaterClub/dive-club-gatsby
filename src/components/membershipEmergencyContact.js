import React from "react"
import { Form } from "react-bulma-components"
import { Input } from "./formUtils"
const { Field, Control, Label } = Form

const EmergencyContact = () => (
  <>
    <Field>
      <Label>Emergency Contact Name</Label>
      <Control>
        <Input name="emergency-name" />
      </Control>
    </Field>
    <Field>
      <Label>Relationship to you</Label>
      <Control>
        <Input name="emergency-relationship" />
      </Control>
    </Field>
    <Field>
      <Label>Emergency Contact Phone Number</Label>
      <Control>
        <Input name="emergency-phone" />
      </Control>
    </Field>
  </>
)

export default EmergencyContact
