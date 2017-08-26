import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import theme from './assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root'));
registerServiceWorker();
