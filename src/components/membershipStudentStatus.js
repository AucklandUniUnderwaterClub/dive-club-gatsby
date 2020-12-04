import React from "react"
import { Form } from "react-bulma-components"
import * as yup from "yup"
import { Input, Radio } from "./formUtils"
const { Field, Control, Label, Help } = Form

export const studentStatusName = "studentStatus"
export const isStudent = studentStatus =>
  studentStatus === "uoa" || studentStatus === "other-uni"

export const schema = yup.object().shape({
  [studentStatusName]: yup
    .string()
    .required("Please select your student status")
    .oneOf(
      ["uoa", "other-uni", "alumni", "non-student"],
      "Please select your student status"
    ),
  studentId: yup.string().when(studentStatusName, {
    is: isStudent,
    then: yup.string().required("Student ID is required"),
  }),
})

const StudentStatus = ({ formContext: { watch, register, errors } }) => {
  const status = watch(studentStatusName)
  return (
    <>
      <Field>
        <Label>Student Status</Label>
        <Control>
          <Radio domRef={register} name={studentStatusName} value="uoa">
            Student - UoA
          </Radio>
          <Radio domRef={register} name={studentStatusName} value="other-uni">
            Student - other Uni
          </Radio>
          <Radio domRef={register} name={studentStatusName} value="alumni">
            UoA Alumni*
          </Radio>
          <Radio domRef={register} name={studentStatusName} value="non-student">
            Non-Student
          </Radio>
          <Help color="danger">{errors?.[studentStatusName]?.message}</Help>
        </Control>
        <Help>
          <i>*only select Alumni if you graduated within the last 3 years.</i>
        </Help>
      </Field>
      {isStudent(status) && (
        <Field>
          <Label>Student ID</Label>
          <Control>
            <Input
              domRef={register}
              color={errors?.studentId && "danger"}
              placeholder="Student ID"
              name="studentId"
            />
            <Help color="danger">{errors?.studentId?.message}</Help>
          </Control>
        </Field>
      )}
    </>
  )
}

export default StudentStatus
