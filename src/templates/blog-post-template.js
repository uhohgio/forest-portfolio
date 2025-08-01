import React from 'react';
import { graphql, Link } from 'gatsby';
import * as templateStyles from './template.module.css';
import GlobalContext from '../context/GlobalControls';
import { useCallback, useContext } from 'react';

const BlogPostTemplate = ({ data }) => {
  const { html, frontmatter } = data.markdownRemark;

  const { isVolumeOn } = useContext(GlobalContext);
    const playAudio = useCallback((src) => {
      if (isVolumeOn && typeof window !== 'undefined') {
        const audio = new Audio(src);
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
      <div className={templateStyles.pageContent}>
        <Link to="/blog" className={templateStyles.backButton} onMouseEnter={toggleButton} onClick={handleMouseClick}>← Back to Blog</Link>

        <h1>{frontmatter.title}</h1>
        <p className={templateStyles.meta}>
          Date: {frontmatter.date} | Tags: {frontmatter.tags.join(', ')}
        </p>

        {/* Render Markdown content */}
        <div
          className={templateStyles.markdownContent}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        </div>
      </>
  );
};

export default BlogPostTemplate;

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
    }
  }
`;