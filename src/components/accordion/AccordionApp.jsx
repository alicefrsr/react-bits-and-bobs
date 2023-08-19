import faqs from './data/faqs';
import styles from './AccordionApp.module.css';
import { useState } from 'react';

function AccordionApp() {
  return (
    <div className={styles.app}>
      <h1>
        <span>💡 </span>Lightbulbs FAQs{' '}
      </h1>
      <Accordion data={faqs} />
    </div>
  );
}

const Accordion = ({ data }) => {
  // to have only one item open at a time, pass both down to Item
  // currOpen holds the number of the item currently open
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
          onOpen={setCurrOpen}>
          {el.answer}
        </AccordionItem>
      ))}
      {/* <AccordionItem
        // key={index} // not mapping this one
        num={42}
        question={"What's the difference between this Accordion Item and the ones above?"}
        // answer={el.answer} // replace with children to be reusable
        currOpen={currOpen}
        onOpen={setCurrOpen}
        classname={styles.other}>
        {'It uses the children props to be customisable and reusable. The ones above come from mapping through an array of silly jokes.'}
      </AccordionItem> */}
    </ol>
  );
};

const AccordionItem = ({ num, question, currOpen, onOpen, children }) => {
  // v1
  // const [isOpen, setIsOpen] = useState(false);

  // v2
  // with currOpen, item can calc whether it is open or not
  const isOpen = num === currOpen;

  const handleToggle = () => {
    // // // v1
    // // setIsOpen(isOpen => !isOpen);

    // // // v2
    // // to open the item we click on:
    // onOpen(num); // click(3) --> opens(3) --> then currOpen becomes 3
    // // to close the item if it is already open
    // if (currOpen === num) onOpen(null);
    // this does both:
    onOpen(isOpen ? null : num);
  };

  return (
    // Version 1: each item controls its own state
    // <li
    //   //className={isOpen ? 'item open' : 'item'}
    //   className={`item ${isOpen} && open`}
    //   className={`item ${isOpen ? 'open' : ''}`}
    //   onClick={handleToggle}>
    //   <p className='number'>{num < 9 ? `0${num + 1}` : num + 1}</p>
    //   <p className='question'>{question}</p>
    //   <p className='icon'>{isOpen ? '-' : '+'}</p>
    //   {isOpen && <div className='content-box'>{answer}</div>}
    // </li>

    //   // Version 2: item controlled by parent
    // <li
    //   className={`item ${isOpen ? 'open' : ''}`}
    //   onClick={handleToggle}>
    //   <p className='number'>{num < 9 ? `0${num}` : num}</p>
    //   <p className='question'>{question}</p>
    //   <p className='icon'>{isOpen ? '-' : '+'}</p>
    //   {isOpen && <div className='content-box'>{children}</div>}
    // </li>
    // the above conditional rendering translate as follows with css modules:
    <li
      className={isOpen ? styles.itemOpen : styles.itemClosed}
      onClick={handleToggle}>
      <p className={isOpen ? styles.numberOpen : styles.numberClosed}>{num < 9 ? `0${num}` : num}</p>
      <p className={styles.question}>{question}</p>
      <p className={styles.icon}>{isOpen ? '-' : '+'}</p>
      {isOpen && <div className={styles.answer}>{children}</div>}
    </li>
  );
};

export default AccordionApp;
