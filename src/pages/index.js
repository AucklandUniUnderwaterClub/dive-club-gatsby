import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import {
  Card,
  Container,
  Content,
  Heading,
  Icon,
  Section,
  Tile,
  Hero,
  Level,
} from "react-bulma-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCogs,
  faGraduationCap,
  faShip,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons"
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import TripCard from "../components/tripCard"

const IndexPage = ({
  data: {
    allGoogleSpreadsheetTrips: { trips },
    allGoogleSpreadsheetAffiliations: { affiliations },
    affiliateImage,
  },
}) => (
  <Layout section={false}>
    <SEO title="Home" />
    <Section>
      <Container>
        <Content>
          <p className="is-3quarter-width-desktop" style={{ margin: `auto` }}>
            Welcome to the Auckland University Underwater Club! We have been
            taking students out to explore our beautiful moana by offering gear
            hire, trips, and training at student-friendly prices since 1961! We
            can’t wait to sea you at one of our upcoming events!
          </p>
        </Content>
        <div style={{ maxWidth: `100%`, marginBottom: `1.45rem` }}>
          <Image />
        </div>
      </Container>
    </Section>
    <Hero color="primary">
      <Hero.Body>
        <Container style={{ width: `100%` }}>
          <Level>
            <Level.Item>
              <a
                className="has-text-light"
                href="https://www.facebook.com/groups/unidive/"
              >
                <Level mobile>
                  <Level.Item>
                    <Icon size="large">
                      <FontAwesomeIcon icon={faFacebookSquare} size="3x" />
                    </Icon>
                  </Level.Item>
                  <Level.Item>Join us on Facebook</Level.Item>
                </Level>
              </a>
            </Level.Item>
            <Level.Item>
              <Link className="has-text-light" to="/join-us/">
                <Level mobile>
                  <Level.Item>
                    <Icon size="large">
                      <FontAwesomeIcon icon={faUserPlus} size="3x" />
                    </Icon>
                  </Level.Item>
                  <Level.Item>Become a Member</Level.Item>
                </Level>
              </Link>
            </Level.Item>
            <Level.Item>
              <Link className="has-text-light" to="/training/open-water/">
                <Level mobile>
                  <Level.Item>
                    <Icon size="large">
                      <FontAwesomeIcon icon={faGraduationCap} size="3x" />
                    </Icon>
                  </Level.Item>
                  <Level.Item>Training Courses</Level.Item>
                </Level>
              </Link>
            </Level.Item>
          </Level>
        </Container>
      </Hero.Body>
    </Hero>
    <Section>
      <Container>
        <Level>
          <Level.Item className="is-hidden-touch">
            <Link to="/trips/">
              <Icon size="large">
                <FontAwesomeIcon icon={faShip} size="3x" />
              </Icon>
              <br />
              More Trips
            </Link>
          </Level.Item>
          <Level.Item>
            <Heading className="is-uppercase">Upcoming Dive Trips</Heading>
          </Level.Item>
          <Level.Item className="is-hidden-touch">
            <Link to="/club-gear/">
              <Icon size="large">
                <FontAwesomeIcon icon={faCogs} size="3x" />
              </Icon>
              <br />
              Gear Hire?
            </Link>
          </Level.Item>
        </Level>
        <Tile
          kind="ancestor"
          className="is-3quarter-width-desktop has-margin-left-auto has-margin-right-auto"
        >
          {trips.map(trip => (
            <Tile kind="parent" size={4} key={trip.id}>
              <Tile renderAs={Card} kind="child" className="flex-column">
                <TripCard {...trip} />
              </Tile>
            </Tile>
          ))}
        </Tile>
      </Container>
    </Section>
    <Section>
      <Container>
        <Heading size={4} className="is-uppercase has-text-centered">
          Get Great Deals With Our partners!
        </Heading>
        <Heading
          subtitle
          size={6}
          renderAs="h2"
          className="is-italic has-text-centered has-text-grey"
        >
          We have good relationships with several dive businesses, with
          {/* TODO: click on the
          affiliations tab to see all the */}{" "}
          great deals you can get as a member!
        </Heading>
        <Level>
          <Level.Item className="order-1-tablet">
            <Img
              fixed={affiliateImage.childImageSharp.fixed}
              alt="AUUC proudly affiliated with"
            />
          </Level.Item>
          {affiliations.slice(0, 2).map(
            (affiliate, index) =>
              affiliate.image?.childImageSharp && (
                <Level.Item style={{ order: index }} key={index}>
                  <a className="hover-link-light" href={affiliate.linkUrl}>
                    <Img
                      className="has-margin-10"
                      fixed={affiliate.image.childImageSharp.fixed}
                      alt={affiliate.imageAlt}
                    />
                  </a>
                </Level.Item>
              )
          )}
        </Level>
        <Tile
          kind="ancestor"
          className="wrap align-items-center justify-center"
        >
          {affiliations.slice(2).map(
            (affiliate, index) =>
              affiliate.image && (
                <Tile kind="parent" size={2} key={index}>
                  <Tile kind="child" className="has-text-centered">
                    <a
                      className="is-inline-block hover-link-light"
                      href={affiliate.linkUrl}
                    >
                      <Img
                        className="has-margin-10"
                        fixed={affiliate.image.childImageSharp.fixed}
                        alt={affiliate.imageAlt}
                      />
                    </a>
                  </Tile>
                </Tile>
              )
          )}
        </Tile>
      </Container>
    </Section>
  </Layout>
)

export const query = graphql`
  query {
    allGoogleSpreadsheetTrips(limit: 3) {
      trips: nodes {
        id
        contactEmail
        contactName
        cost
        daysDiving
        diveLocation
        endDate
        semester
        skill
        startDate
        title
        type
        childPages: children {
          ... on SitePage {
            path
          }
        }
      }
    }
    affiliateImage: file(relativePath: { eq: "auuc-affiliates.jpg" }) {
      childImageSharp {
        fixed(width: 210) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    allGoogleSpreadsheetAffiliations {
      affiliations: nodes {
        imageAlt
        linkUrl
        image {
          childImageSharp {
            fixed(width: 140) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`

export default IndexPage
