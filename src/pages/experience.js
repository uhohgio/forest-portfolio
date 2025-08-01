import React from 'react';
import { Link } from 'gatsby';
import * as pageStyles from './page.module.css';
import GlobalContext from '../context/GlobalControls';
import { useCallback, useContext } from 'react';
import { withPrefix } from 'gatsby';

const ExperiencePage = () => {
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
        <h2>Experience & Education</h2>
        <p>My professional experience and academic background.</p>

        <h3>Experience</h3>
        <ul>
          <li> <strong>Game Development Facilitator</strong> | Treobytes | Summer 2024
            <ul>
              <li>Guided 50+ students, ages 10 to 14, through all stages of game development, including design, implementation, and presentation using the Microstudio game engine.</li>
              <li>Provided support with advanced learning concepts such as coding, modeling, and animation, fostered a collaborative environment to enhance students’ understanding of complex topics, and successfully facilitated the completion of group projects of 3-5 students.</li>
            </ul>
          </li>
          <li><strong>Teaching Assistant</strong> | San Diego State University | 2022 - 2023
            <ul>
              <li>Assisted professors with classroom management and supported classroom activities to maintain a positive learning environment.</li>
              <li>Introduced and reinforced the importance of computer science principles to 50+ college students from various disciplines.</li>
            </ul>
          </li>
        </ul>

        <h3>Education</h3>
        <ul>
          <li><strong>Bachelor of Science in Computer Science</strong> | San Diego State University, San Diego (SDSU) | Aug 2020 - Dec 2024</li>
          <li><strong>Online Certifications</strong>
            <ul>
                <li>Advanced Intermediate Technical Interview Prep | CodePath | April 2025 </li>
                <li>Responsive Web Design | FreeCodeCamp | May 2025 </li>
                <li>JavaScript Algorithms and Data Structures | FreeCodeCamp | June 2025 </li>
            </ul>
          </li>
        </ul>
        <Link to="/" className={pageStyles.backButton} onMouseEnter={toggleButton} onClick={handleMouseClick}>← Back to Home</Link>
      </div>
  );
};

export default ExperiencePage;