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

export default Component;