/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
// exports.createPages = async ({ actions }) => {
//   const { createPage } = actions
//   createPage({
//     path: "/using-dsg",
//     component: require.resolve("./src/templates/using-dsg.js"),
//     context: {},
//     defer: true,
//   })
// }

const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

// 1. Create Slugs for Markdown Files
// This function is called by Gatsby when new nodes are created (like your markdown files)
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // Check if the node is a MarkdownRemark type (i.e., your markdown files)
  if (node.internal.type === 'MarkdownRemark') {
    // Generate a URL-friendly slug based on the file path
    const value = createFilePath({ node, getNode });

    // Add a 'slug' field to the MarkdownRemark node, which we'll use for page paths
    createNodeField({
      name: 'slug',
      node,
      value: value, // e.g., /projects/my-first-project/
    });

    // Determine content type (project or blog) based on file path
    const parent = getNode(node.parent); // Get the parent node (File node)
    const collection = parent.sourceInstanceName; // This comes from gatsby-config.js 'name' option for gatsby-source-filesystem

    createNodeField({
      name: `collection`, // Add a 'collection' field (e.g., 'projects' or 'blog')
      node,
      value: collection,
    });
  }
};

// 2. Create Pages from Markdown Files
// This function is called by Gatsby once all nodes have been created
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Query all markdown files using GraphQL
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              collection
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    throw result.errors;
  }

  // Iterate over each markdown node (project or blog post)
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { slug, collection } = node.fields;

    let componentPath;
    if (collection === 'projects') {
      componentPath = path.resolve('./src/templates/project-template.js');
    } else if (collection === 'blog') {
      componentPath = path.resolve('./src/templates/blog-post-template.js');
    } else {
      // Handle other collections or throw an error if unexpected
      return;
    }

    // Create a page for each markdown file
    createPage({
      path: slug,           // The URL path for the page (e.g., /projects/my-first-project/)
      component: componentPath, // The React template component to use for this page
      context: {
        // Data passed to the template component via props.pageContext
        // Also available as GraphQL variables ($slug) in the template's query
        slug: slug,
      },
    });
  });
};