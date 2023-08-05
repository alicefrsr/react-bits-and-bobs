import { useState } from 'react';
import styles from './Flashcards.module.css';

const flashcards = [
  {
    id: 3457,
    question: 'What language is React based on?',
    answer: 'JavaScript',
  },
  {
    id: 7336,
    question: 'What are the building blocks of React apps?',
    answer: 'Components',
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: 'JSX',
  },
  {
    id: 1297,
    question: 'How to pass data from parent to child components?',
    answer: 'Props',
  },
  {
    id: 9103,
    question: 'How to give components memory?',
    answer: 'useState hook',
  },
  {
    id: 2002,
    question: 'What do we call an input element that is completely synchronised with state?',
    answer: 'Controlled element',
  },
];

function FlashCards() {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = id => {
    setSelectedId(id === selectedId ? null : id);
  };

  return (
    <div className={styles.app}>
      <div className={styles.flashcards}>
        {flashcards.map(flashcardObj => (
          <div
            // className={flashcardObj.id === selectedId ? 'selected' : ''}
            className={flashcardObj.id !== selectedId ? styles.flashcard : styles.selected}
            // className={flashcardObj.id === selectedId ? 'selected' : ''}
            key={flashcardObj.id}
            onClick={() => handleSelect(flashcardObj.id)}>
            <p>{flashcardObj.id === selectedId ? flashcardObj.answer : flashcardObj.question}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default FlashCards;
