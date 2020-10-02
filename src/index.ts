import Component from './Component';
import { mountVNodeToDOM, mountElement, createElement } from './element';

// 提供作为挂载渲染入口：e.g. ReactDOM.render
function render(vnode, container) {
  const dom = mountVNodeToDOM(vnode);

  mountElement(dom, container);
}

export default {
  render,
  Component,
  createElement,
};
