import React from '../../src';

class HelloMessage extends React.Component {
  render() {
    const textNode = (
      <div>
        <h1>Hey Nerv</h1>
        <p>simple react-like impl</p>
      </div>
    );

    console.log('<div vnode>', textNode);

    return textNode;
  }
}

const vnode = <HelloMessage name="Nerv" />;

React.render(vnode, document.body);
