import { useParams } from 'react-router-dom';
import { pizzaData } from './data/pizzaData.js';
import styles from './pizzaDetailsApp.module.css';

import BackHomeLink from '../BackHomeLink.jsx';
import BackBtn from '../BackBtn.jsx';

const PizzaDetail = () => {
  const { name, photoName, soldOut, ingredients, price } = pizzaData;
  // if (pizzaObj.soldOut) return null;
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <section className={styles.app}>
        <BackHomeLink type='white' />
        <BackBtn type='white' />

        <div className={styles.pizzaDetails}>
          <img src={photoName} alt={name} />
          <div>
            <h3>Pizza name:{name}</h3>
            <p>
              Pizza id from the url:{' '}
              <span className={styles.pizzaID}>{id}</span>
            </p>
            <p>Ingredients: {ingredients}</p>
            <span>{soldOut ? 'SOLD OUT' : `Price: ${price}`}</span>
          </div>
        </div>
      </section>
    </>
  );
};
export default PizzaDetail;
