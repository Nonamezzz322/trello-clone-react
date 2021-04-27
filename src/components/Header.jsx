import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  HeaderContainer,
  HeaderLogoContainer,
  HeaderLogo,
  HeaderInputWrapper,
  HeaderIconsContainer
} from '../styles/Header.styles';
import logo from '../assets/trello-logo.png';
import SearchInput from './SearchInput';
import { undoAction, redoAction } from '../actions/undoActions';
import { setSearch } from '../actions/searchActions';
import IconButton from './IconButton';
import { themeLight, themeDark } from '../styles/theme';

const Header = props => {
  const dispatch = useDispatch();

  const search = useSelector(s => s.search);
  const hasNextStates = useSelector(s => s.board.futureStates.length > 0);
  const hasPreviousStates = useSelector(s => s.board.previousStates.length > 0);

  const [darkTheme, setDarkTheme] = useState(JSON.parse(localStorage.getItem('darkTheme')) === false);
  const changeTheme = () => {
    localStorage.setItem('darkTheme', darkTheme);
    setDarkTheme(!darkTheme);
    props.setTheme(darkTheme ? themeDark : themeLight);
  };
  return (
    <HeaderContainer>
      <HeaderLogoContainer>
        <HeaderInputWrapper>
          <SearchInput
            placeholder="Search cards..."
            value={search}
            onChange={e => dispatch(setSearch(e.target.value))}
          />
        </HeaderInputWrapper>
        <Link to="/board">
          <HeaderLogo src={logo} />
        </Link>
        <HeaderIconsContainer>
          <IconButton
            fontSize="15px"
            onClick={changeTheme}
            iconType={darkTheme ? 'dark' : 'light'}
          />
          <IconButton
            fontSize="15px"
            onClick={() => dispatch(undoAction())}
            disabled={!hasPreviousStates}
            iconType="undo"
          />
          <IconButton
            fontSize="15px"
            onClick={() => dispatch(redoAction())}
            disabled={!hasNextStates}
            iconType="redo"
          />

        </HeaderIconsContainer>
      </HeaderLogoContainer>
    </HeaderContainer>
  );
};

Header.propTypes = {
  setTheme: PropTypes.func,
};

export default Header;
