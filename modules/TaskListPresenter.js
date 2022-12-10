import TaskPresenter from './TaskPresenter.js';

class TaskListPresenter {
  #presenters;

  #taskList;

  #clearAllBtn;

  #view;

  constructor(taskRepository) {
    this.#presenters = [];

    this.#view = document.createElement('div');
    this.#taskList = document.createElement('ul');
    this.#taskList.setAttribute('class', 'list');
    const tasks = taskRepository.allTasks();

    if (tasks !== null) {
      tasks.forEach((task) => this.addTaskView(task));
    }

    this.#view.appendChild(this.#taskList);
    this.#clearAllBtn = document.createElement('button');
    this.#clearAllBtn.setAttribute('type', 'button');
    this.#clearAllBtn.setAttribute('class', 'clear-all-btn');
    this.#clearAllBtn.innerText = 'Clear all completed';
    this.#clearAllBtn.addEventListener('click', this.removeAllCompleted);
    this.#view.appendChild(this.#clearAllBtn);
  }

  getView = () => this.#view;

  addTaskView = (task) => {
    const taskPresenter = new TaskPresenter(task);
    this.#presenters.push(taskPresenter);
    this.#taskList.appendChild(taskPresenter.getView());
  }

  removeAllCompleted = () => {
    const newArray = this.#presenters.filter((presenter) => {
      if (presenter.getCheckedState() === true) {
        presenter.getView().remove();
        return false;
      } return true;
    });

    this.#presenters = newArray;
    const removeAllCompleted = new CustomEvent('removeAllCompleted', {
      detail: {},
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    this.#view.dispatchEvent(removeAllCompleted);
  }
}

export default TaskListPresenter;