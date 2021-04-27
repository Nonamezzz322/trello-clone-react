import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from './store';

import './index.css';
import App from './containers/App';
// eslint-disable-next-line no-unused-vars
import { themeLight, themeDark } from './styles/theme';
import GlobalStyle from './styles/globalStyles';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={themeLight}>
      <App />
      <GlobalStyle />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
