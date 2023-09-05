import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage';
import PageNotFound from './pages/pages-not-found/PageNotFound';
import PageNotFoundGif from './pages/pages-not-found/PageNotFoundGif';

import PizzaMenuApp from './components/pizza-menu/PizzaMenuApp';
import Stopwatch from './components/stopwatch/Stopwatch';
import GetAdviceApp from './components/adviceAPI/GetAdviceApp';
import Flashcards from './components/flashcards/Flashcards';
import AccordionAppV1 from './components/accordion/AccordionAppV1';
import AccordionAppV2 from './components/accordion/AccordionAppV2';
import CurrencyConverter from './components/currency-converter/CurrencyConverter';

import StarRatingApp from './components/rating/StarRatingApp';
import PackitApp from './components/packit/PackitApp';
import EatAndSplitApp from './components/eat-and-split/EatAndSplitApp';
import CountdownAppV1 from './components/countdown/CountdownAppV1';
import CountdownAppV2 from './components/countdown/CountdownAppV2';
import CountdownAppV3 from './components/countdown/CountdownAppV3';
import ReusableStarRating from './components/star-rating-reusable/ReusableStarRating';
import TextExpander from './components/text-expander-reusable/TextExpander';
import MovieListApp from './components/movieAPI/MovieListApp';
import Geolocation from './components/locate-me/LocateMe';
import ScrollToTop from './components/ScrollToTop';
// import Test from './components/test/Test';
// import PomodoroApp from './components/pomodoro/PomodoroApp';

function App() {
  return (
    <>
      {' '}
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='page-not-found' element={<PageNotFound />} />
          <Route path='page-not-found-gif' element={<PageNotFoundGif />} />
          <Route path='pizza-menu' element={<PizzaMenuApp />} />
          <Route path='stopwatch' element={<Stopwatch />} />
          <Route path='advice-API' element={<GetAdviceApp />} />
          <Route path='flashcards' element={<Flashcards />} />
          <Route path='accordion-v1' element={<AccordionAppV1 />} />
          <Route path='accordion-v2' element={<AccordionAppV2 />} />
          <Route path='currency-converter' element={<CurrencyConverter />} />

          <Route path='rating' element={<StarRatingApp />} />
          <Route path='packit-app' element={<PackitApp />} />
          <Route path='eat-and-split-app' element={<EatAndSplitApp />} />
          <Route path='countdown-v1' element={<CountdownAppV1 />} />
          <Route path='countdown-v2' element={<CountdownAppV2 />} />
          <Route path='countdown-v3' element={<CountdownAppV3 />} />
          <Route path='star-rating-reusable' element={<ReusableStarRating />} />
          <Route path='text-expander-reusable' element={<TextExpander />} />
          <Route path='movie-API' element={<MovieListApp />} />
          <Route path='locate-me' element={<Geolocation />} />
          {/* <Route
            path='test'
            element={<Test />}
          /> */}
          {/* <Route
            path='pomodoro'
            element={<PomodoroApp />}
          /> */}

          <Route path='*' element={<PageNotFoundGif />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
