import React from 'react';
import { Link } from 'gatsby';
import * as pageStyles from './page.module.css'; // Reusable styles for generic pages
import GlobalContext from '../context/GlobalControls';
import { useCallback, useContext } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { withPrefix } from 'gatsby';

const AboutPage = () => {
  const [showSecret, setShowSecret] = React.useState(false);
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
      <div className={pageStyles.pageContent}>
        <div className={pageStyles.imageWrapper}>
              <StaticImage
                src='../images/gio-profile.jpg'
                alt="Giovanna Ehrig Profile"
                className={pageStyles.profileImage}
                quality={100}
                formats={["auto", "webp", "avif"]}
              />
          </div>
          <div className={pageStyles.heading}>
            <h1>Giovanna Ehrig</h1>
            <p>Junior UI/UX developer</p>
            {/* <p style={{fontWeight: 'normal'}}>Native Fluency in English and Spanish</p> */}
          </div>
        <h2>About Me</h2>
        <p>
          Hello! I'm Giovanna Ehrig, a 24-year-old software developer from Los Angeles, California. My journey into tech is fueled by an ardor for creating immersive and intuitive user experiences. I thrive on solving complex problems and bringing designs to life with clean, efficient code.
        </p>
        <p>
          My core tech stack includes <strong>React, JavaScript, HTML, and CSS</strong>, with a focus on accessibility, performance, and responsive design. I'm always eager to learn new technologies and explore innovative ways to build engaging web applications.
        </p>
        {/* Add more about your skills, values, or any easter egg hints here */}
        <p>
                I also have a <span
                    onClick={() => setShowSecret(!showSecret)}
                    onKeyDown={(e) => { if (e.key === 'Enter') setShowSecret(!showSecret); }}
                    tabIndex="0" // Make it keyboard focusable
                    role="button" // Announce as a button to screen readers
                    aria-expanded={showSecret} // Announce if expanded
                >
                    secret
                </span> passion for video games and fun easter eggs 😉.
            </p>
            {showSecret && (
                <div>
                    <p>You found it! My favorite game is Cyberpunk 2077.</p>
                    {/* Maybe a hidden image or another link here */}
                </div>
            )}

            <div className={pageStyles.aboutMeQuickNotes}>
              <div id="about-me-left-side">
                <h3>Recent CS Grad</h3>
                <ul>
                  <li>🌱 5 years of coding experience</li>
                  <li>📱 Currently focused on UI/UX development</li>
                  <li>🚀 Actively seeking 2026 internships or entry-level SWE roles</li>
                  <li>💡 Love blending creativity & logic through code</li>
                  <li>🧠 Deep-diving into FreeCodeCamp: <a href='https://www.freecodecamp.org/UhOhGio' target="_blank" rel="noreferrer">Check out my profile</a></li>
                </ul>
              </div>
              <div id="about-me-right-side">
                <h3>Other Interests</h3>
                <ul>
                  <li>🎮 Gaming </li>
                  <li>🧶 Crochet</li>
                  <li>✏️ Art</li>
                  <li>🍵 Matcha Lattes</li>
                  <li>🎵 The Band CAMINO, Zedd, K/DA, Paramore..</li>
                  <li>📺 Arcane, How to Train Your Dragon, Stranger Things..</li>
                </ul>
              </div>
            </div>

        <Link to="/" className={pageStyles.backButton} onMouseEnter={toggleButton} onClick={handleMouseClick}>← Back to Home</Link>
      </div>
  );
};

export default AboutPage;