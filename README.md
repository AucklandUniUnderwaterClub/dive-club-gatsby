<h1 align="center">
  Auckland University Underwater Club Website
</h1>

This is the source code used to generate the [AUUC website](https://unidive.co.nz), originally based on the default gatsby starter.
The main content of the site is pulled from Google Drive (Docs, and Sheets) using [gatsby-source-google-docs](https://github.com/cedricdelpoux/gatsby-source-google-docs) and [gatsby-source-google-spreadsheet](https://github.com/sondrele/gatsby-source-google-spreadsheet). The site is also integrated with Stripe, to allow credit card payments in the membership process.

The site is styled using [Bulma](https://bulma.io/).

The code relies on particular Sheet and Column names to retrieve its data. A search of `GoogleSpreadsheet` within the codebase, in combination with a read of the sheet source plugin docs would be a good starting point.

The code also uses certain Google Docs naming and description conventions, these are mostly discoverable within `gatsby-node.js`.

Lastly, the navbar should be fairly intuitive in its basic function - being based on the Google Drive Folder structure, however the finer details, and the implementation may be less intuitive. It uses a `meta-navbar` doc to configure the selection, and ordering of menu items.

## 💫 Deploy

This site can be deployed with netlify, or any other common Gatsby deployment process.
There are several environment variables that are required, see the `.env.example` file for a full list.
Variables can be pre-set, or included in a `.env.development` or `.env.production` file, depending on what kind of build is being run. See [the gatsby docs](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/)

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: Gatsby is licensed under the MIT license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with the [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to the documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.
