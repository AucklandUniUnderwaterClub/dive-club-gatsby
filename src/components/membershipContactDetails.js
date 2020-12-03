import React, { useState } from "react"
import { Form } from "react-bulma-components"
import { Radio, Input } from "./formUtils"
const { Field, Control, Label, Help, Radio: ControlledRadio } = Form

export const emailName = "email"
export const studentStatusName = "student-status"
export const isStudent = studentStatus =>
  studentStatus === "uoa" || studentStatus === "other-uni"

const StudentStatus = () => {
  const [status, setStatus] = useState(null)
  return (
    <>
      <Field>
        <Label>Student Status</Label>
        <Control>
          <ControlledRadio
            className="has-text-weight-medium"
            name={studentStatusName}
            value="uoa"
            checked={status === "uoa"}
            onChange={() => {
              setStatus("uoa")
            }}
          >
            Student - UoA
          </ControlledRadio>
          <ControlledRadio
            className="has-text-weight-medium"
            name={studentStatusName}
            value="other-uni"
            checked={status === "other-uni"}
            onChange={() => {
              setStatus("other-uni")
            }}
          >
            Student - other Uni
          </ControlledRadio>
          <ControlledRadio
            className="has-text-weight-medium"
            name={studentStatusName}
            value="alumni"
            checked={status === "alumni"}
            onChange={() => {
              setStatus("alumni")
            }}
          >
            UoA Alumni*
          </ControlledRadio>
          <ControlledRadio
            className="has-text-weight-medium"
            name={studentStatusName}
            value="non-student"
            checked={status === "non-student"}
            onChange={() => {
              setStatus("non-student")
            }}
          >
            Non-Student
          </ControlledRadio>
        </Control>
        <Help>
          <i>*only select Alumni if you graduated within the last 3 years.</i>
        </Help>
      </Field>
      {isStudent(status) && (
        <Field>
          <Label>Student ID</Label>
          <Control>
            <Input placeholder="Student ID" name="student-id" />
          </Control>
        </Field>
      )}
    </>
  )
}

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
    <StudentStatus />
  </>
)

export default ContactDetails
