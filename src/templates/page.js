import React from "react"
import { graphql } from "gatsby"
import { Content } from "react-bulma-components"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data: { page } }) => (
  <Layout title={page.document.name}>
    <SEO title={page.document.name} />
    <Content
      dangerouslySetInnerHTML={{ __html: page.childMarkdownRemark.html }}
    />
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
  }
`
