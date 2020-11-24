import React, { useState } from "react"
import { graphql } from "gatsby"
import { Content, Table, Tabs } from "react-bulma-components"
import Layout from "../components/layout"
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
      </Content>

      <Tabs type="boxed">
        {training.courses.map(({ course }, index) => (
          <Tabs.Tab
            active={index === selectedCourseIndex}
            onClick={() => setSelectedCourse(index)}
            key={index}
          >
            {`Course ${course}`}
          </Tabs.Tab>
        ))}
      </Tabs>
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
