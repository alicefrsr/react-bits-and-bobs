import flashcards from './data/flashcards';
import styles from './Flashcards.module.css';
import { useState, useEffect } from 'react';

function FlashCards() {
  useEffect(() => {
    document.title = 'Flashcards';
  }, []);

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
