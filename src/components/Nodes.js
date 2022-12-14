export default function Nodes({ $target, initialState, onClick }) {
  this.$element = document.createElement('div');
  this.$element.className = 'Nodes';
  this.state = initialState;
  this.onClick = onClick;

  $target.appendChild(this.$element);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.nodes) {
      const nodesTemplate = this.state.nodes
        .map((node) => {
          const iconPath =
            node.type === 'FILE'
              ? './assets/file.png'
              : './assets/directory.png';

          return `
            <div class="Node" data-node-id=${node.id}>
              <img src="${iconPath}" />
              <div>${node.name}</div>
            </div>
          `;
        })
        .join('');

      this.$element.innerHTML = !this.state.isRoot
        ? `<div class="node"><img src="/assets/prev.png" /></div>${nodesTemplate}`
        : nodesTemplate;
    }

    this.$element.querySelectorAll('.Node').forEach(($node) => {
      $node.addEventListener('click', (e) => {
        const { nodeId } = e.target.dataset;
        const selectedNode = this.state.nodes.find(
          (node) => node.id === nodeId
        );

        if (selectedNode) {
          this.onClick(selectedNode);
        }
      });
    });
  };

  this.render();
}
