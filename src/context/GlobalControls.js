import React from 'react';

const GlobalContext = React.createContext({
  isDarkMode: false,
  setIsDarkMode: () => {},
  isVolumeOn: false,
  setIsVolumeOn: () => {},
});

export default GlobalContext;