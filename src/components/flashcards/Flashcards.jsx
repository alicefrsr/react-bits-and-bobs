import { useState } from 'react';
import styles from './Flashcards.module.css';

const flashcards = [
  {
    id: 100,
    question: 'What is the virtual DOM?',
    answer:
      'A React element tree (cheap and fast, because it is just a javascript object). A tree of all React elements created from all instances in the component tree.',
    category: 'render',
  },
  {
    id: 101,
    question: 'How does rendering a component affect other components ?',
    answer: 'Rendering a component will cause all of its child / nested components to be rendered as well, regardless if props chaged or not.',
    category: 'render',
  },
  {
    id: 102,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: 'JSX',
    category: '',
  },
  {
    id: 103,
    question: 'How to pass data from parent to child components?',
    answer: 'Props',
    category: 'state management',
  },
  {
    id: 104,
    question: 'How to give components memory?',
    answer: 'useState hook',
    category: 'state management',
  },
  {
    id: 105,
    question: 'What do we call an input element that is completely synchronised with state?',
    answer: 'Controlled element',
  },
  {
    id: 106,
    question: 'What is reconciliation?',
    answer: 'Deciding which DOM elements actually need to be inserted, deleted, or updated in order to reflect the latest state changes',
    category: 'render',
  },
  {
    id: 107,
    question: 'What is reconciliation?',
    answer: 'Deciding which DOM elements actually need to be inserted, deleted, or updated in order to reflect the latest state changes',
    category: 'render',
  },
  {
    id: 108,
    question: 'What is the reconciler and what other name is it referred to as?',
    answer: 'It is the engine of React, also known as Fiber',
    category: 'render',
  },
  {
    id: 109,
    question: 'What is the key prop?',
    answer: 'A special prop we use to tell the diffing algo that an element is unique',
    category: 'render',
  },
  {
    id: 110,
    question: 'How does the key prop work behind the scenes?',
    answer:
      'It allows React to distinguish between multiple instances of the same component type. Whenever a key stays the same across renders, the element will be kep in the DOM (even is the positon in the tree changes)',
    category: 'render',
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
