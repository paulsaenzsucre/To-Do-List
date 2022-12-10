import Task from './Task.js';
import TaskFormPresenter from './TaskFormPresenter.js';
import TaskListPresenter from './TaskListPresenter';
import TaskRepository from './TaskRepository';

class ContainerPresenter {
  #taskRepository;
  
  #parent;

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
    this.#form = new TaskFormPresenter();
    this.#view.appendChild(this.#form.getView());
    this.#taskList = new TaskListPresenter(this.#taskRepository);
    this.#view.appendChild(this.#taskList.getView());
    this.#parent.appendChild(this.#view);
  }

  #newTask = (evt) => {
    const newTask = this.#taskRepository.addTask(evt.detail);
    this.#taskList.addTaskView(newTask);
  }

  #removeTask = (evt) => this.#taskRepository.removeTask(evt.detail);

  #removeAllCompleted = () => this.#taskRepository.removeAllCompleted();
}
export default ContainerPresenter;