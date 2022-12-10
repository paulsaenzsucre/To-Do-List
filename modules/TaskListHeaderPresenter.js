import iconArrowsCcw from '../src/icon-arrows-ccw.svg';

class TaskListHeaderPresenter {
  #completedCount;

  #listStats;

  #view;

  constructor() {
    this.#view = document.createElement('div');
    this.#view.setAttribute('class', 'list-header');
    const title = document.createElement('h2');
    title.setAttribute('class', 'list-header');
    title.innerText = 'Demo';
    this.#view.appendChild(title);
    this.#listStats = document.createElement('div');
    this.#listStats.setAttribute('class', 'list-stats');
    this.#view.appendChild(this.#listStats);
    this.#completedCount = document.createElement('span');
    this.#completedCount.setAttribute('class', 'changes-count');
    this.#listStats.appendChild(this.#completedCount);
    const icon = document.createElement('img');
    icon.setAttribute('class', 'icon-arrows-ccw');
    icon.setAttribute('src', iconArrowsCcw);
    this.#listStats.appendChild(icon);
  }

  getView = () => this.#view;

  setCompletedCount = (count) => {
    this.#completedCount.innerText = count;
    if (count === 0) this.#completedCount.classList.add('hidden');
    else this.#completedCount.classList.remove('hidden');
  }
}
export default TaskListHeaderPresenter;