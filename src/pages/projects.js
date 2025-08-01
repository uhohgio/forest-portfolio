import React, { useCallback, useContext } from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as pageStyles from './page.module.css'; // Reusable styles
import * as listStyles from './list.module.css'; // New styles for lists
import GlobalContext from '../context/GlobalControls';
import { withPrefix } from 'gatsby';

const ProjectsPage = ({ data }) => {
  const { isVolumeOn } = useContext(GlobalContext)
  const projects = data.allMarkdownRemark.edges;

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
      <div className={pageStyles.pageContent}>
        <h2>My Projects</h2>
        <p>Here you'll find a selection of my recent web development projects.</p>

        <div className={listStyles.gridContainer}>
          {projects.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            const thumbnail = getImage(node.frontmatter.thumbnail);
            return (
              <Link to={node.fields.slug} key={node.fields.slug} className={listStyles.gridItem}  onMouseEnter={toggleButton} onClick={handleMouseClick}>
                {thumbnail && (
                  <GatsbyImage image={thumbnail} alt={title} className={listStyles.thumbnail} />
                )}
                <h3>{title}</h3>
                <p>{node.frontmatter.date}</p>
                <div className={listStyles.tags}>
                  {node.frontmatter.tags.map(tag => (
                    <span key={tag} className={listStyles.tag}>{tag}</span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
        <Link to="/" className={pageStyles.backButton}  onMouseEnter={toggleButton} onClick={handleMouseClick}>← Back to Home</Link>
      </div>
  );
};

export default ProjectsPage;

// GraphQL query to fetch all projects
export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "projects" } } } # Filter for projects
      sort: { frontmatter: { date: DESC } } # Sort by date descending
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 300, aspectRatio: 1.5, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
              }
            }
          }
        }
      }
    }
  }
`;