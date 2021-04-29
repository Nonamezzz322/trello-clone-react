import { v4 as uuidv4 } from 'uuid';

const getCard = content => ({
  id: uuidv4(),
  content
});
export default [
  { id: uuidv4(),
    name: 'Конь',
    cards: [
      getCard('КоньКоньКоньКонь'),
      getCard('КоньКоньКоньКоньКоньКоньКоньКоньКонь'),
      getCard('КоньКоньКоньКоньКонь'),
      getCard('КоньКоньКоньКоньКонь')
    ] },
  { id: uuidv4(),
    name: 'КоньКоньКоньКоньКонь',
    cards: [
      getCard('КоньКоньКоньКонь'),
      getCard('КоньКоньКоньКоньКоньКоньКоньКоньКонь'),
      getCard('КоньКоньКоньКоньКонь')
    ] },
  {
    id: uuidv4(),
    name: 'конь',
    cards: [
      getCard('КоньКоньКоньКонь'),
      getCard('КоньКоньКоньКоКонь')
    ]
  },
  { id: uuidv4(),
    name: 'кобыла',
    cards: [
      getCard('жопа'),
      getCard('жопажопажопажопажопа'),
    ] },
];
