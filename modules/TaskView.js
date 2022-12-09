import iconMoreVert from '../src/icon-more-vert.svg';
import iconCheck from '../src/icon-check.svg';

class TaskView {
  #task;

  #container;

  #view;

  constructor(task, container) {
    this.#task = task;
    this.#container = container;
    this.#view = this.#create();
  }

  #create = () => {
    let element;
    const list = document.createElement('li');
    list.setAttribute('class', 'todo');

    element = document.createElement('img');
    element.setAttribute('class', 'icon-check');
    element.setAttribute('src', iconCheck);
    if (this.#task.completed) element.classList.add('task-completed');
    else element.classList.remove('task-completed');
    list.appendChild(element);

    element = document.createElement('label');
    element.setAttribute('class', 'todo-label');
    element.appendChild(document.createTextNode(this.#task.description));
    list.appendChild(element);

    element = document.createElement('img');
    element.setAttribute('class', 'icon-more-vert');
    element.setAttribute('src', iconMoreVert);
    list.appendChild(element);

    return list;
  }

  remove = () => {
    this.#view.remove();
  }

  show = () => {
    this.#container.appendChild(this.#view);
  }
}

export default TaskView;