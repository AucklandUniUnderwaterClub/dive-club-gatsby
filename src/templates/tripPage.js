import React from "react"
import { graphql } from "gatsby"
import moment from "moment"
import { Heading } from "react-bulma-components"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data: { trip } }) => (
  <Layout title={trip.title}>
    <SEO title={trip.title} />
    <Heading className="has-text-centered">
      {moment(trip.startDate).format("dddd D MMMM")}
      {trip.endDate &&
        trip.startDate !== trip.endDate &&
        ` - ${moment(trip.endDate).format("dddd D MMMM")}`}
    </Heading>
    <Heading subtitle size={5} className="has-text-centered">
      {trip.daysDiving && `Number of Days Diving: ${trip.daysDiving}`}
    </Heading>
    {/* TODO: page formatting */}
    <br />
    Skill: {trip.skill}
    <br />
    Type: {trip.type}
    <br />
    Cost: {trip.cost}
    <br />
    Location: {trip.diveLocation}
    <br />
    Semester: {trip.semester}
    <br />
    ...
  </Layout>
)

export const query = graphql`
  query($parentId: String) {
    trip: googleSpreadsheetTrips(id: { eq: $parentId }) {
      title
      startDate
      endDate
      cost
      daysDiving
      diveLocation
      skill
      semester
      type
    }
  }
`
