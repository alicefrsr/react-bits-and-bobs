import { useState, useEffect } from 'react';
import styles from './EatAndSplit.module.css';
import BackHomeLink from '../BackHomeLink';

const initialFriends = [
  {
    id: 933372,
    name: 'Alice',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 118836,
    name: 'Bob',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 499476,
    name: 'Charlie',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

const Button = ({ children, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

const EatAndSplitApp = () => {
  useEffect(() => {
    document.title = 'Eat & Split App';
    // clean up
    return () => (document.title = 'bits&bobs | Home');
  }, []);
  // state to display AddFriend Form based on 'Add friend' btn
  const [showFormAddFriend, setShowFormAddFriend] = useState(false);

  // state to display SplitBill Form based on 'Select' friend btn
  const [selectedFriend, setSelectedFriend] = useState(null);

  // friend*S* state created in FormAddFriend is needed here to be passed down as props to all other components that need it
  const [friends, setFriends] = useState(initialFriends);
  // this is also the state we are updating with splitBill event

  // function that will update friends with newFriend created in AddForm. Passed down to AddForm as props, renamed onAddFriend as a convention
  const handleAddFriend = (friend) => {
    setFriends((friends) => [...friends, friend]);
    // toggleFormAddFriend();
    // OR:
    setShowFormAddFriend(false);
  };

  // toggling forms on / off
  const toggleFormAddFriend = () => {
    setShowFormAddFriend((show) => !show);
  };

  const handleSelection = (friend) => {
    // setSelectedFriend(friend);
    setSelectedFriend((currSelected) =>
      currSelected?.id === friend.id ? null : friend
    );
    setShowFormAddFriend(false);
  };

  const handleSplitBill = (value) => {
    console.log(value);
    const updatedFriend = (friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      );
    setFriends(updatedFriend);

    // to close FormSplitBill systematically so that form state resets when select a different friend. Alternatively, set a key prop to FormSplitBill
    setSelectedFriend(null);
  };

  return (
    <div className={styles.app}>
      <BackHomeLink />
      <div className={styles.intro}>
        <h1>Split bills with your friends</h1>
        <p>
          Choose a friend you want split a bill with, or add a new friend to
          your list.
        </p>
        <p>
          Enter the bill amount, who paid, how much, and the app keeps track of
          who owes who so you don&#39;t have to.
        </p>
      </div>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <FriendsList
            friends={friends}
            selectedFriend={selectedFriend}
            onSelection={handleSelection}
          />
          {showFormAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

          <Button onClick={toggleFormAddFriend}>
            {showFormAddFriend ? 'Close' : 'Add Friend'}
          </Button>
        </div>
        {selectedFriend && (
          <FormSplitBill
            selectedFriend={selectedFriend}
            onSplitBill={handleSplitBill}
            // key={selectedFriend.id} // for state to 'reset' when selecting different friend
            // not needed if the form is closed on submit
          />
        )}
      </div>
    </div>
  );
};

const FriendsList = ({ friends, onSelection, selectedFriend }) => {
  return (
    <>
      <h2 className={styles.friendslistTitle}>Who&#39;s up for splitting?</h2>
      <ul>
        {friends.map((friend) => (
          <FriendCard
            friend={friend}
            key={friend.id}
            selectedFriend={selectedFriend}
            onSelection={onSelection}
          />
        ))}
      </ul>
    </>
  );
};

const FriendCard = ({ friend, onSelection, selectedFriend }) => {
  // const isSelected = selectedFriend && selectedFriend.id === friend.id;
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? `${styles.selected}` : ''}>
      <img src={friend.image} alt={friend.name} />

      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className={styles.red}>
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}

      {friend.balance > 0 && (
        <p className={styles.green}>
          {friend.name} owes you {friend.balance}€
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  );
};

const FormAddFriend = ({ onAddFriend }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  const handleAddFriend = (e) => {
    e.preventDefault();
    if (!name || !image) return;

    // create a new id outside obj to use it to create a new image
    const id = crypto.randomUUID();
    // create a new friend object
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
      // id: crypto.randomUUID(), // will not work in all the browsers
    };
    // clear input fields
    setName('');
    setImage('https://i.pravatar.cc/48');

    // now add newFriend to friends array, which needs to be in parent component App
    // so create friends state in App component, + function handleAddFriend that takes in (newFriend). Pass this fn down here as a prop (as onAddFriend)
    onAddFriend(newFriend); // this sends the newFriend up to App, where state is updated
  };

  return (
    <form className={styles.formAddFriend} onSubmit={handleAddFriend}>
      <label htmlFor='friendName'>Friend name</label>
      <input
        id='friendName'
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor='friendImageURL'>Image URL</label>
      <input
        id='friendImageURL'
        type='text'
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
};

const FormSplitBill = ({ selectedFriend, onSplitBill }) => {
  const [bill, setBill] = useState('');
  const [userExpense, setUserExpense] = useState('');
  // derived state for friend's expense
  const friendsExpense = bill ? bill - userExpense : '';
  const [whoIsPaying, setWhoIsPaying] = useState('user');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bill || !userExpense) return;
    // value we are lift up to App component to pass down to FriensList then Friend Card to update state is either friendsExpense or userExpense.
    // if whoIsPaying === 'user' is true, your friend will owe you so positive number
    // if whoIsPaying === 'user' is false, your friend will be owed so negative number
    const value = whoIsPaying === 'user' ? friendsExpense : -userExpense;
    // this value will then be added to friend.balance
    onSplitBill(value);
  };

  return (
    <form className={styles.formSplitBill} onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label htmlFor='billValue'>Bill value</label>
      <input
        id='billValue'
        type='number'
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label htmlFor='yourExpense'>Your expense</label>
      <input
        id='yourExpense'
        type='number'
        value={userExpense}
        onChange={(e) =>
          setUserExpense(
            Number(e.target.value) > bill ? userExpense : Number(e.target.value)
          )
        }
      />

      <label htmlFor='friendsExpense'>{selectedFriend.name}'s expense</label>
      <input id='friendsExpense' type='text' value={friendsExpense} disabled />

      <label htmlFor='payee'>Who is paying the bill</label>
      <select
        id='whoIsPaying'
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value='user'>You</option>
        <option value='friend'>{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
};

export default EatAndSplitApp;
