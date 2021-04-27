import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Header from '../components/Header';
import Board from './Board';
import GlobalStyle from '../styles/globalStyles';
// eslint-disable-next-line no-unused-vars
import { themeLight, themeDark } from '../styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={themeDark}>
      <Router>
        <Header />
        <Switch>
          <Route
            path="/board"
            component={Board}
          />
        </Switch>
        <Redirect
          from="/"
          to="/board"
        />
      </Router>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
