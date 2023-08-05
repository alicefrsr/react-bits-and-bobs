import { useState, useEffect } from 'react';
import { pizzaData } from './data/data.js';
import styles from './pizzaMenuApp.module.css';

const PizzaMenuApp = () => {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
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
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
};

const Menu = () => {
  const pizzas = pizzaData;
  // const pizzas = [];

  return (
    <main className={styles.menu}>
      <h2>Today's menu</h2>
      {pizzas.length > 0 ? (
        <>
          <p>Authentic italian cuisine. 6 delicious pizzas to choose from. Straight out from our stone oven, all made with organic and local ingredients.</p>
          <ul className={styles.pizzas}>
            {pizzas.map(pizza => (
              <PizzaCard
                key={pizza.name}
                pizzaObj={pizza}
              />
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

const PizzaCard = ({ pizzaObj }) => {
  // if (pizzaObj.soldOut) return null;
  return (
    // <li className={` pizza ${pizzaObj.soldOut && 'sold-out'} `}>
    <li className={pizzaObj.soldOut ? `${styles.pizza} ${styles.soldOut}` : `${styles.pizza}`}>
      <img
        src={pizzaObj.photoName}
        alt={pizzaObj.name}
      />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? 'SOLD OUT' : pizzaObj.price}</span>
      </div>
    </li>
  );
};

const Order = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [timeDisplay, setTimeDisplay] = useState(new Date().toLocaleTimeString());

  // useEffect(() => {
  //   setInterval(() => {
  //     setTimeDisplay(new Date().toLocaleTimeString());
  //   }, 1000);
  // }, []);

  const currentHour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  let isOpen = currentHour >= openHour && currentHour < closeHour;

  const handleModal = () => {
    setIsModalOpen(isModalOpen => !isModalOpen);
  };
  return (
    <div className={styles.order}>
      <p>
        {/* {timeDisplay}. */}
        {isOpen
          ? ` We're currently open till ${closeHour}:00. Come visit us or order online.`
          : ` We're currently closed. We're happy to welcome you between ${openHour}:00 and ${closeHour}:00.`}
      </p>

      <div className={styles.message}>
        <button
          className={styles.btn}
          onClick={handleModal}>
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
      <p>This button doesn't do anything.</p>
    </div>
  );
};

export default PizzaMenuApp;