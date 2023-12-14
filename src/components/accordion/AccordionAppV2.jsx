import { useEffect, useState } from 'react';
import faqs from './data/faqs';
import styles from './AccordionApp.module.css';
import BackLink from '../BackLink';

// Version 2:
// --- only one piece of state: currOpen, in parent.
// : Accordion item controlled by parent. In Item, isOpen is derived state using currOpen
// --> item closes as user clicks on a different one

function AccordionApp() {
  useEffect(() => {
    document.title = 'Accordion v2';
    // clean up
    return () => (document.title = 'bits&bobs | Home');
  }, []);

  return (
    <div className={styles.app}>
      <BackLink type='white' />
      <h1>
        <span>💡 </span>Lightbulbs FAQs (v2.0){' '}
      </h1>
      <Accordion data={faqs} />
    </div>
  );
}

const Accordion = ({ data }) => {
  // currOpen stores the number of the item currently open (question[index + 1])
  // to have only one item open at a time, pass both down to Item, so state can be lifted up and controlled by parent
  const [currOpen, setCurrOpen] = useState(null);

  return (
    <ol className={styles.accordion}>
      {data.map((el, index) => (
        <AccordionItem
          key={index}
          num={index + 1}
          question={el.question}
          // answer={el.answer} // replace with children to be reusable
          currOpen={currOpen}
          onOpen={setCurrOpen}
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
        currOpen={currOpen}
        onOpen={setCurrOpen}
      >
        {
          'It uses the children props to be customisable and reusable. The ones above come from mapping through an array of silly jokes. This one has a custom number, question (props) and answer (children props).'
        }
      </AccordionItem>
    </ol>
  );
};

const AccordionItem = ({ num, question, children, currOpen, onOpen }) => {
  // v2: with currOpen, item can calc whether it is open or not
  const isOpen = num === currOpen;

  const handleToggle = () => {
    // v2:
    // to open the item we click on
    // onOpen(num);
    // ex:
    // click(3) --> sets currOpen to 3 --> num(3) === currOpen(3) --> isOpen === true --> opens (3);
    // for all other items closed: num !== currOpen so isOpen is false

    // to close the item if it is already open
    // if (currOpen === num) onOpen(null);
    // this does both:
    onOpen(isOpen ? null : num);
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
