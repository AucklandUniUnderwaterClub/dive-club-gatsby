import React from "react"
import { Form } from "react-bulma-components"
import { BooleanFieldRadioWithDetails } from "./formUtils"
const { Label } = Form

const MedicalDetails = () => (
  <BooleanFieldRadioWithDetails
    radioName="has-medical-conditions"
    detailsName="medical-conditions"
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
