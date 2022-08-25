import Breadcrumb from './Breadcrumb.js';
import Nodes from './Nodes.js';

import { request } from '../api/index.js';

export default function App({ $target }) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
  };

  const init = async () => {
    try {
      const rootNodes = await request();
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      });
    } catch (error) {
      alert(`${errror}, 요청 실패`);
    }
  };

  init();

  const breadcrumb = new Breadcrumb({
    $target,
    initialState: this.state.depth,
  });

  const nodes = new Nodes({
    $target,
    initialState: { isRoot: this.state.isRoot, nodes: this.state.nodes },
    onClick: async (node) => {
      try {
        if (node.type === 'DIRECTORY') {
          const nextNodes = await request(node.id);
          this.setState({
            ...this.state,
            deapth: [...this.state.depth, node],
            nodes: nextNodes,
          });
        } else if (node.type === 'FILE') {
        }
      } catch (error) {
        alert(`${errror}, 요청 실패`);
      }
    },
  });
}
