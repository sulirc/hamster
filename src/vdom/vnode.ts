export const enum VNodeType {
  Text = 1,
  Node = 1 << 1,
  Composite = 1 << 2,
  Void = 1 << 4,
  Portal = 1 << 5,
}

export function createVNode(type, props, children) {
  return {
    vtype: VNodeType.Node,
    type,
    props: props || {},
    children,
    dom: null,
  };
}

export function createVoid() {
  return {
    dom: null,
    vtype: VNodeType.Void,
  };
}

export function createVText(text) {
  return {
    vtype: VNodeType.Text,
    text,
    dom: null,
  };
}
