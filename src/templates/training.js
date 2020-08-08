import React, { useState } from "react"
import { graphql } from "gatsby"
import { Content, Table } from "react-bulma-components"
import Layout from "../components/layout"
import VerticalTabs from "../components/VerticalTabs"
import SEO from "../components/seo"

export default ({ data: { page, training } }) => {
  const [selectedCourseIndex, setSelectedCourse] = useState(0)

  return (
    <Layout title={page.document.name}>
      <SEO title={page.document.name} />
      <Content
        dangerouslySetInnerHTML={{ __html: page.childMarkdownRemark.html }}
      />
      <Content>
        <h1>Open Water Courses</h1>
        TODO: vertical tabs
      </Content>
      <VerticalTabs
        activeIndex={selectedCourseIndex}
        setActiveIndex={setSelectedCourse}
        tabs={training.courses.map(({ course }) => `Course ${course}`)}
      />
      {/* <h3>Course: {training.courses[selectedCourseIndex].course}</h3> */}
      <Table>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {training.courses[selectedCourseIndex].nodes.map(
            ({ activity, date, time, location }) => (
              <tr key={activity}>
                <td>{activity}</td>
                <td>{date}</td>
                <td>{time}</td>
                <td>{location}</td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </Layout>
  )
}

export const query = graphql`
  query($path: String) {
    page: googleDocs(document: { path: { eq: $path } }) {
      document {
        name
      }
      childMarkdownRemark {
        html
      }
    }
    training: allGoogleSpreadsheetOwTraining {
      courses: group(field: course) {
        nodes {
          activity
          date
          time
          location
        }
        course: fieldValue
      }
    }
  }
`
