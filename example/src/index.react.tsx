import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  [prop: string]: any;
  ref?: React.Ref<any>;
}
const ChildComponent = React.forwardRef((_: Props, ref: any) => {
  useState('foo');
  useState('bar');
  useState('baz');

  return <div ref={ref}>Hey</div>;
});

const ParentComponent: React.FC = () => {
  const childFiberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // let hookNode = (childFiberRef.current as any).memoizedState;

    console.log(childFiberRef);
    // hookNode = hookNode.next;
    // console.log(hookNode.memoizedState);
    // hookNode = hookNode.next;
    // console.log(hookNode.memoizedState);
  });

  return <ChildComponent ref={childFiberRef} />;
};

ReactDOM.render(<ParentComponent />, document.getElementById('root'));
