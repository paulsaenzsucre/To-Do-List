class Task {
  index;

  description;

  completed;

  constructor(index, description, completed = false) {
    this.index = index;
    this.description = description;
    this.completed = completed;
  }
}

export default Task;