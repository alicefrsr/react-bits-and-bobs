import { useState, useEffect } from 'react';
import styles from './PackitApp.module.css';

const initialItems = [
  { id: 1, description: 'Passport', quantity: 1, packed: false },
  { id: 3, description: 'Sun screen', quantity: 1, packed: false },
  { id: 5, description: 'T-shirts', quantity: 7, packed: false },
  { id: 6, description: 'Flip flops', quantity: 1, packed: false },
];

function PackitApp() {
  useEffect(() => {
    document.title = 'Packit App';
    // clean up
    return () => (document.title = 'bits&bobs');
  }, []);

  const [items, setItems] = useState(initialItems);

  const handleDeleteItem = id => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  const handleTogglePackedItem = id => {
    const updatedItems = items => items.map(item => (item.id === id ? { ...item, packed: !item.packed } : item));
    setItems(updatedItems);
  };

  const handleAddItem = item => {
    // here we create a brand new items array because we cannot mutate the original one
    setItems(items => [...items, item]);
  };

  const handleClearList = () => {
    if (items.length === 0) return;
    const confirm = window.confirm('Are you sure you want to delete all items?');
    if (confirm) {
      setItems([]);
    }
  };

  return (
    <div className={styles.app}>
      <Header />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        setItems={setItems}
        onDeleteItem={handleDeleteItem}
        onTogglePackedItem={handleTogglePackedItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>📦 packit 🧳</h1>
      <h2>Your indispensable travel assistant.</h2>
    </header>
  );
};

const Form = ({ onAddItem }) => {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1); // set to number, but e.target.value is always a string

  const handleSubmit = e => {
    e.preventDefault();
    if (!description) return;
    const newItem = { id: Date.now(), quantity, description, packed: false };
    onAddItem(newItem);
    setDescription('');
  };
  return (
    <form
      className={styles.addForm}
      onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <div className={styles.formInputs}>
        <label htmlFor='number-select'></label>
        <select
          id='number-select'
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))} // e.target.value always a string
          // onChange={e => setQuantity(+e.target.value)}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1) // [1,2,3...20]
            .map(num => (
              <option
                key={num}
                value={num}>
                {num}
              </option>
            ))}
        </select>

        <label htmlFor='item'></label>
        <input
          type='text'
          id='item'
          placeholder='Enter item...'
          autoFocus
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button type='submit'>Add</button>
      </div>
    </form>
  );
};

const PackingList = ({ items, onDeleteItem, onTogglePackedItem, onClearList }) => {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;
  if (sortBy === 'input') sortedItems = items;

  if (sortBy === 'description')
    // first make copy to not mutate original (slice)
    // with strings:
    sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === 'packed') sortedItems = items.slice().sort((a, b) => Number(b.packed - a.packed));

  return (
    <>
      <div className={styles.listSection}>
        <ul>
          {sortedItems.map(itemObj => (
            <Item
              key={itemObj.id}
              itemObj={itemObj}
              onDeleteItem={onDeleteItem}
              onTogglePackedItem={onTogglePackedItem}
            />
          ))}
        </ul>
        <div className={styles.actions}>
          <select
            name='sort-items'
            id='sort-items'
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}>
            <option value='input'>Sort by input order</option>
            <option value='description'>Sort by description</option>
            <option value='packed'>Sort by packed status</option>
          </select>
          <button onClick={onClearList}>Clear list</button>
        </div>
      </div>
    </>
  );
};

const Item = ({ itemObj, onDeleteItem, onTogglePackedItem }) => {
  return (
    <li>
      <label htmlFor='item'></label>
      <input
        type='checkbox'
        id='item'
        value={itemObj.packed}
        onChange={() => onTogglePackedItem(itemObj.id)}
      />
      <span style={itemObj.packed ? { textDecoration: 'line-through' } : {}}>
        {itemObj.quantity} {itemObj.description}
      </span>
      <button onClick={() => onDeleteItem(itemObj.id)}>❌</button>
    </li>
  );
};

const Stats = ({ items }) => {
  if (!items.length)
    return (
      <div className={styles.stats}>
        <p>
          <em>Your list is empty.</em>
        </p>
      </div>
    );
  // derived state
  const numTotalItems = items.length;

  // 2 options for numPackedItems, .filter or reduce
  const numPackedItems = items.filter(item => item.packed).length;
  // function countPacked(count, item) {
  //   if (item.packed) return ++count;
  //   // console.log('inside count fn ', count);
  //   return count;
  // }
  // const numPackedItems = items.reduce(countPacked, 0);

  const numRemainingItems = items.filter(item => item.packed === false).length;
  const percentPacked = Math.round((numPackedItems / numTotalItems) * 100);

  return (
    <footer className={styles.stats}>
      <em>
        {percentPacked === 100 ? (
          <div>All done! Enjoy your trip and travel safe! </div>
        ) : (
          <div>
            <p>
              You have {numTotalItems} {numTotalItems <= 1 ? ' item ' : ' items '} on your list.
            </p>
            <p>
              Packed: {numPackedItems}
              {numPackedItems <= 1 ? ' item' : ' items'} ({percentPacked} %)
            </p>
            <p>
              Remaining: {numRemainingItems} {numRemainingItems <= 1 ? ' item' : ' items'}
            </p>
          </div>
        )}
      </em>
    </footer>
  );
};

export default PackitApp;
