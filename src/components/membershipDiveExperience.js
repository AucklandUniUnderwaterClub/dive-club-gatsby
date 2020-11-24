import React from "react"
import { Form } from "react-bulma-components"
import { Input } from "./formUtils"
const { Field, Control, Label, Select } = Form
// TODO certification: not/OW/Adv/Rescue/above
const DiveExperience = () => (
  <>
    <Field>
      <Label>Certification</Label>
      <Control>
        <Input name="dive-certification" />
      </Control>
    </Field>
    {/* <Field>
      <Label>Subject</Label>
      <Control>
        <Select>
      <option>Select dropdown</option>
      <option>With options</option>
        </Select>
      </Control>
    </Field> */}
  </>
)

export default DiveExperience
