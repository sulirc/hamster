import React from '../../src';
import { createHC, useReducer, useState, useEffect } from '../../src/hooks';

function updateCounter(prevCount, val) {
  return prevCount + val;
}

function getString() {
  return Math.random().toString(16).slice(2, 10).toUpperCase();
}

// function hit(amount = 1) {
//   var [count,incCounter] = useReducer(updateCounter,0);
//   incCounter(amount);

//   console.log(`Hit count: ${count+amount}`);
// }


function hit(amount = 1) {
  var [count, setCount] = useState(0);
  var [str, setString] = useState(getString());
  // setCount(prev => prev + amount);
  const nextString = getString();
  setCount(amount);
  setString(nextString);

  useEffect(() => {
    function handleClick() {
      console.log(`Hey, I am a console log effect! - ${str}`);
    }
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [str]);

  console.log(`State value count: ${count}`);
  console.log(`State value str: ${str}`);
}

const hitWithContext = createHC(hit);

hitWithContext(2);
hitWithContext(4);
hitWithContext(8);
hitWithContext(16);

function Blackboard() {
  const [str, setString] = useState(getString());

  function updateBlackboard() {
    setString(getString());
  }

  return (
    <div className="blackboard">
      <div>Blackboard: {str}</div>
      <button onClick={updateBlackboard}>Write</button>
    </div>
  );
}

const BlackboardHOC = createHC(Blackboard);

class HelloMessage extends React.Component {
  render() {
    const textNode = (
      <div>
        <h1>Hey Hamster</h1>
        <BlackboardHOC />
      </div>
    );

    return textNode;
  }
}

// @ts-ignore
React.render(<HelloMessage />, document.body);
