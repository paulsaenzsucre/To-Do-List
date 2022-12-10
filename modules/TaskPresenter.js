import iconMoreVert from '../src/icon-more-vert.svg';
import iconCheck from '../src/icon-check.svg';
import iconTrash from '../src/icon-trash.svg';

class TaskPresenter {
  #task;

  #view;

  #checkIcon;

  #label;

  #input;

  #moreIcon;

  #changeState;

  constructor(task) {
    this.#changeState = new CustomEvent('changeState', {
      detail: {},
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    this.#task = task;
    this.#view = document.createElement('li');
    this.#view.setAttribute('class', 'todo');
    this.#view.setAttribute('draggable', true);

    const div = document.createElement('div');
    div.setAttribute('class', 'desc-cont');
    this.#checkIcon = document.createElement('img');
    this.#checkIcon.addEventListener('click', this.toggleCheckState);
    this.#label = document.createElement('label');
    this.#label.setAttribute('class', 'todo-label');
    this.#label.addEventListener('click', this.editState);
    this.#label.setAttribute('for', `task-${this.#task.index}`);
    div.appendChild(this.#label);
    this.#input = document.createElement('input');
    this.#input.setAttribute('id', `task-${this.#task.index}`);
    this.#input.setAttribute('type', 'text');
    this.#input.setAttribute('class', 'todo-label');
    div.appendChild(this.#input);
    this.#moreIcon = document.createElement('img');

    this.#view.appendChild(this.#checkIcon);
    this.#view.appendChild(div);
    this.#view.appendChild(this.#moreIcon);
    this.showState();
  }

  getView = () => this.#view;

  getCheckedState = () => this.#task.completed;

  removeFromDom = () => {
    const removeTask = new CustomEvent('removeTask', {
      detail: this.#task,
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    this.#view.dispatchEvent(removeTask);
    this.#view.remove();
  }

  showState = () => {
    this.#view.classList.remove('edit-task');
    this.#input.classList.add('hidden');
    this.#label.classList.remove('hidden');
    this.#checkIcon.setAttribute('class', 'icon-check');
    this.#checkIcon.setAttribute('src', iconCheck);
    this.#view.classList.remove('hidden');
    if (this.#task.completed) this.#checkIcon.classList.add('task-completed');
    else this.#checkIcon.classList.remove('task-completed');

    this.#label.innerText = this.#task.description;
    this.#input.classList.add('hidden');

    this.#moreIcon.setAttribute('class', 'icon-more-vert');
    this.#moreIcon.setAttribute('src', iconMoreVert);
    this.#moreIcon.removeEventListener('click', this.removeFromDom);
  }

  hiddenState = () => {
    this.#view.classList.remove('hidden');
  }

  editState = () => {
    this.#view.classList.add('edit-task');
    this.#input.classList.remove('hidden');
    this.#label.classList.add('hidden');
    this.#input.setAttribute('value', this.#task.description);
    this.#input.focus();
    this.#input.addEventListener('blur', () => {
      this.#task.description = this.#input.value;
      this.#view.dispatchEvent(this.#changeState);
      this.showState();
    });
    this.#input.addEventListener('keypress', (evt) => {
      if (evt.key === 'Enter') {
        this.#task.description = this.#input.value;
        this.#view.dispatchEvent(this.#changeState);
        this.showState();
      }
    });
    this.#moreIcon.setAttribute('class', 'icon-trash');
    this.#moreIcon.setAttribute('src', iconTrash);
    this.#moreIcon.addEventListener('click', this.removeFromDom);
  }

  toggleCheckState = () => {
    this.#task.completed = !this.#task.completed;
    this.#checkIcon.classList.toggle('task-completed');
    this.#label.classList.toggle('completed');
    this.#view.dispatchEvent(this.#changeState);
  }
}

export default TaskPresenter;