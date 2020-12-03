import React from "react"
import { Form } from "react-bulma-components"
import { Select } from "./formUtils"
const { Field, Control, Label } = Form

const DiveExperience = () => (
  <>
    <Field>
      <Label>Certification</Label>
      <Control>
        <Select name="dive-certification">
          <option hidden aria-hidden value=""></option>
          <option value="none">Not Certified</option>
          <option value="open-water">Open Water</option>
          <option value="advanced">Advanced</option>
          <option value="rescue">Rescue</option>
          <option value="higher">Above Rescue</option>
        </Select>
      </Control>
    </Field>
  </>
)

export default DiveExperience
