import React from "react"
import { Form } from "react-bulma-components"
import * as yup from "yup"
import { BooleanFieldRadioWithDetails } from "../formUtils"
const { Label } = Form

export const schema = yup.object().shape({
  hasMedicalConditions: yup
    .boolean()
    .required("Medical details are required")
    .typeError("Medical details are required"),
  medicalConditions: yup.string().when("hasMedicalConditions", {
    is: value => value,
    then: yup.string().required("Details are required"),
  }),
})

const MedicalDetails = ({ formContext }) => (
  <BooleanFieldRadioWithDetails
    formContext={formContext}
    radioName="hasMedicalConditions"
    detailsName="medicalConditions"
    detailsLabel="Give us Details"
  >
    <Label>
      Do you have any allergies or medical conditions we should know about?
    </Label>
    <p>
      Any allergy or medical condition you have is important to us, because if
      anything goes wrong we want to be in the best position possible to make
      sure everyone is safe and well. Failure to disclose any condition is at
      your own risk.
    </p>
  </BooleanFieldRadioWithDetails>
)

export default MedicalDetails
