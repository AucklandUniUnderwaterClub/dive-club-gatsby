import React from "react"
import { Link } from "gatsby"
import moment from "moment"
import { Card, Tag, Tile } from "react-bulma-components"

const DataTile = ({ size = 6, label, value }) =>
  value ? (
    <Tile kind="child" size={size}>
      <b>{label}:</b> {value}
    </Tile>
  ) : null

const TripCard = ({
  title,
  type,
  startDate,
  endDate,
  daysDiving,
  cost,
  contactName,
  contactEmail,
  childPages,
}) => (
  <>
    <Card.Header>
      <Card.Header.Title className="is-capitalized">{title}</Card.Header.Title>
      {type && (
        <Card.Header.Icon className="has-cursor-default">
          <Tag color="primary">{type}</Tag>
        </Card.Header.Icon>
      )}
    </Card.Header>
    <Card.Content>
      <Tile kind="ancestor">
        <Tile kind="parent" className="wrap">
          {endDate && startDate !== endDate ? (
            <>
              <Tile size={12}>
                <DataTile
                  label="Start"
                  value={moment(startDate).local().format("ddd D MMMM")}
                />
                <DataTile
                  label="End"
                  value={moment(endDate).local().format("ddd D MMMM")}
                />
              </Tile>
              <DataTile label="Days Diving" value={daysDiving} />
            </>
          ) : (
            <DataTile
              label="Date"
              value={moment(startDate).local().format("ddd D MMMM")}
            />
          )}
          <DataTile label="Cost" value={cost || "TBD"} />
          <DataTile size={12} label="Contact" value={contactName || "TBD"} />
          <DataTile size={12} label="Email" value={contactEmail} />
        </Tile>
      </Tile>
    </Card.Content>
    <Card.Footer className="has-margin-top-auto">
      <Card.Footer.Item
        renderAs={Link}
        to={childPages.find(child => child.path).path || ""}
      >
        Read More
      </Card.Footer.Item>
    </Card.Footer>
  </>
)

export default TripCard
