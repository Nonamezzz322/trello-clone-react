import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck, faTrashAlt, faUndo, faRedo, faCopy, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const headerIcons = ['undo', 'redo', 'light', 'dark'];

const Button = styled.button`
  border: none;
  background: none;
  outline: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  width: 22px;
  height: 22px;
  padding: 0;
  border-radius: 3px;
  color: ${props => headerIcons.includes(props.iconType) ? props.theme.headerIcon : props.theme.grayIcon};
  font-size: ${props => props.fontSize || ''};
  opacity: ${props => props.disabled ? '0.5' : '1'};
  &:hover {
    ${props => !props.disabled && css`
      background-color: ${headerIcons.includes(props.iconType) ? props.theme.blueHover : props.theme.grayHover};
    `};
  }
`;

export const ButtonContainer = styled.div`
  position: absolute;
  top: ${props => props.top || '2px'};
  right: ${props => props.right || '3px'};
`;

const getIconForType = type => {
  switch (type) {
    case 'edit':
      return faPen;
    case 'confirm':
      return faCheck;
    case 'delete':
      return faTrashAlt;
    case 'undo':
      return faUndo;
    case 'redo':
      return faRedo;
    case 'copy':
      return faCopy;
    case 'light':
      return faSun;
    case 'dark':
      return faMoon;
    default:
      return null;
  }
};

const IconButton = props => {
  return (
    <Button {...props}>
      <FontAwesomeIcon icon={getIconForType(props.iconType)} />
    </Button>
  );
};
IconButton.propTypes = {
  iconType: PropTypes.oneOf(['edit', 'confirm', 'delete', 'undo', 'redo', 'copy', 'light', 'dark']),
};
IconButton.ButtonContainer = ButtonContainer;

export default IconButton;
