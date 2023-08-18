import { NavLink } from 'react-router-dom';
import { HiArrowNarrowRight } from 'react-icons/hi';

import codingDuddel from '../../assets/coding_hairup.png';
import styles from './Homepage.module.css';
// import { BsGithub } from 'react-icons/bs';

function Homepage() {
  return (
    <div className={styles.Homepage}>
      <header className={styles.header}>
        <h1>bits&bobs</h1>
        <div className={styles.introSection}>
          <div className={styles.introText}>
            <p>
              A random collection of simple <span> React components</span> and <span>mini-apps</span> built in the process of learning how React works, to
              practice, experiment and have all these bits and bobs in one place. I put this site together while learning about React Router and CSS modules.
            </p>
            <p className={styles.githubLink}>
              GitHub repo
              <a
                target='blank'
                rel='noopener'
                href='https://github.com/alicefrsr/React-bits-and-bobs'>
                here
              </a>
              : Feel free to check it out or mess around with it if you are learning too.
            </p>
          </div>
          <img
            src={codingDuddel}
            alt='happy dude coding away'
          />
        </div>
      </header>

      <nav className={styles.navSection}>
        <ul>
          <li>
            <NavLink to='/pizza-menu'>Pizza Menu</NavLink>
          </li>
          <li>
            <NavLink to='/stopwatch'>Stopwatch</NavLink>
          </li>
          <li>
            <NavLink to='/get-advice'>Advice API</NavLink>
          </li>
          <li>
            <NavLink to='/flashcards'>Flashcards</NavLink>
          </li>
          <li>
            <NavLink to='/accordion'>Accordion</NavLink>
          </li>
          <li>
            <NavLink to='/packit'>Packit App</NavLink>
          </li>
          <li>
            <NavLink to='/rating'>Rating component</NavLink>
          </li>
          <li>
            <NavLink to='/star-rating-reusable'>Customisable star-rating</NavLink>
          </li>
          <li>
            <NavLink to='/text-expander-reusable'>Customisable text expander</NavLink>
          </li>
          <li>
            <NavLink to='/eat-and-split'>Eat & Split App</NavLink>
          </li>
          <li>
            <NavLink to='/use-popcorn'>Movie App (usePopcorn)</NavLink>
          </li>
          <li>
            <NavLink to='/page-not-found'>404 Page not found</NavLink>
          </li>
          <li>
            <NavLink to='/page-not-found-gif'>404 GIF</NavLink>
          </li>
        </ul>
      </nav>

      <footer className={styles.footer}>
        <p>
          Duddel illustrations by Rudi Mertens:{' '}
          <a
            className='rudi-link'
            target='blank'
            href='https://giphy.com/rudigiphy'>
            https://giphy.com/rudigiphy
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Homepage;
