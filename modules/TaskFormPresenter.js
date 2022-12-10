class TaskFormPresenter {
  #input;

  #submit;

  #view;

  constructor() {
    this.#view = document.createElement('form');
    this.#input = document.createElement('input');
    this.#input.setAttribute('placeholder', 'Add to your list...');
    this.#input.setAttribute('id', 'new-item');
    this.#input.setAttribute('type', 'text');
    this.#view.appendChild(this.#input);
    this.#submit = document.createElement('input');
    this.#submit.setAttribute('class', 'icon-return');
    this.#submit.setAttribute('id', 'submit-new-item');
    this.#submit.setAttribute('type', 'submit');
    this.#submit.setAttribute('value', '');
    this.#submit.setAttribute('title', 'click this or press enter to submit');
    this.#view.appendChild(this.#submit);
    this.#view.addEventListener('submit', this.#submitTask);
  }

  getView = () => this.#view;

  cleanForm = () => {
    this.#input.value = '';
  }

  #submitTask = () => {
    const newTask = new CustomEvent('newTask', {
      detail: this.#input.value,
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    this.#view.dispatchEvent(newTask);
  }
}
export default TaskFormPresenter;