import React from "react"
import { graphql } from "gatsby"
import { Card, Content, Heading, Tile } from "react-bulma-components"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data: { page, committee } }) => (
  <Layout title={page.document.name}>
    <SEO title={page.document.name} />
    <Content
      dangerouslySetInnerHTML={{ __html: page.childMarkdownRemark.html }}
    />
    <Tile kind="ancestor" className="wrap">
      {committee.members.map((member, index) => (
        <Tile kind="parent" size={3} key={index}>
          <Tile renderAs={Card} kind="child" className="flex-column">
            <Card.Content>
              <Heading size={5}>{member.name}</Heading>
              <Heading subtitle size={6}>
                {member.role}
              </Heading>
              <a href={`mailto:${member.email}`}>{member.email}</a>
            </Card.Content>
          </Tile>
        </Tile>
      ))}
    </Tile>
  </Layout>
)

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
    committee: allGoogleSpreadsheetCommittee {
      members: nodes {
        name
        role
        email
        image
      }
    }
  }
`
