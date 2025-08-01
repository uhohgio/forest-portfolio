/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  pathPrefix: "/forest-portfolio",
  siteMetadata: {
    title: `Giovanna Ehrig's Portfolio`,
    description: `A unique, game-like, forest-themed portfolio showcasing web development skills.`,
    author: `@uhohgio`, 
    siteUrl: `https://uhohgio.github.io/forest-portfolio/`, // Replace with your deployed URL
  },
  plugins: [
    `gatsby-plugin-react-helmet`, // Manages <head> for SEO/accessibility
    `gatsby-plugin-image`, // Optimizes images
    `gatsby-plugin-sharp`, // Required for image optimization
    `gatsby-transformer-sharp`, // Required for image optimization
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`, // Path to your static images
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/images/favicon.ico`, // Path to your favicon image
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/content/projects`, // Path for your project Markdown files
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`, // Path for your blog Markdown files
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`, // Processes images within markdown
            options: {
              maxWidth: 800, // Max width of images in markdown
            },
          },
        ],
      },
    },
    // Configure CSS Modules (Gatsby supports this out of the box with .module.css)
    // No specific plugin needed here, just follow naming convention
  ],
};