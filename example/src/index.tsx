import React from '../../src';
import {
  createHC,
  useReducer,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from '../../src/hooks';

function updateCounter(prevCount, val) {
  return prevCount + val;
}

let id = 0;
function getString() {
  return `Unique String Id - ${id++}`;
}

// function hit(amount = 1) {
//   var [count,incCounter] = useReducer(updateCounter,0);
//   incCounter(amount);

//   console.log(`Hit count: ${count+amount}`);
// }

function computedWhatWrongWithYou() {
  console.log('Computing...');
  return 'You are OK';
}

const initialString = getString();
function hit(amount = 1) {
  const [count, setCount] = useState(0);
  const [str, setString] = useState(initialString);
  // setCount(prev => prev + amount);
  const nextString = getString();
  setCount(amount);
  setString(nextString);

  console.log(`! State value count: ${count}`);
  console.log(`! State value str: ${str}`);

  // const answer = useMemo(computedWhatWrongWithYou);
  // console.log("What's wrong with you? ", answer);

  // function showEffect() {
  //   console.log(`Hey, I am a console log effect! - ${str}`);
  // }

  // const cb = useCallback(
  //   function changeableFunc() {
  //     console.log(`I am changeable! - ${str}`);
  //   },
  //   ['Fake Guards']
  // );

  // cb();

  const strRef = useRef(str);

  console.log('unique string ref:', strRef);

  // useEffect(() => {
  //   window.addEventListener('click', showEffect);
  //   return () => {
  //     window.removeEventListener('click', showEffect);
  //   };
  // }, [str]);

  console.log('===========================');
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
