import { useParams } from 'react-router-dom';
import pizzaData from './data/pizzaData.js';
import styles from './pizzaDetailsApp.module.css';
import Note from '../note/Note';
import BackHomeLink from '../BackHomeLink.jsx';
import BackBtn from '../BackBtn.jsx';

const PizzaDetails = () => {
  // retrieve params where we store :id of the pizza we want:
  const { id } = useParams();
  // fetch the relevant pizza by matching the 2 ids
  const pizza = pizzaData.find((pizza) => pizza.pizzaId === id);

  ///////////////////
  // How to fetch data from an api:
  // const [pizza, setPizza] = React.useState(null);
  // const params = useParams();

  // React.useEffect(() => {
  //   fetch(`/api/pizzas/${params.id}`)
  //     .then((res) => res.json())
  //     .then((data) => setPizza(data.pizzas));
  // }, [params.id]);
  ///////////////////

  // deconstruct the pizza props we need
  const { name, photoName, soldOut, ingredients, price } = pizza;
  // if (pizzaObj.soldOut) return null;

  console.log(id);

  if (!pizza) return;

  return (
    <>
      <section className={styles.app}>
        <BackHomeLink type='white' />
        <BackBtn type='white' />
        <Note
          content={
            "Basic setup with data in js file, not a proper 'fetch' as if data was coming from a server. Only demonstrates how to store data to / retrieve data from using url state using 'params'."
          }
        />

        <div className={styles.pizzaDetails}>
          <img src={photoName} alt={name} />
          <div>
            <p className={styles.pizzaParams}>
              Pizza id from the url, with useParams(): <span>{id}</span>
            </p>
            <h3>Name: {name}</h3>
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
