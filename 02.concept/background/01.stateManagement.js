import react, { useState } from "React";

function Counter() {
  // state
  const [counter, setCounter] = useState(0);

  // action
  // code that causes an update to the state when something happens
  const increment = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  return (
    <div>
      value: {counter} <button onClick={increment}>Increment</button>
    </div>
  );
}
