import React from 'react';
import { useContext, useCallback } from 'react';
import { graphql, Link } from 'gatsby';
import * as pageStyles from './page.module.css';
import * as listStyles from './list.module.css'; // Reusing list styles
import GlobalContext from '../context/GlobalControls';
import { withPrefix } from 'gatsby';

const BlogPage = ({ data }) => {
  const { isVolumeOn } = useContext(GlobalContext);
  const posts = data.allMarkdownRemark.edges;

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
        <h2>My Blog</h2>
        <p>Thoughts, tutorials, and insights on web development and beyond.</p>

        <div className={listStyles.listContainer}>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            return (
              <Link to={node.fields.slug} key={node.fields.slug} className={listStyles.listItem} onMouseEnter={toggleButton} onClick={handleMouseClick}>
                <h3>{title}</h3>
                <p className={listStyles.meta}>{node.frontmatter.date}</p>
                <div className={listStyles.tags}>
                  {node.frontmatter.tags.map(tag => (
                    <span key={tag} className={listStyles.tag}>{tag}</span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
        <Link to="/" className={pageStyles.backButton} onMouseEnter={toggleButton} onClick={handleMouseClick}>← Back to Home</Link>
      </div>
  );
};

export default BlogPage;

// GraphQL query to fetch all blog posts
export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "blog" } } } # Filter for blog posts
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
          }
        }
      }
    }
  }
`;