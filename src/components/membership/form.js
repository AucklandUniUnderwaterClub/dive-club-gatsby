import React from "react"
import { Box, Button, Content, Heading } from "react-bulma-components"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import ContactDetailsFields, { schema as contactSchema } from "./contactDetails"
import DiveExperienceFields, { schema as diveXpSchema } from "./diveExperience"
import EmergencyContactFields, {
  schema as emergencySchema,
} from "./emergencyContact"
import MedicalDetailsFields, { schema as medicalSchema } from "./medicalDetails"
import PaymentMethods, { schema as paymentSchema } from "./paymentMethods"
import { studentStatusName, isStudent } from "./studentStatus"

const schema = contactSchema
  .concat(diveXpSchema)
  .concat(emergencySchema)
  .concat(medicalSchema)
  .concat(paymentSchema)

const MembershipForm = ({ onSubmit, isLoading, sessionId, prices }) => {
  const formContext = useForm({
    resolver: yupResolver(schema),
  })
  const studentStatus = formContext.watch(studentStatusName)
  const price = studentStatus
    ? (
        (isStudent(studentStatus) ? prices.student : prices.nonStudent)
          .unit_amount / 100
      ).toFixed(2)
    : null
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
        {price && (
          <Content>
            <input
              name="amount-due"
              value={price}
              ref={formContext.register}
              hidden
              readOnly
            />
            <b>Total:</b> ${price}
          </Content>
        )}
      </Box>
      <Button type="submit" color="primary" loading={isLoading}>
        Submit
      </Button>
    </form>
  )
}

export default MembershipForm
