import React from "react"
import { Form } from "react-bulma-components"
import * as yup from "yup"
import { Input } from "../formUtils"
const { Field, Control, Label, Help } = Form

export const schema = yup.object().shape({
  emergencyContactName: yup
    .string()
    .required("Emergency Contact Name is required"),
  emergencyContactRel: yup.string().required("Relationship is required"),
  emergencyContactPhone: yup
    .string()
    .required("Phone number is required")
    .min(6, "Number too short")
    .max(17, "Number too long")
    .matches(/\+?[()-\s\d]{6,16}/, {
      message: "Must be a valid phone number",
    }),
})

const EmergencyContact = ({ formContext: { register, errors } }) => (
  <>
    <Field>
      <Label>Emergency Contact Name</Label>
      <Control>
        <Input
          domRef={register}
          name="emergencyContactName"
          color={errors?.emergencyContactName && "danger"}
        />
        <Help color="danger">{errors?.emergencyContactName?.message}</Help>
      </Control>
    </Field>
    <Field>
      <Label>Relationship to you</Label>
      <Control>
        <Input
          domRef={register}
          name="emergencyContactRel"
          color={errors?.emergencyContactRel && "danger"}
        />
        <Help color="danger">{errors?.emergencyContactRel?.message}</Help>
      </Control>
    </Field>
    <Field>
      <Label>Emergency Contact Phone Number</Label>
      <Control>
        <Input
          domRef={register}
          name="emergencyContactPhone"
          color={errors?.emergencyContactPhone && "danger"}
        />
        <Help color="danger">{errors?.emergencyContactPhone?.message}</Help>
      </Control>
    </Field>
  </>
)

export default EmergencyContact
