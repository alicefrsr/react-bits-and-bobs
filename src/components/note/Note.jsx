import { useState } from 'react';
import styles from './Note.module.css';

const Note = ({ subtitle, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <div onClick={handleToggle} className={styles.note}>
      <h2 className={styles.heading}>
        Notes <span className={styles.icon}>{isOpen ? '-' : '+'}</span>
      </h2>

      {isOpen && (
        <div className={styles.content}>
          <h3>{subtitle}</h3>
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default Note;
