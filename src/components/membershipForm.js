import React from "react"
import { Box, Button, Heading } from "react-bulma-components"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import ContactDetailsFields, {
  schema as contactSchema,
} from "./membershipContactDetails"
import DiveExperienceFields from "./membershipDiveExperience"
import EmergencyContactFields from "./membershipEmergencyContact"
import MedicalDetailsFields from "./membershipMedicalDetails"
import PaymentMethods from "./membershipPaymentMethods"

const schema = contactSchema

const MembershipForm = ({ onSubmit, isLoading, sessionId }) => {
  const formContext = useForm({
    resolver: yupResolver(schema),
  })
  // console.log(formContext.errors)
  return (
    <form onSubmit={formContext.handleSubmit(onSubmit)}>
      <input name="session-id" value={sessionId} hidden readOnly />
      <Box>
        <Heading>Contact Details</Heading>
        <ContactDetailsFields formContext={formContext} />
      </Box>
      <Box>
        <Heading>Diving Experience</Heading>
        <DiveExperienceFields />
      </Box>
      <Box>
        <Heading>Emergency Contact Details</Heading>
        <EmergencyContactFields />
      </Box>
      <Box>
        <Heading>Medical Details</Heading>
        <MedicalDetailsFields />
      </Box>
      <Box>
        <Heading>Payment Method</Heading>
        <PaymentMethods />
      </Box>
      <Button type="submit" color="primary" loading={isLoading}>
        Submit
      </Button>
    </form>
  )
}

export default MembershipForm
