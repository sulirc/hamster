import React from '../../src';
import { createHC, useReducer, useState } from '../../src/hooks';

function updateCounter(prevCount, val) {
  return prevCount + val;
}

function getString() {
  return Math.random().toString(16).slice(2, 10).toUpperCase();
}

// useReducer
// function hit(amount = 1) {
//   var [count,incCounter] = useReducer(updateCounter,0);
//   incCounter(amount);

//   console.log(`Hit count: ${count+amount}`);
// }

// useState
// function hit(amount = 1) {
//   var [count, setCount] = useState(0);
//   var [str, setString] = useState(getString());
//   // setCount(prev => prev + amount);
//   setCount(amount);
//   setString(getString())

//   console.log(`State value count: ${count}`);
//   console.log(`State value str: ${str}`);
// }

// const _hit = createHC(hit);

// _hit(2);
// _hit(4);
// _hit(8);
// _hit(16);

function Blackboard() {
  const [str, setString] = useState(getString());

  function updateBlackboard() {
    setString(getString())
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

    console.log('<div vnode>', textNode);

    return textNode;
  }
}

// @ts-ignore
React.render(<HelloMessage />, document.body);

// import React, { useState, useRef, useEffect } from 'react';
// import ReactDOM from 'react-dom';

// interface Props {
//   [prop: string]: any;
//   ref?: React.Ref<any>;
// }
// const ChildComponent = React.forwardRef((_: Props, ref: any) => {
//   useState('foo');
//   useState('bar');
//   useState('baz');

//   return <div ref={ref}>Hey</div>;
// });

// const ParentComponent: React.FC = () => {
//   const childFiberRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // let hookNode = (childFiberRef.current as any).memoizedState;

//     console.log(childFiberRef);
//     // hookNode = hookNode.next;
//     // console.log(hookNode.memoizedState);
//     // hookNode = hookNode.next;
//     // console.log(hookNode.memoizedState);
//   });

//   return <ChildComponent ref={childFiberRef} />;
// };

// ReactDOM.render(<ParentComponent />, document.getElementById('root'));
