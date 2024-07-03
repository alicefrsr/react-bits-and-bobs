import { useState, useEffect } from 'react';

import pizzaData from './data/pizzaData.js'; // local
// url = 'https://dummyjson.com/recipes'

import styles from './pizzaDetailsApp.module.css';
import BackHomeLink from '../BackHomeLink.jsx';

import { Link, useNavigate } from 'react-router-dom'; // both option put the id in the url state

const PizzaDetailsApp = () => {
  useEffect(() => {
    document.title = 'Pizza Menu';
    // clean up
    return () => (document.title = 'bits&bobs | Home');
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <BackHomeLink type='white' />
        <Header />
        <Menu />
        <Order />
        <footer className={styles.footer}>
          <span>&copy;</span> Copyright Fast React Pizza Co. 2023
        </footer>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>React Pizza Co.</h1>
    </header>
  );
};

const Menu = () => {
  const pizzas = pizzaData;
  // const pizzas = [];

  return (
    <main className={styles.menu}>
      <h2>Today&#39;s menu</h2>
      {pizzas.length > 0 ? (
        <>
          <p>
            Authentic italian cuisine. Straight out from our stone oven, all
            made with organic and local ingredients.
          </p>
          <p>Please select any pizza for more details.</p>
          <ul className={styles.pizzas}>
            {pizzas.map((pizza) => (
              <PizzaCard key={pizza.name} pizza={pizza} />
            ))}
          </ul>
        </>
      ) : (
        <p>
          <strong>Sorry, all sold out!</strong>
        </p>
      )}
    </main>
  );
};

const PizzaCard = ({ pizza }) => {
  const { name, photoName, soldOut, ingredients, pizzaId, price } = pizza;
  // if (pizzaObj.soldOut) return null;
  const navigate = useNavigate();
  return (
    // <li className={` pizza ${soldOut && 'sold-out'} `}>

    <>
      {/* EITHER use <Link to={`${pizzaId}`} /> */}
      {/* <li>
        <Link
          to={`${pizzaId}`} // pizzaId is a number, we need a string
          className={
            soldOut ? `${styles.pizza} ${styles.soldOut}` : `${styles.pizza}`
          }
        >
          <img src={photoName} alt={name} />
          <div>
            <h3>{name}</h3>
            <p>{ingredients}</p>
            <span>{soldOut ? 'SOLD OUT' : price}</span>
          </div>
        </Link>
      </li> */}

      {/* OR useNavigate hook in onClick  */}
      <li
        onClick={() => navigate(`${pizzaId}`)}
        className={
          soldOut ? `${styles.pizza} ${styles.soldOut}` : `${styles.pizza}`
        }
      >
        <img src={photoName} alt={name} />
        <div>
          <h3>{name}</h3>
          <p>{ingredients}</p>
          <span>{soldOut ? 'SOLD OUT' : `€${price}`}</span>
        </div>
      </li>
    </>
  );
};

const Order = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen((isModalOpen) => !isModalOpen);
  };
  return (
    <div className={styles.order}>
      <div className={styles.message}>
        <button className={styles.btn} onClick={handleModal}>
          Order
        </button>
        {isModalOpen && <Modal />}
      </div>
    </div>
  );
};

const Modal = () => {
  return (
    <div className={styles.modal}>
      <p>This button doesn&#39;t do anything.</p>
    </div>
  );
};

export default PizzaDetailsApp;
