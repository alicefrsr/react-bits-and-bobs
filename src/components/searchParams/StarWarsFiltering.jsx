import { useEffect, useState } from 'react';
import styles from './StarWarsFiltering.module.css';
import BackHomeLink from '../BackHomeLink';
import { Link, useSearchParams } from 'react-router-dom';
import Note from '../note/Note';

const swCharacters = [
  { name: 'Luke Skywalker', type: 'Jedi' },
  { name: 'Darth Vader', type: 'Sith' },
  { name: 'Emperor Palpatine', type: 'Sith' },
  { name: 'Yoda', type: 'Jedi' },
];

const StarWarsFiltering = () => {
  useEffect(() => {
    document.title = 'Filtering';
    // clean up
    return () => (document.title = 'bits&bobs | Home');
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();

  // url = localhost:5173/filter-with-searchParams?type=sith
  console.log(searchParams.get('type')); // sith

  const typeFilter = searchParams.get('type');
  ////////////////////////////////////// conditional filtering
  const filteredCharacters = typeFilter
    ? swCharacters.filter((char) => char.type.toLowerCase() === typeFilter)
    : swCharacters;
  ////////////////////////////////////// then map over filteredCharacters

  //////////////////////////////////////
  // Link: technique to merge search params with existing ones : add ?name=bob in url then filter sith: // ==> ?name=bob&type=sith // clear filters: // ==> ?name=bob
  function genNewSearchParamsString(key, value) {
    const sp = new URLSearchParams(searchParams);
    if (value === null) {
      sp.delete(key);
    } else {
      sp.set(key, value);
    }
    return `?${sp.toString()}`;
  }
  //////////////////////////////////////
  // Button:  technique to merge search params with existing ones
  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      // here we dont want a string but a urlSearchParams object
      return prevParams;
    });
  }
  //////////////////////////////////////
  return (
    <main className={styles.app}>
      <BackHomeLink />
      <Note
        content={
          "1. Nothing to do with React Router: setSearchParams() is using the URLSearchParams constructor. 2. We can do this with <Link to='?type=whatever'/> or <button> and onClick with setSearchParams({type: 'whatever'}) function. 3. Caveat with both options: with multiple search params, because we are hardcoding the params, we are overwriting any params already in url."
        }
      />
      <div>
        {' '}
        <h1>Filtering</h1>
        <h2> with searchParams</h2>
      </div>

      <section>
        <div className={styles.filtersContainer}>
          {/* // using Link to='' */}
          <div className={styles.filters}>
            <div>
              <div>using Link or button:</div>
            </div>
            <div>
              <Link to='?type=sith' className={styles.filterLink}>
                Sith
              </Link>
              <Link to='?type=jedi' className={styles.filterLink}>
                Jedi
              </Link>
              {typeFilter ? (
                <Link to='.' className={styles.filterLink}>
                  Clear filters
                </Link>
              ) : null}
            </div>
            {/* // using setSearchParams() in button onClick instead of Link  */}
            <div>
              <button
                onClick={() => setSearchParams({ type: 'sith' })}
                className={styles.filterBtn}
              >
                Sith
              </button>
              <button
                onClick={() => setSearchParams({ type: 'jedi' })}
                className={styles.filterBtn}
              >
                Jedi
              </button>
              {typeFilter ? (
                <button
                  onClick={() => setSearchParams({})}
                  className={styles.filterBtn}
                >
                  Clear filters
                </button>
              ) : null}
            </div>
          </div>
          {/* ////////////////////////// */}
          {/* // how to merge search params with existing ones (with vanilla js) */}
          {/* ////////////////////////// */}
          <div className={styles.filters}>
            <div>
              <div>
                Same as above but with using genNewSearchParamsString(), to
                prevent overwriting existing params in url:
              </div>
            </div>
            <div>
              <Link
                to={genNewSearchParamsString('type', 'sith')}
                className={`${styles.filterLink} `}
              >
                Sith
              </Link>
              <Link
                to={genNewSearchParamsString('type', 'jedi')}
                className={`${styles.filterLink} `}
              >
                Jedi
              </Link>
              {typeFilter ? (
                <Link
                  to={genNewSearchParamsString('type', null)}
                  className={`${styles.filterLink}`}
                >
                  Clear filters
                </Link>
              ) : null}
            </div>
            <div>
              <button
                onClick={() => handleFilterChange('type', 'sith')}
                className={styles.filterBtn}
              >
                Sith
              </button>
              <button
                onClick={() => handleFilterChange('type', 'jedi')}
                className={styles.filterBtn}
              >
                Jedi
              </button>
              {typeFilter ? (
                <button
                  onClick={() => handleFilterChange('type', null)}
                  className={styles.filterBtn}
                >
                  Clear filters
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <ul className={styles.list}>
          {/* {swCharacters
            .filter((char) => char.type.toLowerCase === typeFilter) //FILTER THEN MAP */}
          {filteredCharacters.map((char) => (
            <li key={char.name} className={styles.card}>
              <h2
                style={{
                  color:
                    char.type.toLowerCase() === 'jedi'
                      ? '#046304eb'
                      : '#ff6622',
                }}
              >
                Name: {char.name}
              </h2>
              <p>Type: {char.type}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default StarWarsFiltering;
