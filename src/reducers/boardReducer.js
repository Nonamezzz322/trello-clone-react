import { v4 as uuidv4 } from 'uuid';
import * as types from '../constants/ActionTypes';
import * as BoardHelper from '../helpers/boardHelper';
import mockData from '../helpers/mockData';

const initialState = {
  lists: mockData,
};

const board = (state = initialState, action) => {
  let newState;
  let newList;
  switch (action.type) {
    case types.ADD_LIST:
      newState = [
        ...state.lists,
        {
          id: uuidv4(),
          name: action.data,
          cards: []
        }
      ];
      return {
        ...state,
        lists: newState,
        offset: state.offset + 1
      };

    case types.REMOVE_LIST:
      newList = [...state.lists];
      newList.splice(action.data, 1);
      return {
        ...state,
        lists: newList
      };
    case types.DUPLICATE_LIST:
      const listToDuplicate = state.lists[action.data];
      return {
        ...state,
        lists: [
          ...state.lists.slice(0, action.data),
          {
            ...listToDuplicate,
            id: uuidv4(),
            cards: listToDuplicate.cards.map(card => ({
              ...card,
              id: uuidv4()
            }))
          },
          ...state.lists.slice(action.data)
        ]
      };

    case types.ADD_CARD:
      return {
        ...state,
        lists: state.lists.map((list, listIndex) => {
          if (listIndex !== action.data.listIndex) {
            return list;
          }
          return {
            ...list,
            cards: [...list.cards, {
              id: uuidv4(),
              content: action.data.cardContent
            }]
          };
        })
      };

    case types.REMOVE_CARD:
      return {
        ...state,
        lists: state.lists.map((list, listIndex) => {
          if (listIndex !== action.data.listIndex) {
            return list;
          }
          const newCards = [...list.cards];
          newCards.splice(action.data.cardIndex, 1);
          return {
            ...list,
            cards: newCards
          };
        })
      };
    case types.DUPLICATE_CARD:
      return {
        ...state,
        lists: state.lists.map((list, listIndex) => {
          if (listIndex !== action.data.listIndex) {
            return list;
          }
          const cardToDuplicate = list.cards[action.data.cardIndex];
          return {
            ...list,
            cards: [
              ...list.cards.slice(0, action.data.cardIndex),
              {
                ...cardToDuplicate,
                id: uuidv4()
              },
              ...list.cards.slice(action.data.cardIndex)
            ]
          };
        })
      };

    case types.SET_CARD_CONTENT:
      return {
        ...state,
        lists: state.lists.map((list, listIndex) => {
          if (listIndex !== action.data.listIndex) {
            return list;
          }
          return {
            ...list,
            cards: list.cards.map((card, cardIndex) => {
              if (cardIndex !== action.data.cardIndex) {
                return card;
              }
              return {
                ...card,
                content: action.data.content
              };
            })
          };
        })
      };

    case types.SET_LIST_NAME:
      return {
        ...state,
        lists: state.lists.map((list, listIndex) => {
          if (listIndex !== action.data.listIndex) {
            return list;
          }
          return {
            ...list,
            name: action.data.listName
          };
        })
      };

    case types.RE_ORDER_LIST:
      const { listId } = action.data;
      const listIndex = state.lists.findIndex(list => list.id === listId);
      const list = state.lists[listIndex];
      const orderedListCards = BoardHelper.reOrderList(
        list.cards,
        action.data.cardSourceIndex,
        action.data.cardDestinationIndex
      );
      newState = [...state.lists];
      newState[listIndex] = {
        ...newState[listIndex],
        cards: orderedListCards
      };
      return {
        ...state,
        lists: newState
      };

    case types.MOVE_CARD_TO_LIST:
      const { sourceListId, cardId } = action.data;
      const sourceListIndex = state.lists.findIndex(cardList => cardList.id === sourceListId);
      const sourceList = state.lists[sourceListIndex];
      const destinationListIndex = state.lists.findIndex(
        cardList => cardList.id === action.data.destinationListId
      );
      const destinationList = state.lists[destinationListIndex];
      const cardSourceIndex = sourceList.cards.findIndex(item => item.id === cardId);
      const { newSourceList, newDestinationList } = BoardHelper.moveCardToList(
        sourceList.cards,
        destinationList.cards,
        cardSourceIndex,
        action.data.cardDestinationIndex
      );

      newState = [...state.lists];
      newState[sourceListIndex] = {
        ...newState[sourceListIndex],
        cards: newSourceList
      };
      newState[destinationListIndex] = {
        ...newState[destinationListIndex],
        cards: newDestinationList
      };
      return {
        ...state,
        lists: newState
      };
    default:
      return state;
  }
};

export default board;
