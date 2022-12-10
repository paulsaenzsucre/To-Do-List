import Task from './Task.js';
import TaskStorage from './TaskStorage.js';

class TaskRepository {
  #tasks;

  #storage;

  #user;

  constructor(user, storage) {
    this.#storage = new TaskStorage(user, storage);
    this.#tasks = this.#storage.load();
    this.#user = user;
  }

  addTask = (description) => {
    const task = new Task(this.#newIndex(), description);
    this.#tasks.push(task);
    this.#storage.save(this.#tasks);
    return task;
  }

  removeTask = (task) => {
    const newArray = this.#tasks.filter((element) => task !== element);
    this.#tasks = newArray;
    this.#orderIndexs();
    this.#storage.save(this.#tasks);
  }

  allTasks = () => this.#tasks;

  removeAllCompleted = () =>{
    const newArray = this.#tasks.filter((element) => element.completed !== true);
    this.#tasks = newArray;
    this.#orderIndexs();
    this.#storage.save(this.#tasks);
  }

  #orderIndexs = () => {
    this.#tasks.sort((a, b) => a.index - b.index);
    for (let i = 0; i < this.#tasks.length; i += 1) {
      this.#tasks[i].index = i;
    }
  }

  #newIndex = () => this.#tasks.length;
}

export default TaskRepository;