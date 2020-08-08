import React from "react"
import { graphql, Link } from "gatsby"
import moment from "moment"
import { Card, Content, Tag, Tile } from "react-bulma-components"
import Layout from "../components/layout"
import SEO from "../components/seo"

const DataTile = ({ size = 6, label, value }) =>
  value ? (
    <Tile kind="child" size={size}>
      <b>{label}:</b> {value}
    </Tile>
  ) : null

export default ({
  data: {
    page,
    allGoogleSpreadsheetTrips: { trips },
  },
}) => (
  <Layout title={page.document.name}>
    <SEO title={page.document.name} />
    <Content
      dangerouslySetInnerHTML={{ __html: page.childMarkdownRemark.html }}
    />
    <Content>
      <h1>Trips...</h1>
    </Content>
    <Tile kind="ancestor" className="wrap">
      {trips.map(trip => (
        <Tile kind="parent" size={3} key={trip.id}>
          <Tile renderAs={Card} kind="child" className="flex-column">
            <Card.Header>
              <Card.Header.Title className="is-capitalized">
                {trip.title}
              </Card.Header.Title>
              {trip.type && (
                <Card.Header.Icon className="has-cursor-default">
                  <Tag color="primary">{trip.type}</Tag>
                </Card.Header.Icon>
              )}
            </Card.Header>
            <Card.Content>
              <Tile kind="ancestor">
                <Tile kind="parent" className="wrap">
                  {trip.endDate && trip.startDate !== trip.endDate ? (
                    <>
                      <Tile size={12}>
                        <DataTile
                          label="Start"
                          value={moment(trip.startDate)
                            .local()
                            .format("ddd D MMMM")}
                        />
                        <DataTile
                          label="End"
                          value={moment(trip.endDate)
                            .local()
                            .format("ddd D MMMM")}
                        />
                      </Tile>
                      <DataTile label="Days Diving" value={trip.daysDiving} />
                    </>
                  ) : (
                    <DataTile
                      label="Date"
                      value={moment(trip.startDate)
                        .local()
                        .format("ddd D MMMM")}
                    />
                  )}
                  <DataTile label="Cost" value={trip.cost || "TBD"} />
                  <DataTile
                    size={12}
                    label="Contact"
                    value={trip.contactName || "TBD"}
                  />
                  <DataTile size={12} label="Email" value={trip.contactEmail} />
                </Tile>
              </Tile>
            </Card.Content>
            <Card.Footer className="has-margin-top-auto">
              <Card.Footer.Item
                renderAs={Link}
                to={trip.children.find(child => child.path).path || ""}
              >
                Read More
              </Card.Footer.Item>
            </Card.Footer>
          </Tile>
        </Tile>
      ))}
    </Tile>
    TODO: filter out past trips
  </Layout>
)

export const query = graphql`
  query($path: String) {
    allGoogleSpreadsheetTrips {
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
        children {
          ... on SitePage {
            path
          }
        }
      }
    }
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
