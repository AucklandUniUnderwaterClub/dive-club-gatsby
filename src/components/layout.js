/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"
import { Content, Container, Footer, Section } from "react-bulma-components"
import Header from "./header"
import "../index.scss"

const Layout = ({ children, title: pageTitle, section = true }) => {
  // const siteTitle = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `).site.siteMetadata.title

  return (
    <>
      <Header pageTitle={pageTitle} />
      {section ? (
        <Section>
          <Container>
            <main>{children}</main>
          </Container>
        </Section>
      ) : (
        children
      )}

      <Footer>
        <Container>
          <Content style={{ textAlign: "center" }}>
            <p>
              © Auckland University Underwater Club {new Date().getFullYear()}
            </p>
          </Content>
        </Container>
      </Footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
