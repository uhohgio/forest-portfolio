import React, { useCallback, useContext } from 'react';
import { Link } from 'gatsby'; // Gatsby's way to navigate between pages
import { StaticImage } from 'gatsby-plugin-image'; // For profile image
import * as indexStyles from './index.module.css'; // CSS Modules for this page
import * as cardStyles from '../components/Card.module.css'; // Example card styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faLinkedin, faGithub, faJs, faReact, faNodeJs, faPython, faUnity } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import cPlusPlusGreen from '/static/cplusplus-green.svg'
import GlobalContext from '../context/GlobalControls';
import { withPrefix } from 'gatsby';

const IndexPage = () => {
  const [showSecret, setShowSecret] = React.useState(false);
  const { isVolumeOn } = useContext(GlobalContext);


  const playAudioLocally = useCallback((src) => {
    if (isVolumeOn && typeof window !== 'undefined') {
      const audio = new Audio(withPrefix(src));
      audio.play().then(() => {
        
      }).catch(e => {
        console.error(`[IndexPage-Local-Callback] Audio play failed for ${src}:`, e);
      });
    } else {
    }
  }, [isVolumeOn]); // Crucial: This useCallback *must* depend on isVolumeOn.


  const toggleSecret = () => {
    setShowSecret(!showSecret);
    handleMouseClick();
  }

  const handleMouseClick = () => {
    playAudioLocally('/mouse-click.mp3');
  }

  const handleButtonHover = () => {
    playAudioLocally('/volume-toggle-sound.mp3');
  }
  return (
      <div className={indexStyles.landingPageContent}>
        <div className={indexStyles.profileHeader}>
          {/* Profile Image - Replace with your actual image */}
          <div
              onClick={toggleSecret}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { // Spacebar is also common for buttons
                  toggleSecret();
                }
              }}
              tabIndex="0" // Makes the div focusable
              role="button" // Tells assistive tech it's a button
              aria-expanded={showSecret} // Indicates if the secret content is visible
              aria-controls="secret-text" // Links to the ID of the secret text
              className={indexStyles.secretImageWrapper} // Add a class for styling/cursor
            >
              <StaticImage
                src='../images/gio-profile.jpg'
                alt="Giovanna Ehrig Profile"
                className={indexStyles.profileImage}
                quality={100}
                formats={["auto", "webp", "avif"]}
              />
              {showSecret && (
              <p id="secret-text" >A picture of me in Zion National Park!</p> // Add id for aria-controls
            )}
            </div>
          <h1 className={indexStyles.heading}><span style={{ color: 'var(--primary-color)', fontSize: '2rem'}}>Hi! I'm</span> <br /> Gio Ehrig</h1>
        </div>
        <div className={indexStyles.profileHeader}>
          <p className={indexStyles.tagline}>23 year old software developer based in LA</p>
          {/* Tech Stack - Placeholder for now */}
          <div className={indexStyles.techStack}>
            <FontAwesomeIcon icon={faJs} className={indexStyles.techStackElem}/>
            <FontAwesomeIcon icon={faReact} className={indexStyles.techStackElem}/>
            <FontAwesomeIcon icon={faNodeJs} className={indexStyles.techStackElem}/>
            <FontAwesomeIcon icon={faPython} className={indexStyles.techStackElem}/>
            <img src={cPlusPlusGreen} className={indexStyles.techStackElem}  alt='C++'/>
            <FontAwesomeIcon icon={faUnity} className={indexStyles.techStackElem}/>
          </div>
        </div>  

        {/* Navigation Buttons (About Me, My Projects, etc.) */}
        <div className={indexStyles.navigationGrid}>
          <Link to="/about" className={cardStyles.card} onMouseEnter={handleButtonHover} onClick={handleMouseClick}>
            <h3>About Me</h3>
          </Link>
          <Link to="/projects" className={cardStyles.card} onMouseEnter={handleButtonHover} onClick={handleMouseClick}>
            <h3>My Projects</h3>
          </Link>
          <Link to="/experience" className={cardStyles.card} onMouseEnter={handleButtonHover} onClick={handleMouseClick}>
            <h3>Experience & Education</h3>
          </Link>
          <Link to="/blog" className={cardStyles.card} onMouseEnter={handleButtonHover} onClick={handleMouseClick}>
            <h3>My Blog</h3>
          </Link>
        </div>

        <div>
          {/* Add SVG icons or FontAwesome here */}
          <Link to="mailto:gioehrig@gmail.com" target="_blank" ><FontAwesomeIcon icon={faEnvelope} className={indexStyles.bottomNavElement} onMouseEnter={handleButtonHover} onClick={handleMouseClick}/></Link>
          <Link to="https://www.linkedin.com/in/gio-ehrig-691901214/" target="_blank"><FontAwesomeIcon icon={faLinkedin} className={indexStyles.bottomNavElement} onMouseEnter={handleButtonHover} onClick={handleMouseClick}/></Link>
          <Link to="https://github.com/uhohgio" target="_blank" ><FontAwesomeIcon icon={faGithub} className={indexStyles.bottomNavElement} onMouseEnter={handleButtonHover} onClick={handleMouseClick}/></Link>
        </div>
      </div>
  );
};

export default IndexPage;
