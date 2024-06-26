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
    answer:
      'Rendering a component will cause all of its child / nested components to be rendered as well, regardless if props chaged or not.',
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
    id: 120,
    question: 'How to pass data from child to parent components?',
    answer: 'State',
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
    question:
      'What do we call an input element that is completely synchronised with state?',
    answer: 'Controlled element',
  },

  {
    id: 200,
    question: 'What is reconciliation?',
    answer:
      'Deciding which DOM elements actually need to be inserted, deleted, or updated in order to reflect the latest state changes',
    category: 'render',
  },

  {
    id: 108,
    question:
      'What is the reconciler and what other name is it referred to as?',
    answer: 'It is the engine of React, also known as Fiber',
    category: 'render',
  },
  {
    id: 109,
    question: 'What is the key prop?',
    answer:
      'A special prop we use to tell the diffing algo that an element is unique',
    category: 'render',
  },
  {
    id: 110,
    question: 'How does the key prop work behind the scenes?',
    answer:
      'It allows React to distinguish between multiple instances of the same component type. Whenever a key stays the same across renders, the element will be kep in the DOM (even is the positon in the tree changes)',
    category: 'render',
  },
  {
    id: 111,
    question: 'What triggers a component to render?',
    answer:
      'Initial render (component mounts): fresh state and props are created. Re-render (component updates) happens when state changes, props change, parent re-renders, or context changes.',
    category: 'render',
  },
  {
    id: 112,
    question: 'What is a cleanup function used for?',
    answer: 'To run some code when the component unmounts',
    category: 'useEffect',
  },
  {
    id: 113,
    question: 'When does a cleanup function run?',
    answer:
      "1. Before the effect is executed again, in order to cleanup the results of the previous side effect. 2. After a component has unmouted, to give us the opportunity to reset the side effect we created if that's necessary",
    category: 'useEffect',
  },
  {
    id: 114,
    question: 'What do we need a cleanup function for? Give examples.',
    answer:
      'It is necessary when the side effect keeps happening after the component has been re-rendered or unmounted. For ex. cancel an http request, cancel an API subscription, stop a timer, removing an event listener etc ',
    category: 'useEffect',
  },
  {
    id: 121,
    question: 'How to render an element outside of component scope/tree?',
    answer:
      "import /createPortal/ from 'react-dom'. In JSX createPortal(<p>modal example</p>, document.getElementById('modal'))",
    category: 'state management',
  },
];

export default flashcards;
