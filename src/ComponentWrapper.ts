import { VNodeType } from './vdom/vnode';
import { createDOMElement } from './element';

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
    let rendered: unknown;

    if (typeof this.type.prototype.render === 'function') {
      // 类组件
      const component = new this.type();
      rendered = component.render();
    } else {
      // 函数组件
      rendered = this.type();
    }

    return createDOMElement(rendered);
  }
}

export default ComponentWrapper;
