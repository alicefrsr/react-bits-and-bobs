import styles from './TextExpanderApp.module.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TextExpanderApp = () => {
  useEffect(() => {
    document.title = 'Custom Text-expander component';
    // clean up
    return () => (document.title = 'bits&bobs');
  }, []);

  return (
    <div className={styles.app}>
      <h1>Customisable text-expander component</h1>

      <ul className={styles.demos}>
        <li className={styles.demo}>
          <h3>Default props:</h3>
          <div className={styles.code}>
            <p style={{ fontWeight: 'bold', fontFamily: 'Helvetica Neue' }}>
              The following props can be passed to the component to customise it. Default values apply when props are omitted:
            </p>
            <p> collapsedNumWords=10,</p>
            <p> expandButtonText=&#39;Show more&#39; </p>
            <p> collapseButtonText=&#39;Show less&#39;</p>
            <p> buttonBgColor=&#39;#edc84b&#39;</p>
            <p> buttonTextColor=&#39;#252525&#39;</p>
            <p> className=&#39;&#39;</p>
            <p> expanded=false</p>
          </div>
          <TextExpander>
            Space travel is the ultimate adventure! Imagine soaring past the stars and exploring new worlds. It&#39;s the stuff of dreams and science fiction,
            but believe it or not, space travel is a real thing. Humans and robots are constantly venturing out into the cosmos to uncover its secrets and push
            the boundaries of what&#39;s possible.
          </TextExpander>
        </li>

        <li className={styles.demo}>
          <h3>Example 1:</h3>
          <div className={styles.code}>
            <p style={{ fontWeight: 'bold', fontFamily: 'Helvetica Neue' }}>Props:</p>
            <p> collapsedNumWords=&#123;20&#125; </p>
            <p> expandButtonText=&#39;Show text&#39;, </p>
            <p> collapseButtonText=&#39;Hide text&#39;, </p>
            <p> buttonBgColor=&#39;#ff6622&#39;, </p>
            <p> buttonTextColor=&#39;#fff&#39;, </p>
          </div>
          <TextExpander
            collapsedNumWords={20}
            expandButtonText='Show text'
            collapseButtonText='Hide text'
            buttonBgColor='#ff6622'
            buttonTextColor='#fff'>
            Space missions have given us incredible insights into our universe and have inspired future generations to keep reaching for the stars. Space travel
            is a pretty cool thing to think about. Who knows what we&#39;ll discover next!
          </TextExpander>
        </li>

        <li className={styles.demo}>
          <h3>Example 2:</h3>
          <div className={styles.code}>
            <p style={{ fontWeight: 'bold', fontFamily: 'Helvetica Neue' }}>Props:</p>
            <p> expanded=&#123;true&#125; </p>
          </div>
          <TextExpander expanded={true}>
            Space travel requires some seriously amazing technology and collaboration between countries, private companies, and international space
            organizations. And while it&#39;s not always easy (or cheap), the results are out of this world. Think about the first time humans stepped foot on
            the moon or when rovers were sent to roam around on Mars.
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
    <div className={`${styles.card}`}>
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
