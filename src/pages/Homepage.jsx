import { useState } from 'react';
import { Link } from 'react-router-dom';
// import codingDuddel from '../../assets/coding_hairup.png';
import styles from './Homepage.module.css';

function Homepage() {
  return (
    <main className={styles.app}>
      <Header />
      <Nav />
      <Footer />
    </main>
  );
}

function Header() {
  // const [showAbout, setShowAbout] = useState(true);
  return (
    <header className={styles.header}>
      <div className={styles.aboutBtn}>
        <h1>&lt;bits&bobs/&gt;</h1>
        {/* <button
          className={styles.btn}
          onClick={() => setShowAbout((showAbout) => !showAbout)}
        >
          <span> {showAbout ? 'Hide' : 'About'}</span>
        </button> */}
      </div>
      {/* {showAbout && <Intro />} */}
      <Intro />
    </header>
  );
}

function Intro() {
  return (
    <div className={styles.introSection}>
      <div className={styles.introText}>
        <p>
          A random collection of simple <span> React components</span> and{' '}
          <span>mini-apps</span> built in the process of learning how React
          works, to practice and experiment, and have them all in one place as a
          reference. I add as I go along while building larger apps.
        </p>
        <p className={styles.githubLink}>
          GitHub repo
          <a
            target='blank'
            rel='noopener'
            href='https://github.com/alicefrsr/React-bits-and-bobs'
          >
            here
          </a>
          . Feel free to check it out if you are learning too. Please note that
          none of these are responsive as the focus was elsewhere.
        </p>
      </div>
      <img
        src={'../../../duddel/codingDuddel.png'}
        alt='duddel having fun coding'
      />
    </div>
  );
}

function Nav() {
  return (
    <nav className={styles.navSection}>
      <div>
        <h2>Basic stuff:</h2>
        <p>
          useState, passing props down, lifting state up, useEffect for API
          calls and timers, conditional rendering:
        </p>
        <ul>
          <li>
            <Link to='pizza-menu'>Pizza Menu</Link>
          </li>
          <li>
            <Link to='flashcards'>Flashcards</Link>
          </li>
          <li>
            <Link to='accordion-v1'>Accordion 1.0</Link>
          </li>
          <li>
            <Link to='accordion-v2'>Accordion 2.0</Link>
          </li>
          <li>
            <Link to='testing-principles'>7 Testing Principles</Link>
          </li>
          <li>
            <Link to='advice-API'>Advice API</Link>
          </li>
          <li>
            <Link to='currency-converter'>Currency Converter (API)</Link>
          </li>
          <li>
            <Link to='stopwatch'>Stopwatch</Link>
          </li>
          <li>
            <Link to='/page-not-found-gif'>404</Link>
          </li>

          {/* <li>
          <Link to='/test'>Test</Link>
        </li> */}
        </ul>
      </div>
      <div>
        <h2>Putting it all together:</h2>
        <p>
          Toy apps or components that do a bit more than one thing. Manipulating
          lists (adding, deleting, sorting, clearing etc). More fetching from
          APIs. Refactoring and re-usability: custom hooks and more component
          composition with children props:{' '}
        </p>
        <ul>
          {/* <button className={styles.button}>testing animation</button> */}
          <li>
            <Link to='packit-app'>Packit App</Link>
          </li>
          <li>
            <Link to='eat-and-split-app'>Eat & Split App</Link>
          </li>
          <li>
            <Link to='movie-API'>Movie WatchList App (API)</Link>
          </li>
          {/* <li>
          <Link to='/countdown-v1'>Countdown 1.0</Link>
        </li>
        <li>
          <Link to='/countdown-v2'>Countdown 2.0</Link>
        </li> */}
          <li>
            <Link to='rating'>Rating component</Link>
          </li>
          <li>
            <Link to='star-rating-reusable'>Customisable star-rating</Link>
          </li>
          <li>
            <Link to='text-expander-reusable'>Customisable text-expander</Link>
          </li>
          <li>
            <Link to='countdown-v3'>Countdown 3.0 (useCountdown)</Link>
          </li>
          <li>
            <Link to='locate-me'>Where am I? (useGeolocation)</Link>
          </li>
        </ul>
      </div>
      <div>
        <h2>useReducer hook:</h2>
        <p>Different examples, starting with super simple.</p>
        <ul>
          <li>
            <Link to='use-reducer/date-counter'>Date Counter</Link>
          </li>
          <li>
            <Link to='use-reducer/bank-account'>Bank Account</Link>
          </li>
        </ul>
      </div>
      <div>
        <h2>Context API + useReducer:</h2>
        <p></p>
        <ul className={styles.external}>
          <li>
            <a
              href='https://devfinder-demo.netlify.app/'
              target='_blank'
              rel='noopener noreferrer'
              title='External link'
            >
              Devfinder App
            </a>
          </li>
          <li>
            <a
              href='https://another-todoapp.netlify.app/'
              target='_blank'
              rel='noopener noreferrer'
              title='External link'
            >
              ToDo App
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h2>Redux:</h2>
        <p>&#39;Classic&#39; Redux + thunk middleware</p>
        <ul>
          <li>
            <Link to='redux/redux-bank-account'>Redux Bank Account</Link>
          </li>
        </ul>
      </div>
      <div>
        <p>Redux ToolKit:</p>
        <ul>
          <li>
            <Link to='redux/redux-blog'>RTK Blog (local data)</Link>
          </li>
        </ul>
      </div>
      <div>
        <p>Redux ToolKit + createAsyncThunk:</p>
        <ul className={styles.external}>
          <li>
            <a
              href='https://rtk-blog.netlify.app/'
              target='_blank'
              rel='noopener noreferrer'
              title='External link'
            >
              RTK Blog (remote data)
            </a>
          </li>
          <li className={styles.external}>
            <a
              href='https://chiaras-pizza.netlify.app/'
              target='_blank'
              rel='noopener noreferrer'
              title='External link'
            >
              Pizza App
            </a>
          </li>
        </ul>
      </div>
      <div>
        <p>RTK Query vs React Query (aka TanStack Query) </p>
        <ul>
          {' '}
          <li>
            {/* <a
              href='https://coming_soon/'
              target='_blank'
              rel='noopener noreferrer'
            >
              ToDo App (json-server)
            </a> */}
            <Link to='coming-soon'> ToDo App</Link>
          </li>
        </ul>
      </div>
      <div>
        <h2>Experiments</h2>
        <p></p>
        <ul>
          <li>
            <Link to='experiments/kata1'>Kata 1</Link>
          </li>
          {/* <li>
            <Link to=''>Kata 2</Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Built by Anne M., nom de plume alicefrsr 🪶. Duddel illustrations by
        Rudi Mertens:{' '}
        <a
          className='rudi-link'
          target='blank'
          href='https://giphy.com/rudigiphy'
        >
          https://giphy.com/rudigiphy
        </a>
      </p>
    </footer>
  );
}
export default Homepage;
