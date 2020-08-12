const path = require("path")
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    title: `AUUC`,
    description: `Auckland University Underwater Club`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-google-docs",
      options: {
        // To fetch only documents to specific folders
        // folders Ids can be found in Google Drive URLs
        // https://drive.google.com/drive/folders/FOLDER_ID
        folders: ["1wpje2koJLA3WqvgyxFNdOCySyWoaJsAh"],
        // You could need to fetch additional documents fields to your nodes
        // All available options: https://developers.google.com/drive/api/v3/reference/files#resource
        // fields: ["ownedByMe", "shared"],
        // To rename fields
        // Be careful, some documentation instructions could be different
        // fieldsMapper: {createdTime: "date", name: "title"},
        // To add default fields values
        // fieldsDefault: {draft: false},
        // To ignore some folder in the tree
        // It can be folder names or IDs
        ignoredFolders: ["Drafts"],
        // Compute extra data for each document
        // enhanceDocument: (document) => {
        //   const isPost = document.breadcrumb && document.breadcrumb[1] === "posts"
        //   const category = isPost ? document.breadcrumb[2] : null
        //   const path = document.path.replace(`/${category}`, "")
        //   return {...document, path, category}
        // },
        // For a better stack trace and more information
        // Usefull when you open a issue to report a bug
        // debug: true,
      },
    },
    {
      resolve: "gatsby-source-google-spreadsheet",
      options: {
        // https://docs.google.com/spreadsheets/d/<spreadsheetId>/edit#gid=0
        spreadsheetId: "1VxdDZktWOLXf-UQO0scBXb_Q_1pA_rNFcYG5L7jLqPA",
        // The `spreadsheetName` is recommended, but optional
        // It is used as part of the id's during the node creation, as well as in the generated GraphQL-schema
        // If you are sourcing multiple sheets, you can set this to distringuish between the source data
        // spreadsheetName: "MySheet",
        // typePrefix is used as part of the id's during the node creation, as well as in the generated GraphQL-schema
        // It can be overridden to fully customize the root query
        // typePrefix: "GoogleSpreadsheet",
        // The `credentials` are only needed when you need to be authenticated to read the document.
        // It's an object with the following shape:
        // {
        //   client_email: "<your service account email address>",
        //   private_key: "<the prive key for your service account>"
        // }
        //   - https://github.com/googleapis/google-api-nodejs-client#service-to-service-authentication
        //   - https://developers.google.com/identity/protocols/OAuth2ServiceAccount
        credentials: {
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
        },
        // By implementing a `filterNode(node): boolean` function, you can choose to eliminate some nodes before
        // they're added to Gatsby, the default behaviour is to include all nodes:
        // filterNode: () => true,
        // By implementing a `mapNode(node): node` function, you can provide your own node transformations directly
        // during node sourcing, the default implementation is to return the node as is:
        // mapNode: node => {
        //   return node
        // },
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: ["gatsby-remark-images"],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/auuc-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,
    // {
    //   resolve: `gatsby-plugin-purgecss`,
    //   options: {
    //     content: [
    //       path.join(process.cwd(), "src/**/!(*.d).{ts,js,jsx,tsx}"),
    //       path.join(
    //         process.cwd(),
    //         "node_modules/react-bulma-components/lib/**/!(*.d).{ts,js,jsx,tsx}"
    //       ),
    //     ],
    //     printRejected: true, // Print removed selectors and processed file names
    //     // develop: true, // Enable while using `gatsby develop`
    //     // tailwind: true, // Enable tailwindcss support
    //     // whitelist: ['whitelist'], // Don't remove this selector
    //     // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
    //     // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
