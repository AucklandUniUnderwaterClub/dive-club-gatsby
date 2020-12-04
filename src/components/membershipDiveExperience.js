import React from "react"
import { Form } from "react-bulma-components"
import * as yup from "yup"
import { Select } from "./formUtils"
const { Field, Control, Label, Help } = Form

export const schema = yup.object().shape({
  diveCertification: yup
    .string()
    .required("Please select an experience level")
    .oneOf(
      ["none", "open-water", "advanced", "rescue", "higher"],
      "Please select an experience level"
    ),
})

const DiveExperience = ({ formContext: { register, errors } }) => (
  <>
    <Field>
      <Label>Certification</Label>
      <Control>
        <Select
          domRef={register}
          color={errors?.diveCertification && "danger"}
          name="diveCertification"
        >
          <option hidden aria-hidden value=""></option>
          <option value="none">Not Certified</option>
          <option value="open-water">Open Water</option>
          <option value="advanced">Advanced</option>
          <option value="rescue">Rescue</option>
          <option value="higher">Above Rescue</option>
        </Select>
        <Help color="danger">{errors?.diveCertification?.message}</Help>
      </Control>
    </Field>
  </>
)

export default DiveExperience
