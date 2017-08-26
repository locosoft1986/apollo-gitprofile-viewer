import React from 'react';
import theme from '../../assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

export default function RTThemeProvider(story){
  return (
    <ThemeProvider theme={theme}>
      {story()}
    </ThemeProvider>
  );
}

export {theme}
