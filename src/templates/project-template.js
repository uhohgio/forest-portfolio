import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as templateStyles from './template.module.css'; // Reusable styles for templates
import { Helmet } from 'react-helmet';
import GlobalContext from '../context/GlobalControls';
import { useCallback, useContext } from 'react';
import { withPrefix } from 'gatsby';

const ProjectTemplate = ({ data }) => {
  // data is the result of the GraphQL query defined at the bottom
  const { html, frontmatter } = data.markdownRemark;
  const image = getImage(frontmatter.thumbnail); // Get optimized image data
  const { isVolumeOn } = useContext(GlobalContext);
  const playAudio = useCallback((src) => {
    if (isVolumeOn && typeof window !== 'undefined') {
      const audio = new Audio(withPrefix(src));
      audio.play().then(() => {
        
      }).catch(e => {
        console.error(`[IndexPage-Local-Callback] Audio play failed for ${src}:`, e);
      });
    } else {
    }
  }, [isVolumeOn]);

  const toggleButton = () => {
   if (isVolumeOn) {
      playAudio('/volume-toggle-sound.mp3');
    }
  }
  const handleMouseClick = () => {
   if (isVolumeOn) {
      playAudio('/mouse-click.mp3');
    }
  }

  return (
    <>
      <Helmet>
        <title>{frontmatter.title} | Projects - Giovanna Ehrig</title>
        <meta name="description" content={frontmatter.description || `Details about ${frontmatter.title} project by Giovanna Ehrig.`} />
        {/* Add Open Graph / Twitter Card meta for social sharing */}
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description || `Details about ${frontmatter.title} project by Giovanna Ehrig.`} />
        <meta property="og:image" content={frontmatter.socialImage || 'URL to default image'} />
        <meta property="og:url" content={data.site.siteMetadata.siteUrl + data.markdownRemark.fields.slug} />
        <meta property="og:type" content="article" />
        {/* ... other meta tags */}
      </Helmet>

      <div className={templateStyles.pageContent}>
        <Link to="/projects" className={templateStyles.backButton}  onMouseEnter={toggleButton} onClick={handleMouseClick}>← Back to Projects</Link>

        <h1>{frontmatter.title}</h1>
        <p className={templateStyles.meta}>
          Date: {frontmatter.date} | Tags: {frontmatter.tags.join(', ')}
        </p>

        {image && (
          <GatsbyImage image={image} alt={frontmatter.title} className={templateStyles.projectThumbnail} />
        )}

        {/* Render Markdown content */}
        <div
          className={templateStyles.markdownContent}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      </>
  );
};

export default ProjectTemplate;

// GraphQL Query: Gatsby will inject this query's result into the 'data' prop
// The '$slug' variable is passed to this query by gatsby-node.js
export const query = graphql`
  query ProjectBySlug($slug: String!) {
    site {
        siteMetadata { 
        siteUrl
        }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
        html
        fields {
          slug
        }
        frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        description
        socialImage { 
            childImageSharp {
            gatsbyImageData(width: 1200, height: 630, layout: FIXED)
            }
        }
        thumbnail {
            childImageSharp {
            gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
        }
        }
    }
  }
`;