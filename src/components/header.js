import PropTypes from "prop-types"
import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { Hero, Container, Heading } from "react-bulma-components"
import Nav from "./nav"
import styles from "./header.module.scss"

const Header = ({ pageTitle }) => {
  const image = useStaticQuery(graphql`
    query {
      headerImage: file(relativePath: { eq: "header.png" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <>
      <Container>
        <Link to="/">
          <Img
            className={styles.logo}
            fluid={image.headerImage.childImageSharp.fluid}
          />
        </Link>
        <Nav />
      </Container>
      {pageTitle && (
        <Hero color="primary">
          <Hero.Body>
            <Container>
              <Heading className="is-uppercase has-text-centered has-text-left-touch">
                {pageTitle}
              </Heading>
            </Container>
          </Hero.Body>
        </Hero>
      )}
    </>
  )
}

Header.propTypes = {
  pageTitle: PropTypes.string,
}

Header.defaultProps = {
  pageTitle: ``,
}

export default Header
