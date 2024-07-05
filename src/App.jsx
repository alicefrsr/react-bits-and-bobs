import { BrowserRouter, Routes, Route } from 'react-router-dom';

import store from './components/redux/store-rtk-2';
import { Provider } from 'react-redux';

import ScrollToTop from './components/ScrollToTop';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/pages-not-found/PageNotFound';
import PageNotFoundGif from './pages/pages-not-found/PageNotFoundGif';
import ComingSoon from './pages/pages-not-found/ComingSoon';

// Basic section
import PizzaMenuApp from './components/pizza-menu/PizzaMenuApp';
import Flashcards from './components/flashcards/Flashcards';
import AccordionAppV1 from './components/accordion/AccordionAppV1';
import AccordionAppV2 from './components/accordion/AccordionAppV2';
import AccordionTesting from './components/accordion/AccordionTesting';
import GetAdviceApp from './components/adviceAPI/GetAdviceApp';
import CurrencyConverter from './components/currency-converter/CurrencyConverter';
import Stopwatch from './components/stopwatch/Stopwatch';

// Intermediate section
import PackitApp from './components/packit/PackitApp';
import EatAndSplitApp from './components/eat-and-split/EatAndSplitApp';
import MovieListApp from './components/movieAPI/MovieListApp';
import StarRatingApp from './components/rating/StarRatingApp';
import ReusableStarRating from './components/star-rating-reusable/ReusableStarRating';
import TextExpander from './components/text-expander-reusable/TextExpander';
import CountdownAppV1 from './components/countdown/CountdownAppV1';
import CountdownAppV2 from './components/countdown/CountdownAppV2';
import CountdownAppV3 from './components/countdown/CountdownAppV3';
import Geolocation from './components/locate-me/LocateMe';
import DragAndDrop from './components/drag-and-drop/DragAndDrop';

// Routing
import PizzaDetailsApp from './components/pizza-details/PizzaDetailsApp';
import PizzaDetails from './components/pizza-details/PizzaDetails';
import StarWarsFiltering from './components/searchParams/StarWarsFiltering';

// import DateCounterTest from './components/tests/DateCounterTest';
// import DateCounter from './components/tests/DateCounter';
// import Steps from './components/tests/Steps';

// useReduder
import DateCounterReduced from './components/use-reducer/DateCounterReduced';
import BankAccountReduced from './components/use-reducer/BankAccountReduced';

// Redux
import ReduxBankApp from './components/redux/bank/ReduxBankApp';
import BlogApp from './components/redux/blog/BlogApp';
import Kata1 from './components/kata/Kata1';
// import BlogAppThunk from './components/redux/blog-thunk/BlogApp-thunk';
// import DateCounterV2 from './components/tests/date-counter-v2/DateCounterV2';
// import PomodoroApp from './components/pomodoro/PomodoroApp';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='page-not-found' element={<PageNotFound />} />
            <Route path='page-not-found-gif' element={<PageNotFoundGif />} />
            <Route path='coming-soon' element={<ComingSoon />} />
            <Route path='pizza-menu' element={<PizzaMenuApp />} />

            {/* dynamic routing, pizza example */}
            <Route path='pizza-menu-details' element={<PizzaDetailsApp />} />
            <Route path='pizza-menu-details/:id' element={<PizzaDetails />} />
            <Route
              path='filter-with-searchParams'
              element={<StarWarsFiltering />}
            />

            <Route path='stopwatch' element={<Stopwatch />} />
            <Route path='advice-API' element={<GetAdviceApp />} />
            <Route path='flashcards' element={<Flashcards />} />
            <Route path='accordion-v1' element={<AccordionAppV1 />} />
            <Route path='accordion-v2' element={<AccordionAppV2 />} />
            <Route path='testing-principles' element={<AccordionTesting />} />
            <Route path='currency-converter' element={<CurrencyConverter />} />
            <Route path='drag-and-drop' element={<DragAndDrop />} />

            <Route path='rating' element={<StarRatingApp />} />
            <Route path='packit-app' element={<PackitApp />} />
            <Route path='eat-and-split-app' element={<EatAndSplitApp />} />
            <Route path='countdown-v1' element={<CountdownAppV1 />} />
            <Route path='countdown-v2' element={<CountdownAppV2 />} />
            <Route path='countdown-v3' element={<CountdownAppV3 />} />
            <Route
              path='star-rating-reusable'
              element={<ReusableStarRating />}
            />
            <Route path='text-expander-reusable' element={<TextExpander />} />
            <Route path='movie-API' element={<MovieListApp />} />
            <Route path='locate-me' element={<Geolocation />} />

            {/* <Route path='tests/date-counter' element={<DateCounter />} />
          <Route path='tests/date-counter-test' element={<DateCounterTest />} />
          <Route path='tests/steps' element={<Steps />} /> */}

            <Route
              path='use-reducer/date-counter'
              element={<DateCounterReduced />}
            />
            <Route
              path='use-reducer/bank-account'
              element={<BankAccountReduced />}
            />
            {/* <Route
            path='pomodoro'
            element={<PomodoroApp />}
          /> */}

            <Route path='redux/redux-bank-account' element={<ReduxBankApp />} />
            <Route path='redux/redux-blog' element={<BlogApp />} />
            <Route path='experiments/kata1' element={<Kata1 />} />
            {/* <Route path='redux/redux-blog-thunk' element={<BlogAppThunk />} /> */}

            <Route path='*' element={<PageNotFoundGif />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
