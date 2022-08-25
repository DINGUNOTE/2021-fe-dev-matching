export default function Breadcrumb({ $target, initialState }) {
  this.$element = document.createElement('nav');
  this.$element.className = 'Breadcrumb';
  this.state = initialState;

  $target.appendChild(this.$element);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$element.innerHTML = `
      <div>root</div>
      ${this.state
        .map((node, index) => `<div data-index="${index}">${node.name}</div>`)
        .join('')}
    `;
  };
}
