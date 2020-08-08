import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Navbar } from "react-bulma-components"

const staticQuery = graphql`
  query NavbarStructureQuery {
    struct: allGoogleDocs(
      filter: { document: { name: { regex: "/^meta-navbar*/" } } }
    ) {
      nodes {
        document {
          breadcrumb
          content {
            p
          }
        }
      }
    }
    topLevel: allGoogleDocs(
      filter: {
        document: { path: { regex: "/^/[^/]*$/" } }
        children: { elemMatch: { internal: { type: { eq: "SitePage" } } } }
      }
    ) {
      nodes {
        document {
          path
          name
        }
      }
    }
    submenu: allGoogleDocs(
      filter: {
        children: { elemMatch: { internal: { type: { eq: "SitePage" } } } }
      }
      sort: { fields: document___name }
    ) {
      group(field: document___breadcrumb) {
        name: fieldValue
        nodes {
          document {
            name
            path
          }
        }
      }
    }
  }
`

const findBreadcrumbNavList = (data, callback) => {
  const node = data.struct.nodes.find(el => callback(el.document.breadcrumb))
  return node ? node.document.content.map(({ p }) => p || "") : null
}

const findSubmenu = (data, name) => {
  const group = data.submenu.group.find(group => group.name === name)
  return group
    ? [group, findBreadcrumbNavList(data, breadcrumb => breadcrumb[0] === name)]
    : null
}

const active = { color: "#aa0000" }
const NavItemLink = ({ to = "", ...props }) => (
  <Navbar.Item renderAs={Link} to={to} activeStyle={active} {...props} />
)

const PageLink = ({ pageNode: { document } }) => (
  <NavItemLink to={document.path}>{document.name}</NavItemLink>
)

const NavbarDropdownItem = ({ menu: [group, list] }) => {
  // TODO: sort by list order if it exists, otherwise show all group nodes
  // TODO: allow first element with same name as group to be linked directly on navbar
  return (
    <Navbar.Item dropdown hoverable href="#">
      <Navbar.Link>{group.name}</Navbar.Link>
      <Navbar.Dropdown>
        {group.nodes.map(({ document }) => (
          <NavItemLink key={document.name} to={document.path}>
            {document.name}
          </NavItemLink>
        ))}
      </Navbar.Dropdown>
    </Navbar.Item>
  )
}

const Nav = () => {
  const navData = useStaticQuery(staticQuery)
  const rootMenuList = findBreadcrumbNavList(
    navData,
    breadcrumb => breadcrumb.length === 0
  )
  const [active, setActive] = useState(false)
  return (
    <Navbar>
      <Navbar.Brand>
        <Navbar.Burger
          className={active ? "is-active" : ""}
          onClick={() => setActive(!active)}
        />
      </Navbar.Brand>
      <Navbar.Menu className={active ? "is-active" : ""}>
        <Navbar.Container>
          <NavItemLink to="/">Home</NavItemLink>
          <NavItemLink to="/join-us/">Join us!</NavItemLink>
          {rootMenuList
            ? rootMenuList.map(item => {
              const page = navData.topLevel.nodes.find(
                page => page.document.name === item
              )
              if (page) return <PageLink key={item} pageNode={page} />

              const submenu = findSubmenu(navData, item)
              if (submenu) {
                return <NavbarDropdownItem key={item} menu={submenu} />
              }
                return null // if an item doesn't match a page or folder/group, show nothing
            })
            : navData.topLevel.nodes.map(page => (
              <PageLink key={page} pageNode={page} />
            ))}
        </Navbar.Container>
        <Navbar.Container position="end"></Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  )
}

export default Nav
