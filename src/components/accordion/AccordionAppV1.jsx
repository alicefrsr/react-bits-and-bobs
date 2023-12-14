import { useEffect, useState } from 'react';
import faqs from './data/faqs';
import styles from './AccordionApp.module.css';
import BackLink from '../BackLink';

// Version 1:
// --- only one piece of state: isOpen, in Item.
// : Each accordion Item controls its own state: stays open until user click it again
// --> multiple items can be open simultaneously

function AccordionApp() {
  useEffect(() => {
    document.title = 'Accordion v1';
    // clean up
    return () => (document.title = 'bits&bobs | Home');
  }, []);

  return (
    <div className={styles.app}>
      <BackLink type='white' />
      <h1>
        <span>💡 </span>Lightbulbs FAQs (v1.0){' '}
      </h1>
      <Accordion data={faqs} />
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
            question={el.question}
            // answer={el.answer} // replace with children to be reusable
          >
            {el.answer}
          </AccordionItem>
        ))}
        <AccordionItem
          // key={index} // not mapping this one
          num={42}
          question={
            "What's the difference between this Accordion Item and the ones above?"
          }
          // answer={el.answer} // replace with children to be reusable
        >
          {
            'It uses the children props to be customisable and reusable. The ones above come from mapping through an array of silly jokes. This one has a custom number, question (props) and answer (children props).'
          }
        </AccordionItem>
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
