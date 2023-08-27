import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/homepage/Homepage';
import AccordionApp from './components/accordion/AccordionApp';
import Flashcards from './components/flashcards/Flashcards';
import Stopwatch from './components/stopwatch/Stopwatch';
import PizzaMenuApp from './components/pizza-menu/PizzaMenuApp';
import StarRatingApp from './components/rating/StarRatingApp';
import ReusableStarRatingApp from './components/star-rating-reusable/ReusableStarRatingApp';
import TextExpanderApp from './components/text-expander-reusable/TextExpanderApp';
import GetAdviceApp from './components/adviceAPI/GetAdviceApp';
import PackitApp from './components/packit/PackitApp';
import EatAndSplitApp from './components/eat-and-split/EatAndSplitApp';
import MovieListApp from './components/movieAPI/MovieListApp';
import PageNotFound from './components/page-not-found/PageNotFound';
import PageNotFoundGif from './components/page-not-found-gif/PageNotFoundGif';
import CurrencyConverter from './components/currency-converter/CurrencyConverter';

function App() {
  return (
    <>
      {' '}
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<Homepage />}
          />
          <Route
            path='/pizza-menu'
            element={<PizzaMenuApp />}
          />
          <Route
            path='/stopwatch'
            element={<Stopwatch />}
          />
          <Route
            path='/advice-API'
            element={<GetAdviceApp />}
          />
          <Route
            path='/flashcards'
            element={<Flashcards />}
          />
          <Route
            path='/accordion'
            element={<AccordionApp />}
          />
          <Route
            path='/packit-app'
            element={<PackitApp />}
          />
          <Route
            path='/rating'
            element={<StarRatingApp />}
          />
          <Route
            path='/star-rating-reusable'
            element={<ReusableStarRatingApp />}
          />
          <Route
            path='/text-expander-reusable'
            element={<TextExpanderApp />}
          />

          <Route
            path='/eat-and-split-app'
            element={<EatAndSplitApp />}
          />
          <Route
            path='/movie-API'
            element={<MovieListApp />}
          />
          <Route
            path='page-not-found'
            element={<PageNotFound />}
          />
          <Route
            path='page-not-found-gif'
            element={<PageNotFoundGif />}
          />
          <Route
            path='currency-converter'
            element={<CurrencyConverter />}
          />
          <Route
            path='*'
            element={<PageNotFoundGif />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
