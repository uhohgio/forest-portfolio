import { Helmet } from 'react-helmet'; // For meta tags
import * as layoutStyles from './layout.module.css'; // Using CSS Modules
import GlobalControls from './GlobalControls';
import '../styles/global.css'; // Global styles
import React, { useMemo, useEffect, useState } from 'react'; // For side effects like toggling dark mode
// import pineTree from '/static/pine_tree.svg';
import pineTree from '/static/christmas-tree.svg';
import AnimatedPageWrapper from './AnimatedPageWrapper';
import useKonamiCode from '../hooks/useKonamiCode';
import GlobalContext from '../context/GlobalControls';

const Layout = ({ children }) => {
  const [showKonamiMessage, setShowKonamiMessage] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('isDarkMode');
      return savedMode === 'true';
    }
    return false;
  });

  const [isVolumeOn, setIsVolumeOn] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedVolume = localStorage.getItem('isVolumeOn');
      return savedVolume === 'true';
    }
    return true;
  });

  // Persist dark mode and volume state (similar to Layout)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isDarkMode', isDarkMode);
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isVolumeOn', isVolumeOn);
    }
  }, [isVolumeOn]);

  // Konami code callback (uses playAudio from context)
  const handleKonamiSuccess = () => {
    setShowKonamiMessage(true);
    console.log("Konami Code Activated!");
    setTimeout(() => setShowKonamiMessage(false), 5000);
  };
  useKonamiCode(handleKonamiSuccess);

  const contextValue = useMemo(() => ({
    isDarkMode,
    setIsDarkMode,
    isVolumeOn,
    setIsVolumeOn,
  }), [isDarkMode, isVolumeOn]);

  return (
    <GlobalContext.Provider value={contextValue}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Giovanna Ehrig - Portfolio</title>
        <meta name="description" content="Get to know Giovanna Ehrig through her portfolio!" />
        <link rel="icon" href="src/images/favicon.ico" type="image/x-icon" />
      </Helmet>

      {/* Static Background Image */}
      <div className={layoutStyles.backgroundBehind}></div>
      <div className={layoutStyles.background}></div>

        <GlobalControls />

        {showKonamiMessage && (
          <div className={layoutStyles.konamiMessage}>
            Konami Code Activated!
          </div>
        )}

        {/* This is where all page content (the central panel) will go */}
        <img src={pineTree} className={layoutStyles.pineTreeLeft} alt='left pine tree'></img><img src={pineTree} className={layoutStyles.pineTreeRight} alt='right pine tree'></img>
      <AnimatedPageWrapper >
        <div className={layoutStyles.container} >  
          <main className={layoutStyles.mainContent}>
            {children}
          </main>
        </div>
      </AnimatedPageWrapper>
    </GlobalContext.Provider>
  );
};

export default Layout;