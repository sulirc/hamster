import {
  isArray,
  isString,
  isNumber,
  isFunction,
  isValidElement,
} from './util';
import { VNodeType, createVNode, createVText, createVoid } from './vnode';

function walkChildrenToGetChildNodes(childNodes, children, type) {
  if (isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      walkChildrenToGetChildNodes(childNodes, children[i], type);
    }
  } else if (isString(children) || isNumber(children)) {
    childNodes.push(createVText(String(children)));
  } else if (isValidElement(children)) {
    childNodes.push(children);
  } else {
    childNodes.push(createVoid());
  }
}

function h(type, props, children) {
  const childNodes = [];
  if (isArray(children)) {
    walkChildrenToGetChildNodes(childNodes, children, type);
  } else if (isString(children) || isNumber(children)) {
    children = createVText(String(children));
  } else if (!isValidElement(children)) {
    children = [];
  }

  props.children = childNodes.length > 0 ? childNodes : children;

  return createVNode(type, props, props.children);
}

// 挂载虚拟节点到真实 DOM 环境
function mountVNodeToDOM(vnode) {
  let domNode: Element;

  const vtype = vnode.vtype;

  if (vtype & VNodeType.Composite) {
    domNode = vnode.init();
  }

  return domNode;
}

function mountChild(child, domNode) {
  // 递归调用 mountChild -> createDOMElement
  const childNode = createDOMElement(child);

  mountElement(childNode, domNode);
}

// 将子节点插入至父节点
function mountElement(childNode, parentNode) {
  parentNode.appendChild(childNode);
}

// 创建真实 DOM 节点
const doc = document;
function createDOMElement(vnode) {
  let domNode: any;
  const vtype = vnode.vtype;
  const children = vnode.children;

  if (vtype & VNodeType.Composite) {
    // 递归处理 init -> createDOMElement
    domNode = vnode.init();
  } else if (vtype & VNodeType.Text) {
    // 创建纯文本节点
    domNode = doc.createTextNode(vnode.text);
  } else if (vtype & VNodeType.Node) {
    // 创建元素节点
    domNode = doc.createElement(vnode.type);

    if (isArray(children)) {
      for (let i = 0, len = children.length; i < len; i++) {
        mountChild(children[i], domNode);
      }
    } else {
      mountChild(vnode.children, domNode);
    }
  }

  return domNode;
}

// 提供作为挂载渲染入口：e.g. ReactDOM.render
function render(vnode, container) {
  const dom = mountVNodeToDOM(vnode);

  mountElement(dom, container);
}

function createElement(type, properties, ...children) {
  // Element 类型
  if (isString(type)) {
    return h(type, properties || {}, children);
  }
  // Component 类型
  if (isFunction(type)) {
    return new ComponentWrapper(type, properties || {});
  }

  return type;
}

class ComponentWrapper {
  vtype = VNodeType.Composite;
  dom: Element | null;
  type: any;
  props: any;

  constructor(type, props) {
    this.type = type;
    this.props = props;
    this.dom = null;
  }

  init() {
    const component = new this.type();
    const rendered = component.render();

    return createDOMElement(rendered);
  }
}

// 提供给组件继承：e.g. React.Component
class Component {
  state = {};
  setState() {}
  getState() {}
  forceUpdate() {}

  render() {
    throw new Error('Component must implement render function');
  }
}

export default {
  render,
  Component,
  createElement,
};
