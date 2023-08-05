import { NavLink } from 'react-router-dom';
import codingDuddel from '../../assets/coding_hairup.png';
import styles from './Homepage.module.css';

function Homepage() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>bits&bobs</h1>
        <div className={styles.introSection}>
          <div className={styles.introText}>
            <p>
              A random collection of simple React components built in the process of learning how React works, to practice, repeat and experiment. I put this
              site together while learning about routing and React Router.
            </p>
            <p></p>
            <p>
              GitHub repo:{' '}
              <a
                className='github-repo-link'
                target='blank'
                rel='noopener'
                href='https://github.com/alicefrsr/React-bits-and-bobs'>
                here
              </a>
              . Feel free to check it out or mess around with it if you are learning too.
            </p>
          </div>
          <img
            className='intro-img'
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
            <NavLink to='/star-rating'>Rating component</NavLink>
          </li>
          <li>
            <NavLink to='/packit'>Packit App</NavLink>
          </li>
          <li>
            <NavLink
              to='/'
              className={styles.todo}>
              404 Page not found (todo)
            </NavLink>
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
