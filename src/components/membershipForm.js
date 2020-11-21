import React from "react"
import { Box, Button, Heading } from "react-bulma-components"
import ContactDetailsFields from "./membershipContactDetails"
import DiveExperienceFields from "./membershipDiveExperience"
import EmergencyContactFields from "./membershipEmergencyContact"
import MedicalDetailsFields from "./membershipMedicalDetails"
import MiscellaneousFields from "./membershipMiscQuestions"
import PaymentMethods from "./membershipPaymentMethods"

// TODO: Implement required fields/validation
const MembershipForm = ({ submit, isLoading, sessionId }) => (
  <form onSubmit={submit}>
    <input name="session-id" value={sessionId} hidden readOnly />
    <Box>
      <Heading>Contact Details</Heading>
      <ContactDetailsFields />
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
      <Heading>Miscellaneous Questions</Heading>
      <MiscellaneousFields />
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

export default MembershipForm
