const DEFAULT_BOOK_STORAGE_KEY = 'sh9bniCUuU';

class TaskStorage {
  #key;

  constructor(user, storage) {
    this.#key = `${DEFAULT_BOOK_STORAGE_KEY}-${user.key}-${storage}`;
  }

  load = () => {
    if (localStorage.getItem(this.#key) === null) return [];
    return JSON.parse(localStorage.getItem(this.#key));
  }

  save = (books) => {
    localStorage.setItem(this.#key, JSON.stringify(books));
  }
}

export default TaskStorage;