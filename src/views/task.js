class TaskCardView extends HTMLElement {
  constructor() {
    super();
    const title = '';
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const wrapper = createElement('div', ['task'], {
      'draggable': true,
    });
    var checkbox = createElement('input', [], { 'type': 'checkbox' });
    var titleElement = createElement('span', ['title']);
    titleElement.textContent = this.title;
    wrapper.append(checkbox);
    wrapper.append(titleElement);

    shadow.append(wrapper);
  }

  static get observedAttributes() {
    return ['title'];
  }
}

customElements.define('task-card', TaskCardView);