import { ReusableStarRating } from '../star-rating-reusable/ReusableStarRatingApp';
import styles from './MovieListApp.module.css';
import { tempMovieData, tempWatchedData } from './data/tempData';
import { useState, useEffect } from 'react';
import PuffLoader from 'react-spinners/PuffLoader';

const average = arr => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0).toFixed(1);

const BASE_URL = `https://www.omdbapi.com`;
const API_KEY = '/?apikey=64ddb543';
//  console.log('tempMovieData ', tempMovieData);
//  console.log('tempWatchedData ', tempWatchedData);

const MovieListApp = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectMovie = id => {
    // setSelectedId(id);
    // to close the movie details box when clicking on same movie again
    setSelectedId(selectedId => (id === selectedId ? null : id));
  };

  const handleCloseMovieDetails = () => {
    setSelectedId(null);
  };

  const handleAddWatched = movie => {
    setWatched(watched => [...watched, movie]);
  };

  const handleDeleteWatched = id => {
    const updatedWatched = watched.filter(watchedMovie => watchedMovie.imdbID !== id);
    setWatched(updatedWatched);
    console.log(id);
  };

  useEffect(
    function () {
      const fetchMovies = async () => {
        try {
          setIsLoading(true);
          setError('');
          const res = await fetch(`${BASE_URL}${API_KEY}&s=${query}`);

          if (!res.ok) {
            throw new Error('Something went wrong...');
          } // if there was an error, ( ex failed to fetch) here the code below wouldn't get executed
          // so isLoading would never get set back to false --> put it in finally block

          const data = await res.json();
          if (data.Response === 'False') {
            throw new Error(`${data.Error}`); // returns the API data.Error value: "Movie not found" OR:
            // throw new Error('Customised error message that says movie not in API...');
          }
          setMovies(data.Search);
          // setIsLoading(false); // in finally block
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      if (!query.length || query.length < 3) {
        setMovies([]);
        setError('Start searching... (Min 3 characters)');
        return;
      }
      fetchMovies();
    },
    [query]
  );

  return (
    <div className={styles.app}>
      <Navbar>
        <Search
          query={query}
          setQuery={setQuery}
        />
        <NumResults movies={movies} />
      </Navbar>
      <Main watched={watched}>
        <Box>
          {/* ugly code? */}
          {/* {isLoading ? <Loading /> : error ? <ErrorMessage message={error} /> : <MoviesList movies={movies} />}</Box> */}
          {/* better? 3 mutually exclusive conditions: */}
          {isLoading && <Loading />}
          {!isLoading && !error && (
            <MoviesList
              movies={movies}
              onSelectMovie={handleSelectMovie}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseDetails={handleCloseMovieDetails}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </div>
  );
};

const Loading = () => {
  return (
    <PuffLoader
      className={styles.loader}
      color={'#6741d9'}
      // size={40}
      aria-label={'Loading spinner'}
    />
  );
};

const ErrorMessage = ({ message }) => {
  return <p className={styles.error}>{message}</p>;
};

const Navbar = ({ children }) => {
  return (
    <nav className={styles.navBar}>
      <Logo />
      {/* <Search />
          <NumResults movies={movies} /> */}
      {children}
    </nav>
  );
};

const Logo = () => {
  return (
    <div className={styles.logo}>
      <span role='img'>🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
};

const Search = ({ query, setQuery }) => {
  return (
    <input
      className={styles.search}
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  );
};

const NumResults = ({ movies }) => {
  return (
    <p className={styles.numResults}>
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

const Main = ({ children, watched }) => {
  const avgImdbRating = average(watched.map(movie => movie.imdbRating));
  const avgUserRating = average(watched.map(movie => movie.userRating));
  const avgRuntime = average(watched.map(movie => movie.runtime));

  return <main className={styles.main}>{children}</main>;
};

const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.box}>
      <button
        className={styles.btnToggle}
        onClick={() => setIsOpen(open => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  );
};
// refactored into a reusable Box
// const WatchedMoviesBox = () => {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className={styles.box}>
//       <button
//         className={styles.btnToggle}
//         onClick={() => setIsOpen2(open => !open)}>
//         {isOpen2 ? '–' : '+'}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <WatchedMoviesList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// };

const MoviesList = ({ movies, onSelectMovie }) => {
  // const [movies, setMovies] = useState(tempMovieData);
  return (
    <ul className={`${styles.list} ${styles.listMovies}`}>
      {movies?.map(movie => (
        <Movie
          onSelectMovie={onSelectMovie}
          key={movie.imdbID}
          movie={movie}
        />
      ))}
    </ul>
  );
};

const Movie = ({ movie, onSelectMovie }) => {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img
        src={movie.Poster}
        alt={`${movie.Title} poster`}
      />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

const MovieDetails = ({ selectedId, onCloseDetails, onAddWatched, watched }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  // we only want to add a movie to the WatchedMoviesList once
  // derived state to check if movie is already in WatchedMoviesList: transform watched array of objects into array of ids so we can check movie id against ids already there:
  const isWatched = watched.map(watchedIds => watchedIds.imdbID).includes(movie.imdbID);
  // const isWatched = watched.map(watchedIds => watchedIds.imdbID).includes(selectedId);
  // console.log('isWatched ', isWatched); // true or false
  // get the userRating value : find the movie in the array that matches selectedId, take the userRating prop only if this array is not empty (undefined) (with ?optional chaining)
  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;
  // console.log('watchedUserRating', watchedUserRating);

  const {
    imdbID,
    Title: title,
    Poster: poster,
    Runtime: runtime,
    Year: year,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const handleAdd = () => {
    // we are CREATING a brand new object, NOT selecting an existing one in the movie list using its ID
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseDetails(); // OR setSelectedId(null) in handleAddWatched() at App level
    console.log(newWatchedMovie.userRating);
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}${API_KEY}&i=${selectedId}`);
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    };
    fetchMovieDetails();
  }, [selectedId]);

  return (
    <div className={styles.details}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button
              className={styles.btnBack}
              onClick={onCloseDetails}>
              &larr;
            </button>
            <img
              src={poster}
              alt={`${title} poster`}
            />
            <div className={styles.detailsOverview}>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating}
              </p>
            </div>
          </header>

          <section>
            <div className={styles.rating}>
              {!isWatched ? (
                <>
                  <ReusableStarRating
                    maxRating={10}
                    ratingColor={'#fcc419'}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 ? (
                    <button
                      className={styles.btnAdd}
                      onClick={handleAdd}>
                      Add to list
                    </button>
                  ) : (
                    <p>Rate this movie to add it to your list!</p>
                  )}
                </>
              ) : (
                <>
                  <p>
                    You rated this movie: <span className={styles.userRating}>⭐️ {watchedUserRating} </span>/ 10
                  </p>
                </>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

const WatchedSummary = ({ watched }) => {
  const avgImdbRating = average(watched.map(movie => movie.imdbRating));
  const avgUserRating = average(watched.map(movie => movie.userRating));
  const avgRuntime = average(watched.map(movie => movie.runtime));
  return (
    <div className={styles.summary}>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

const WatchedMoviesList = ({ watched, onDeleteWatched }) => {
  return (
    <ul className={styles.list}>
      {watched.map(movie => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
};

const WatchedMovie = ({ movie, onDeleteWatched }) => {
  return (
    <li>
      <img
        src={movie.poster}
        alt={`${movie.title} poster`}
      />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button
        className={styles.btnDelete}
        onClick={() => onDeleteWatched(movie.imdbID)}>
        X
      </button>
    </li>
  );
};

export default MovieListApp;
