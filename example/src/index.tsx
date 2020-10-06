import React from '../../src';
import { createHookContext, useReducer } from '../../src/hooks';

function hit(amount = 1) {
  var [count,incCounter] = useReducer(updateCounter,0);
  incCounter(amount);

  console.log(`Hit count: ${count+amount}`);
}

function updateCounter(prevCount,val) {
  return prevCount + val;
}

const _hit = createHookContext(hit);

_hit();       // Hit count: 1
_hit();       // Hit count: 2
_hit(8);      // Hit count: 10


class HelloMessage extends React.Component {
  render() {
    const textNode = (
      <div>
        <h1>Hey Hamster</h1>
        <p>count: 0</p>
        <button>Increase</button>
      </div>
    );

    console.log('<div vnode>', textNode);

    return textNode;
  }
}

//@ts-ignore
React.render(<HelloMessage />, document.body);


interface Props {
  [prop: string]: any;
  ref?: React.Ref<any>;
}
// import React, { useState, useRef, useEffect } from 'react';
// import ReactDOM from 'react-dom';

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
