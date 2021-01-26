/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const { createRemoteFileNode } = require("gatsby-source-filesystem")
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
          filter: { document: { name: { regex: "/^(?!meta-)/" } } }
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

exports.onCreateNode = async ({
  node,
  actions,
  getNode,
  createNodeId,
  cache,
  store,
}) => {
  // Add child link to page documents for generating navbar menu
  // we need to know which google docs have generated pages
  // this would be easier if it was possible to add a parent in createPage
  // https://github.com/gatsbyjs/gatsby/issues/5721
  if (
    node.context &&
    node.context.parentId &&
    node.internal.type === "SitePage"
  ) {
    actions.createParentChildLink({
      parent: getNode(node.context.parentId),
      child: node,
    })
  }
  // Create file nodes for affiliate images
  if (
    node.internal.type === "GoogleSpreadsheetAffiliations" &&
    node.imageUrl !== null
  ) {
    const fileNode = await createRemoteFileNode({
      url: node.imageUrl,
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode: actions.createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's Redux store
    })
    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      node.image___NODE = fileNode.id
    }
  }
}
