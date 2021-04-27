import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
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

const Board = () => {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.board.currentState.lists);
  const search = useSelector(state => state.search);

  const onDragEnd = result => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      dispatch(reOrderList(source.droppableId, source.index, destination.index));
    } else {
      dispatch(moveCardToList(
        source.droppableId,
        draggableId,
        destination.droppableId,
        destination.index,

      ));
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
              onChangeListName={listName => dispatch(setListName(listIndex, listName))}
              onRemoveList={() => dispatch(removeList(listIndex))}
              onDuplicateList={() => dispatch(duplicateList(listIndex))}
              onChangeCardContent={
                (cardIndex, content) => dispatch(setCardContent(listIndex, cardIndex, content))
              }
              onAddCard={cardContent => dispatch(addCard(listIndex, cardContent))}
              onRemoveCard={cardIndex => dispatch(removeCard(listIndex, cardIndex))}
              onDuplicateCard={cardIndex => dispatch(duplicateCard(listIndex, cardIndex))}
              searchText={search}
            />
          ))}
        </DragDropContext>
        <AddForm
          onConfirm={() => dispatch(addList)}
          placeholder="+ Add new list"
          focusPlaceholder="Enter list title"
          maxWidth="220px"
        />
      </BoardContainer>
    </div>
  );
};

export default Board;
