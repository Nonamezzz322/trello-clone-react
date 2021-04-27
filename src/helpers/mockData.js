import { v4 as uuidv4 } from 'uuid';

const getCard = content => ({
  id: uuidv4(),
  content
});
export default [
  { id: uuidv4(),
    name: 'To do',
    cards: [
      getCard('Ingregrate frontend with backend'),
      getCard('Create integration tests'),
      getCard('Setup production environment'),
      getCard('Deploy to production')
    ] },
  { id: uuidv4(),
    name: 'In progress',
    cards: [
      getCard('Create unit tests'),
      getCard('Implement API services'),
      getCard('Mock frontend')
    ] },
  {
    id: uuidv4(),
    name: 'Ready for test',
    cards: [
      getCard('Implement use cases'),
      getCard('Design API'),
    ]
  },
  { id: uuidv4(),
    name: 'Done',
    cards: [
      getCard('Design database model'),
      getCard('Create models'),
    ] },
];
