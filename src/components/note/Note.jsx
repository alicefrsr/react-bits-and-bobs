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
        Note <span className={styles.icon}>{isOpen ? '-' : '+'}</span>
      </h2>

      {isOpen && (
        <div className={styles.content}>
          {/* <h3>Fetching data on component mount:</h3> */}
          <h3>&rarr; {subtitle}</h3>
          {/* <p>
            useEffect is fine on a small apps, but in real-world apps, a library
            like React Query should be used.
          </p> */}
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default Note;
