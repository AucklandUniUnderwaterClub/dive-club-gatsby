import React from "react"
import { Box, Button, Heading } from "react-bulma-components"
import ContactDetailsFields from "./membershipContactDetails"
import DiveExperienceFields from "./membershipDiveExperience"
import EmergencyContactFields from "./membershipEmergencyContact"
import MedicalDetailsFields from "./membershipMedicalDetails"
import MiscellaneousFields from "./membershipMiscQuestions"

// TODO: Implement required fields/validation
const MembershipForm = ({ submit }) => (
  <form onSubmit={submit}>
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
    <Button type="submit" color="primary">
      Submit
    </Button>
  </form>
)

export default MembershipForm
