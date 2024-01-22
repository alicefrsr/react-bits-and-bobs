import { useState } from 'react';

const Kata1 = () => {
  const [count, setCount] = useState(0);
  const isEven = count % 2 === 0;

  return (
    <div>
      <p>Topic: Reconciliation</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <button onClick={() => setCount(0)}>Reset</button>
      {isEven && <p id='p1'>P1 - count is even</p>}
      {/* <p id='p2'>P2 - count is displayed, regardless of odd or even</p> */}
      <p>test? P2 - count is even or odd, it doesn't matter</p>
    </div>
  );
};

export default Kata1;
