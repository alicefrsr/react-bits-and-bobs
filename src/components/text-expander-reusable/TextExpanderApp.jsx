import styles from './TextExpanderApp.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

const TextExpanderApp = () => {
  return (
    <div className={styles.TextExpanderApp}>
      <h1>Customisable text-expander component</h1>
      <div className={styles.intro}>
        <h2>Default props:</h2>
        <p>The following props can be passed to the component to customise it. Default values apply when props are omitted:</p>
        <div className={styles.code}>
          <p> collapsedNumWords=10,</p>
          <p> expandButtonText='Show more' </p>
          <p> collapseButtonText='Show less'</p>
          <p> buttonBgColor='#edc84b'</p>
          <p> buttonTextColor='#252525'</p>
          <p> className=''</p>
          <p> expanded=false</p>
        </div>
      </div>

      <ul className={styles.demos}>
        <li className={styles.demo}>
          <h3>Example 1</h3>
          <div className={styles.code}>
            <p style={{ fontWeight: 'bold', fontFamily: 'Helvetica Neue' }}>Props:</p>
            <p> collapsedNumWords=&#123;9&#125;,</p>
          </div>
          <TextExpander collapsedNumWords={9}>
            Space travel is the ultimate adventure! Imagine soaring past the stars and exploring new worlds. It's the stuff of dreams and science fiction, but
            believe it or not, space travel is a real thing. Humans and robots are constantly venturing out into the cosmos to uncover its secrets and push the
            boundaries of what's possible.
          </TextExpander>
        </li>

        <li className={styles.demo}>
          <h3>Example 2</h3>
          <div className={styles.code}>
            <p style={{ fontWeight: 'bold', fontFamily: 'Helvetica Neue' }}>Props:</p>
            <p> collapsedNumWords=&#123;20&#125; </p>
            <p> expandButtonText='Show text', </p>
            <p> collapseButtonText='Hide text', </p>
            <p> buttonBgColor='#ff6622', </p>
            <p> buttonTextColor='#ff6622', </p>
          </div>
          <TextExpander
            collapsedNumWords={20}
            expandButtonText='Show text'
            collapseButtonText='Hide text'
            buttonBgColor='#ff6622'
            buttonTextColor='#fff'>
            Space travel requires some seriously amazing technology and collaboration between countries, private companies, and international space
            organizations. And while it's not always easy (or cheap), the results are out of this world. Think about the first time humans stepped foot on the
            moon or when rovers were sent to roam around on Mars.
          </TextExpander>
        </li>

        <li className={styles.demo}>
          <h3>Example 3</h3>
          <div className={styles.code}>
            <p style={{ fontWeight: 'bold', fontFamily: 'Helvetica Neue' }}>Props:</p>
            <p> expanded=&#123;true&#125; </p>
            <p> className='box' </p>
          </div>
          <TextExpander
            expanded={true}
            className={styles.box}>
            Space missions have given us incredible insights into our universe and have inspired future generations to keep reaching for the stars. Space travel
            is a pretty cool thing to think about. Who knows what we'll discover next!
          </TextExpander>
        </li>
      </ul>
    </div>
  );
};

// REUSABLE COMPONENT
const TextExpander = ({
  children,
  collapsedNumWords = 10,
  expandButtonText = 'Show more',
  collapseButtonText = 'Show less',
  buttonBgColor = '#edc84b',
  buttonTextColor = '#252525',
  className = '',
  expanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const handleCollapse = () => {
    setIsExpanded(isExpanded => !isExpanded);
  };

  const displayText = isExpanded ? children : children.split(' ').slice(0, collapsedNumWords).join(' ') + '...';

  const buttonStyle = {
    marginTop: '1rem',
    padding: '0.8rem',
    font: 'inherit',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: buttonBgColor,
    color: buttonTextColor,
  };

  return (
    <div className={`${styles.card} ${styles.classname}`}>
      <p>{displayText}</p>
      <button
        style={buttonStyle}
        onClick={handleCollapse}>
        {isExpanded ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
};

// PROPTYPES
TextExpander.propTypes = {
  collapsedNumWords: PropTypes.number,
  expandButtonText: PropTypes.string,
  collapseButtonText: PropTypes.string,
  className: PropTypes.string,
  buttonBgColor: PropTypes.string,
  buttonTextColor: PropTypes.string,
  expanded: PropTypes.bool,
};

export default TextExpanderApp;
