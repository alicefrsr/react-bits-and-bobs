import { useState, useEffect } from 'react';
import flashcards from './data/flashcards';
import styles from './Flashcards.module.css';
import BackLink from '../BackLink';

function FlashCards() {
  useEffect(() => {
    document.title = 'Flashcards';
    // clean up
    return () => (document.title = 'bits&bobs | Home');
  }, []);

  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (id) => {
    setSelectedId(id === selectedId ? null : id);
  };

  return (
    <div className={styles.app}>
      <BackLink />
      <div className={styles.flashcards}>
        {flashcards.map((flashcardObj) => (
          <div
            // className={flashcardObj.id === selectedId ? 'selected' : ''}
            className={
              flashcardObj.id !== selectedId
                ? styles.flashcard
                : styles.selected
            }
            key={flashcardObj.id}
            onClick={() => handleSelect(flashcardObj.id)}
          >
            <p>
              {flashcardObj.id === selectedId
                ? flashcardObj.answer
                : flashcardObj.question}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default FlashCards;
