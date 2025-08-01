import React, { useContext } from 'react';
import { Link } from 'gatsby';
import * as controlsStyles from './GlobalControls.module.css'; // CSS Modules for controls
import GlobalContext from '../context/GlobalControls';
import { withPrefix } from 'gatsby';

import volOn from '/static/Volume-on.svg'; // Path to volume on icon
import volOff from '/static/volume-x.svg'; // Path to volume off icon
import sun from '/static/Sun.svg'; // Path to sun icon
import moon from '/static/Moon.svg'; // Path to moon icon
import homeIcon from '/static/Home.svg'; // Path to home icon
import exitIcon from '/static/x.svg'; // Path to exit icon

const GlobalControls = () => {
  const { isDarkMode, setIsDarkMode, isVolumeOn, setIsVolumeOn } = useContext(GlobalContext);
  const isBrowser = typeof window !== 'undefined';
  const isInStandaloneMode = isBrowser && (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone);


  const toggleDarkMode = () => {
    setIsDarkMode((isDarkMode) => !isDarkMode);
    if (isVolumeOn) {
      if (isDarkMode){
        playAudio('/notification-ping.mp3');
      } else {
        playAudio('/notification-ping-2.mp3');
      }
    }
  };

const toggleVolume = () => {
  setIsVolumeOn(prev => {
    const newVolume = !prev;
    if (typeof window !== 'undefined') {
      localStorage.setItem('isVolumeOn', String(newVolume));
    }
    if (newVolume) {
      if (isDarkMode){
        playAudio('/notification-ping-2.mp3');
      } else {
        playAudio('/notification-ping.mp3');
      }
    }
    return newVolume;
  });
};

const toggleHome = () => {
  if (isVolumeOn) {
      if (isDarkMode){
        playAudio('/notification-ping-2.mp3');
      } else {
        playAudio('/notification-ping.mp3');
      }
    }
}

const playAudio = (src) => {
  const audio = new Audio(withPrefix(src));
  audio.play();
}


  return (
    <div className={controlsStyles.container}>
      {/* Top Left: Home Button */}
      <button className={controlsStyles.controlButton}>
        <Link to="/" onClick={toggleHome} 
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') { // Spacebar is also common for buttons
                toggleHome();
              }
            }}>
          <img 
            src={homeIcon} 
            alt="Home" 
            
          />
        </Link>
      </button>
      {/* Other Controls  */}
      <button 
      onClick={toggleDarkMode} 
      onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') { // Spacebar is also common for buttons
                toggleDarkMode();
              }
            }}
      className={controlsStyles.controlButton}>
        {isDarkMode ? <img src={sun} alt="Light Mode" /> : <img src={moon} alt="Dark Mode" />}
      </button>
      <button 
      onClick={toggleVolume}
      onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') { // Spacebar is also common for buttons
                toggleVolume();
              }
            }}
      className={controlsStyles.controlButton}      
      >
        {isVolumeOn ? <img src={volOn} alt="Volume On" /> : <img src={volOff} alt="Volume Off" />}
      </button>

      {/* Top Right: Exit Button (often just closes window or goes back) */}
      {isInStandaloneMode && (
        <button
          onClick={() => window.close()}
          className={controlsStyles.controlButton}
        >
          <img src={exitIcon} alt="Exit" />
        </button>
      )}
      
    </div>
  );
};

export default GlobalControls;