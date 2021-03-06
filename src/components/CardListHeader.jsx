import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CardListHeader as StyledCardListHeader } from '../styles/CardList.styles';
import ContentEditable from './ContentEditable';
import IconButton from './IconButton';
import * as UtilsHelper from '../helpers/utils';

const CardListHeader = props => {
  const { listName, onChangeListName, onRemoveList, onDuplicateList } = props;
  const ref = useRef(null);
  const [onHover, setOnHover] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [lstName, setListName] = useState(listName);
  useEffect(() => {
    setListName(listName);
  }, [listName]);

  const onClickSaveEdit = () => {
    if (editMode) {
      onChangeListName(lstName);
    }
    setEditMode(isEditing => !isEditing);
  };

  useEffect(() => {
    if (editMode) {
      UtilsHelper.focusCursorToEnd(ref);
    }
  }, [editMode]);

  const onClickOutside = () => {
    setEditMode(false);
    onChangeListName(lstName);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.stopPropagation();
      e.preventDefault();
      setEditMode(false);
      ref.current.blur();
      const name = ref.current.innerText;
      onChangeListName(name);
    }
  };
  return (
    <div onBlur={onClickOutside}>
      <StyledCardListHeader
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        <ContentEditable
          innerRef={ref}
          html={lstName}
          onChange={e => setListName(e.target.value)}
          onFocus={() => setEditMode(true)}
          onKeyDown={handleKeyDown}
          style={{ paddingRight: 24 }}
        />
        {(onHover || editMode) && (
          <IconButton.ButtonContainer
            top="11px"
            right={editMode ? '11px' : '42px'}
          >
            <IconButton
              onClick={onClickSaveEdit}
              iconType={editMode ? 'confirm' : 'edit'}
            />
          </IconButton.ButtonContainer>
        )}
        {onHover && !editMode && (
          <>
            <IconButton.ButtonContainer
              top="11px"
              right="22px"
            >
              <IconButton
                onClick={onDuplicateList}
                iconType="copy"
              />
            </IconButton.ButtonContainer>
            <IconButton.ButtonContainer
              top="11px"
              right="3px"
            >
              <IconButton
                onClick={onRemoveList}
                iconType="delete"
              />
            </IconButton.ButtonContainer>
          </>
        )}
      </StyledCardListHeader>
    </div>
  );
};

CardListHeader.propTypes = {
  listName: PropTypes.string,
  onChangeListName: PropTypes.func,
  onRemoveList: PropTypes.func,
  onDuplicateList: PropTypes.func,
};

export default CardListHeader;
