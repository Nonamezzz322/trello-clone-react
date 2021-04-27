import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BoardContainer } from '../styles/Board.styles';
import CardList from '../components/CardList';
import AddForm from '../components/AddForm';
import {
  addCard,
  removeCard,
  addList,
  removeList,
  reOrderList,
  moveCardToList,
  setCardContent,
  setListName,
  duplicateCard,
  duplicateList
} from '../actions/boardActions';

const Board = props => {
  const {
    lists,
    onChangeListName,
    onRemoveList,
    onDuplicateList,
    onChangeCardContent,
    search,
    onAddList,
    onAddCard,
    onRemoveCard,
    onDuplicateCard,
    reorderList,
    onMoveCardToList

  } = props;

  const onDragEnd = result => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      reorderList(source.droppableId, source.index, destination.index);
    } else {
      onMoveCardToList(
        source.droppableId,
        draggableId,
        destination.droppableId,
        destination.index,

      );
    }
  };
  return (
    <div>
      <BoardContainer countColumns={lists.length + 1}>
        <DragDropContext onDragEnd={onDragEnd}>
          {lists.map((list, listIndex) => (
            <CardList
              key={list.id}
              droppableId={list.id}
              list={list}
              onChangeListName={listName => onChangeListName(listIndex, listName)}
              onRemoveList={() => onRemoveList(listIndex)}
              onDuplicateList={() => onDuplicateList(listIndex)}
              // eslint-disable-next-line max-len
              onChangeCardContent={(cardIndex, content) => onChangeCardContent(listIndex, cardIndex, content)}
              onAddCard={cardContent => onAddCard(listIndex, cardContent)}
              onRemoveCard={cardIndex => onRemoveCard(listIndex, cardIndex)}
              onDuplicateCard={cardIndex => onDuplicateCard(listIndex, cardIndex)}
              searchText={search}
            />
          ))}
        </DragDropContext>
        <AddForm
          onConfirm={onAddList}
          placeholder="+ Add new list"
          focusPlaceholder="Enter list title"
          maxWidth="220px"
        />
      </BoardContainer>
    </div>
  );
};

Board.propTypes = {
  reorderList: PropTypes.func,
  onMoveCardToList: PropTypes.func,
  lists: PropTypes.array,
  onChangeListName: PropTypes.func,
  onRemoveList: PropTypes.func,
  onDuplicateList: PropTypes.func,
  onChangeCardContent: PropTypes.func,
  search: PropTypes.string,
  onAddList: PropTypes.func,
  onAddCard: PropTypes.func,
  onRemoveCard: PropTypes.func,
  onDuplicateCard: PropTypes.func,
};
const mapStateToProps = state => ({
  lists: state.board.currentState.lists,
  search: state.search,
});

const mapDispatchToProps = dispatch => ({
  addCard: bindActionCreators(addCard, dispatch),
  removeCard: bindActionCreators(removeCard, dispatch),
  addList: bindActionCreators(addList, dispatch),
  removeList: bindActionCreators(removeList, dispatch),
  reorderList: bindActionCreators(reOrderList, dispatch),
  onMoveCardToList: bindActionCreators(moveCardToList, dispatch),
  onChangeCardContent: bindActionCreators(setCardContent, dispatch),
  onChangeListName: bindActionCreators(setListName, dispatch),
  onRemoveList: bindActionCreators(removeList, dispatch),
  onDuplicateList: bindActionCreators(duplicateList, dispatch),
  onAddList: bindActionCreators(addList, dispatch),
  onAddCard: bindActionCreators(addCard, dispatch),
  onRemoveCard: bindActionCreators(removeCard, dispatch),
  onDuplicateCard: bindActionCreators(duplicateCard, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
