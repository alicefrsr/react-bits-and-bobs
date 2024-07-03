import { useParams } from 'react-router-dom';
import pizzaData from './data/pizzaData.js';
import styles from './pizzaDetailsApp.module.css';

import BackHomeLink from '../BackHomeLink.jsx';
import BackBtn from '../BackBtn.jsx';

const PizzaDetails = () => {
  // we have access to pizzas (importing pizzaData)
  // and we get access to the id of the pizza we want in params:
  const { id } = useParams();
  // we fetch the relevant pizza by matching the 2 ids
  const pizza = pizzaData.find((pizza) => pizza.pizzaId === id);

  // we deconstruct the pizza props we need
  const { name, photoName, soldOut, ingredients, price } = pizza;
  // if (pizzaObj.soldOut) return null;

  console.log(id);

  if (!pizza) return;

  return (
    <>
      <section className={styles.app}>
        <BackHomeLink type='white' />
        <BackBtn type='white' />

        <div className={styles.pizzaDetails}>
          <img src={photoName} alt={name} />
          <div>
            <h3>Name: {name}</h3>
            <p className={styles.pizzaParams}>
              Pizza id from the url, with useParams():{' '}
              <span className={styles.border}>{id}</span>
            </p>
            <p>Ingredients: {ingredients}</p>
            <span>{soldOut ? 'SOLD OUT' : `Price: €${price}`}</span>
          </div>
        </div>
      </section>
    </>
  );
};
// const PizzaDetails = () => {
//   const { name, photoName, soldOut, ingredients, price } = pizzaData;
//   // if (pizzaObj.soldOut) return null;
//   const { id } = useParams();
//   console.log(id);
// console.log(name);
//   return (
//     <>
//       <section className={styles.app}>
//         <BackHomeLink type='white' />
//         <BackBtn type='white' />

//         <div className={styles.pizzaDetails}>
//           <img src={photoName} alt={name} />
//           <div>
//             <h3>Pizza name:{name}</h3>
//             <p>
//               Pizza id from the url:{' '}
//               <span className={styles.pizzaID}>{id}</span>
//             </p>
//             <p>Ingredients: {ingredients}</p>
//             <span>{soldOut ? 'SOLD OUT' : `Price: ${price}`}</span>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

export default PizzaDetails;
