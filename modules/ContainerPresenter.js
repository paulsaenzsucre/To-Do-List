import TaskFormPresenter from './TaskFormPresenter.js';
import TaskListPresenter from './TaskListPresenter.js';
import TaskRepository from './TaskRepository.js';
import TaskListHeaderPresenter from './TaskListHeaderPresenter.js';

class ContainerPresenter {
  #taskRepository;

  #parent;

  #header;

  #form;

  #taskList;

  #view;

  constructor(parent, taskRepository = null) {
    this.#parent = parent;
    this.#taskRepository = taskRepository === null
      ? new TaskRepository()
      : taskRepository;
    this.#view = document.createElement('section');
    this.#view.setAttribute('id', 'list-cont');
    this.#view.setAttribute('class', 'center');
    this.#view.addEventListener('newTask', this.#newTask);
    this.#view.addEventListener('removeAllCompleted', this.#removeAllCompleted);
    this.#view.addEventListener('removeTask', this.#removeTask);
    this.#view.addEventListener('changeState', this.#changeState);
    this.#header = new TaskListHeaderPresenter();
    this.#header.setCompletedCount(this.#taskRepository.getCompletedCount());
    this.#view.appendChild(this.#header.getView());
    this.#form = new TaskFormPresenter();
    this.#view.appendChild(this.#form.getView());
    this.#taskList = new TaskListPresenter(this.#taskRepository);
    this.#view.appendChild(this.#taskList.getView());
    this.#parent.appendChild(this.#view);
  }

  #changeState = () => {
    this.#taskRepository.updateStorage();
    this.#header.setCompletedCount(this.#taskRepository.getCompletedCount());
  }

  #newTask = (evt) => {
    const newTask = this.#taskRepository.addTask(evt.detail);
    this.#taskList.addTaskView(newTask);
  }

  #removeTask = (evt) => {
    this.#taskRepository.removeTask(evt.detail);
    this.#header.setCompletedCount(this.#taskRepository.getCompletedCount());
  }

  #removeAllCompleted = () => {
    this.#taskRepository.removeAllCompleted();
    this.#header.setCompletedCount(this.#taskRepository.getCompletedCount());
  }
}
export default ContainerPresenter;