/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const kebabCase = require(`lodash/kebabCase`)
const moment = require(`moment`)

exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig()
  if (stage.startsWith("develop") && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-dom": "@hot-loader/react-dom",
    }
  }
}

exports.createPages = async ({ graphql, actions }) =>
  graphql(
    `
      {
        allGoogleDocs(
          filter: {
            document: {
              breadcrumb: { nin: "Drafts" }
              name: { regex: "/^(?!meta-)/" }
            }
          }
        ) {
          nodes {
            id
            document {
              path
              pageTemplate
            }
          }
        }
        trips: allGoogleSpreadsheetTrips {
          nodes {
            startDate
            title
            id
          }
        }
      }
    `
  ).then(result => {
    result.data.allGoogleDocs.nodes.forEach((node, index) => {
      const { document, id } = node
      actions.createPage({
        path: document.path,
        component: path.resolve(
          `./src/templates`,
          `${document.pageTemplate || "page"}.js`
        ),
        parent: node,
        context: {
          parentId: id,
        },
      })
    })
    result.data.trips.nodes.forEach((node, index) => {
      const { id, title, startDate } = node
      actions.createPage({
        path: `/trip/${kebabCase(title)}-${moment(startDate).format(
          "DD-MM-YYYY"
        )}`,
        component: path.resolve(`./src/templates/tripPage.js`),
        parent: node,
        context: {
          parentId: id,
        },
      })
    })
  })

// Add child link to page documents for generating navbar menu
// we need to know which google docs have generated pages
// this would be easier if it was possible to add a parent in createPage
// https://github.com/gatsbyjs/gatsby/issues/5721
exports.onCreateNode = ({ node, actions, getNode }) => {
  if (
    node.context &&
    node.context.parentId &&
    node.internal.type === "SitePage"
  )
    actions.createParentChildLink({
      parent: getNode(node.context.parentId),
      child: node,
    })
}
