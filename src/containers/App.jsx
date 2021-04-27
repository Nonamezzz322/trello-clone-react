import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Header from '../components/Header';
import Board from './Board';
import GlobalStyle from '../styles/globalStyles';
import { themeLight, themeDark } from '../styles/theme';

const App = () => {
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('darkTheme')) === false ? themeLight : themeDark);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header setTheme={setTheme} />
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
