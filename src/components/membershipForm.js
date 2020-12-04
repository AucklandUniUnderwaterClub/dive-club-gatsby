import React from "react"
import { Box, Button, Heading } from "react-bulma-components"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import ContactDetailsFields, {
  schema as contactSchema,
} from "./membershipContactDetails"
import DiveExperienceFields, {
  schema as diveXpSchema,
} from "./membershipDiveExperience"
import EmergencyContactFields, {
  schema as emergencySchema,
} from "./membershipEmergencyContact"
import MedicalDetailsFields, {
  schema as medicalSchema,
} from "./membershipMedicalDetails"
import PaymentMethods, {
  schema as paymentSchema,
} from "./membershipPaymentMethods"

const schema = contactSchema
  .concat(diveXpSchema)
  .concat(emergencySchema)
  .concat(medicalSchema)
  .concat(paymentSchema)

const MembershipForm = ({ onSubmit, isLoading, sessionId }) => {
  const formContext = useForm({
    resolver: yupResolver(schema),
  })
  // console.log(formContext.errors)
  return (
    <form onSubmit={formContext.handleSubmit(onSubmit)}>
      <input
        name="session-id"
        ref={formContext.register}
        value={sessionId}
        hidden
        readOnly
      />
      <Box>
        <Heading>Contact Details</Heading>
        <ContactDetailsFields formContext={formContext} />
      </Box>
      <Box>
        <Heading>Diving Experience</Heading>
        <DiveExperienceFields formContext={formContext} />
      </Box>
      <Box>
        <Heading>Emergency Contact Details</Heading>
        <EmergencyContactFields formContext={formContext} />
      </Box>
      <Box>
        <Heading>Medical Details</Heading>
        <MedicalDetailsFields formContext={formContext} />
      </Box>
      <Box>
        <Heading>Payment Method</Heading>
        <PaymentMethods formContext={formContext} />
      </Box>
      <Button type="submit" color="primary" loading={isLoading}>
        Submit
      </Button>
    </form>
  )
}

export default MembershipForm
