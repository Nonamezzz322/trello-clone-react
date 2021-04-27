import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import { CardListContainer, CardListWrapper } from '../styles/CardList.styles';
import CardListHeader from './CardListHeader';
import AddForm from './AddForm';

const getFilteredCards = (cards, searchText) => {
  if (searchText) {
    return cards.filter(card => card.content.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  return cards;
};

const CardList = props => {
  const {
    list,
    searchText,
    onChangeCardContent,
    onChangeListName,
    onRemoveList,
    droppableId,
    onAddCard,
    onRemoveCard,
    onDuplicateCard,
    onDuplicateList,
  } = props;
  return (
    <CardListWrapper>
      <CardListHeader
        listName={list.name}
        onChangeListName={onChangeListName}
        onRemoveList={onRemoveList}
        onDuplicateList={onDuplicateList}
      />
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <CardListContainer
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {getFilteredCards(list.cards, searchText).map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                onChangeCardContent={content => onChangeCardContent(index, content)}
                onRemoveCard={() => onRemoveCard(index)}
                onDuplicateCard={() => onDuplicateCard(index)}
              />
            ))}
            {provided.placeholder}
            <AddForm
              onConfirm={onAddCard}
              placeholder="+ Add new card"
              focusPlaceholder="Enter card content"
              darkFont
              width="auto"
              gray
            />
          </CardListContainer>
        )}
      </Droppable>
    </CardListWrapper>
  );
};

CardList.propTypes = {
  list: PropTypes.object,
  searchText: PropTypes.string,
  onChangeCardContent: PropTypes.func,
  onChangeListName: PropTypes.func,
  onRemoveList: PropTypes.func,
  droppableId: PropTypes.string,
  onAddCard: PropTypes.func,
  onRemoveCard: PropTypes.func,
  onDuplicateCard: PropTypes.func,
  onDuplicateList: PropTypes.func,
};
export default CardList;
