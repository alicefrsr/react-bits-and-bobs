import { useEffect, useState } from 'react';
import testingPrinciples from './data/testingPrinciples';
import styles from './AccordionApp.module.css';
import BackHomeLink from '../BackHomeLink';

// Version 1:
// --- only one piece of state: isOpen, in Item.
// : Each accordion Item controls its own state: stays open until user click it again
// --> multiple items can be open simultaneously

function AccordionApp() {
  useEffect(() => {
    document.title = '7 Testing Principles';
    // clean up
    return () => (document.title = 'bits&bobs | Home');
  }, []);

  return (
    <div className={styles.app}>
      <BackHomeLink type='white' />
      <h1>
        <span></span>The 7 Testing Principles{' '}
      </h1>
      <h2>ISTQB® Certified Tester Foundation Level </h2>
      <h3>(Chap 1. Fundamentals of Testing)</h3>
      <Accordion data={testingPrinciples} />
    </div>
  );
}

const Accordion = ({ data }) => {
  return (
    <>
      <ol className={styles.accordion}>
        {data.map((el, index) => (
          <AccordionItem
            key={index}
            num={index + 1}
            question={el.heading}
            // answer={el.answer} // replace with children to be reusable
          >
            {el.content}
          </AccordionItem>
        ))}
      </ol>
    </>
  );
};

const AccordionItem = ({ num, question, children }) => {
  // v1: each item controls its own state:
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <li
      className={isOpen ? styles.itemOpen : styles.itemClosed}
      onClick={handleToggle}
    >
      <p className={isOpen ? styles.numberOpen : styles.numberClosed}>
        {num < 9 ? `0${num}` : num}
      </p>
      <p className={styles.question}>{question}</p>
      <p className={styles.icon}>{isOpen ? '-' : '+'}</p>
      {isOpen && <div className={styles.answer}>{children}</div>}
    </li>
  );
};

export default AccordionApp;
