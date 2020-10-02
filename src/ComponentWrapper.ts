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
    const component = new this.type();
    const rendered = component.render();

    return createDOMElement(rendered);
  }
}

export default ComponentWrapper;