import { NavLink } from 'react-router-dom';
// import { useEffect } from 'react';

// import codingDuddel from '../../assets/coding_hairup.png';
import styles from './Homepage.module.css';

function Homepage() {
  // no need
  // useEffect(() => {
  //   document.title = 'bits&bobs | Home';
  // }, []);

  return (
    <main className={styles.app}>
      <Intro />
      <Nav />
      <Footer />
    </main>
  );
}

function Intro() {
  return (
    <section className={styles.section}>
      <h1>&lt;bits&bobs/&gt;</h1>
      <div className={styles.introSection}>
        <div className={styles.introText}>
          <p>
            A random collection of simple <span> React components</span> and{' '}
            <span>mini-apps</span> built in the process of learning how React
            works, to practice, experiment and have all these bits and bobs in
            one place. I put this site together while learning about React
            Router and CSS modules, when I had just 3 components. It just grew
            from there.
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
            : Feel free to check it out or mess around with it if you are
            learning too.
          </p>
        </div>
        <img
          src={'../../../duddel/codingDuddel.png'}
          alt='happy dude coding away'
        />
      </div>
    </section>
  );
}

function Nav() {
  return (
    <nav className={styles.navSection}>
      <h2>Basic stuff:</h2>
      <p>
        Passing down props, useState, lifting state &#39;up&#39;, conditional
        rendering, useEffect for timers and API calls:
      </p>
      <ul>
        <li>
          <NavLink to='/page-not-found'>404 Page not found</NavLink>
        </li>
        <li>
          <NavLink to='/page-not-found-gif'>404 GIF</NavLink>
        </li>
        <li>
          <NavLink to='/pizza-menu'>Pizza Menu</NavLink>
        </li>
        <li>
          <NavLink to='/stopwatch'>Stopwatch</NavLink>
        </li>
        <li>
          <NavLink to='/advice-API'>Advice API</NavLink>
        </li>
        <li>
          <NavLink to='/flashcards'>Flashcards</NavLink>
        </li>
        <li>
          <NavLink to='/accordion-v1'>Accordion 1.0</NavLink>
        </li>
        <li>
          <NavLink to='/accordion-v2'>Accordion 2.0</NavLink>
        </li>
        <li>
          <NavLink to='/currency-converter'>Currency Converter (API)</NavLink>
        </li>

        {/* <li>
          <NavLink to='/test'>Test</NavLink>
        </li> */}
      </ul>
      <h2>Putting it all together:</h2>
      <p>
        Toy apps or components that do a bit more than one thing. Manipulating
        lists (adding, deleting, sorting, clearing etc). More component
        composition using children props for layout or to remedy to prop
        drilling, more fetching from APIs, exploring reusable components and
        custom hooks:{' '}
      </p>
      <ul>
        <li>
          <NavLink to='/rating'>Rating component</NavLink>
        </li>
        <li>
          <NavLink to='/packit-app'>Packit App</NavLink>
        </li>
        <li>
          <NavLink to='/eat-and-split-app'>Eat & Split App</NavLink>
        </li>
        {/* <li>
          <NavLink to='/countdown-v1'>Countdown 1.0</NavLink>
        </li>
        <li>
          <NavLink to='/countdown-v2'>Countdown 2.0</NavLink>
        </li> */}
        <li>
          <NavLink to='/countdown-v3'>Countdown 3.0 (useCountdown)</NavLink>
        </li>
        <li>
          <NavLink to='/star-rating-reusable'>Customisable star-rating</NavLink>
        </li>
        <li>
          <NavLink to='/text-expander-reusable'>
            Customisable text-expander
          </NavLink>
        </li>
        <li>
          <NavLink to='/movie-API'>Movie WatchList App (API)</NavLink>
        </li>
        <li>
          <NavLink to='/locate-me'>Where am I? (useGeolocation)</NavLink>
        </li>
      </ul>
    </nav>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Duddel illustrations by Rudi Mertens:{' '}
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
