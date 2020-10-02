import { isArray, isString, isNumber, isValidElement } from '../util';
import { createVNode, createVText, createVoid } from './vnode';

export function walkChildrenToGetChildNodes(childNodes, children, type) {
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

export function h(type, props, children) {
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

export default h;
