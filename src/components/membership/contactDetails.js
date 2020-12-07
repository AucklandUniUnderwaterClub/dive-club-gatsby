import React from "react"
import { Form } from "react-bulma-components"
import * as yup from "yup"
import StudentStatus, { schema as studentSchema } from "./studentStatus"
import { Radio, Input } from "../formUtils"
const { Field, Control, Label, Help } = Form

export const emailName = "email"

export const schema = yup
  .object()
  .shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    gender: yup
      .string()
      .required("Please select a gender")
      .oneOf(["male", "female", "other"], "Please select a gender"),
    phone: yup
      .string()
      .required("Phone number is required")
      .min(6, "Number too short")
      .max(17, "Number too long")
      .matches(/\+?[()-\s\d]{6,16}/, {
        message: "Must be a valid phone number",
      }),
    email: yup
      .string()
      .email("Email address must be valid")
      .required("Email address is required"),
  })
  .concat(studentSchema)

const ContactDetails = ({ formContext }) => {
  const { register, errors } = formContext
  return (
    <>
      <Label>Name</Label>
      <Field kind="group">
        <Control fullwidth>
          <Input
            domRef={register}
            color={errors?.firstName && "danger"}
            placeholder="First name"
            name="firstName"
          />
          <Help color="danger">{errors?.firstName?.message}</Help>
        </Control>
        <Control fullwidth>
          <Input
            domRef={register}
            color={errors?.lastName && "danger"}
            placeholder="Last name"
            name="lastName"
          />
          <Help color="danger">{errors?.lastName?.message}</Help>
        </Control>
      </Field>
      <Field>
        <Label>Gender</Label>
        <Control>
          <Radio domRef={register} name="gender" value="male">
            Male
          </Radio>
          <Radio domRef={register} name="gender" value="female">
            Female
          </Radio>
          <Radio domRef={register} name="gender" value="other">
            Other
          </Radio>
          <Help color="danger">{errors?.gender?.message}</Help>
        </Control>
      </Field>
      <Field>
        <Label>Phone</Label>
        <Control>
          <Input
            domRef={register}
            color={errors?.phone && "danger"}
            placeholder="Phone"
            name="phone"
          />
          <Help color="danger">{errors?.phone?.message}</Help>
        </Control>
        <Help>Mobile or Landline</Help>
      </Field>
      <Field>
        <Label>Email</Label>
        <Control>
          <Input
            domRef={register}
            color={errors?.[emailName] && "danger"}
            placeholder="Email"
            name={emailName}
          />
          <Help color="danger">{errors?.[emailName]?.message}</Help>
        </Control>
      </Field>
      <StudentStatus formContext={formContext} />
    </>
  )
}

export default ContactDetails
