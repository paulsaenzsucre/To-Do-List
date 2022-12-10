(self.webpackChunkto_do_list = self.webpackChunkto_do_list || []).push([['index'], {

  /***/ './modules/ContainerPresenter.js':
  /*! ***************************************!*\
  !*** ./modules/ContainerPresenter.js ***!
  \************************************** */
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => (__WEBPACK_DEFAULT_EXPORT__),
      /* harmony export */ });
    /* harmony import */ const _TaskFormPresenter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TaskFormPresenter.js */ './modules/TaskFormPresenter.js');
    /* harmony import */ const _TaskListPresenter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TaskListPresenter.js */ './modules/TaskListPresenter.js');
    /* harmony import */ const _TaskRepository_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TaskRepository.js */ './modules/TaskRepository.js');
    /* harmony import */ const _TaskListHeaderPresenter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TaskListHeaderPresenter.js */ './modules/TaskListHeaderPresenter.js');

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
      ? new _TaskRepository_js__WEBPACK_IMPORTED_MODULE_2__.default()
      : taskRepository;
    this.#view = document.createElement('section');
    this.#view.setAttribute('id', 'list-cont');
    this.#view.setAttribute('class', 'center');
    this.#view.addEventListener('newTask', this.#newTask);
    this.#view.addEventListener('removeAllCompleted', this.#removeAllCompleted);
    this.#view.addEventListener('removeTask', this.#removeTask);
    this.#view.addEventListener('changeState', this.#changeState);
    this.#header = new _TaskListHeaderPresenter_js__WEBPACK_IMPORTED_MODULE_3__.default();
    this.#header.setCompletedCount(this.#taskRepository.getCompletedCount());
    this.#view.appendChild(this.#header.getView());
    this.#form = new _TaskFormPresenter_js__WEBPACK_IMPORTED_MODULE_0__.default();
    this.#view.appendChild(this.#form.getView());
    this.#taskList = new _TaskListPresenter_js__WEBPACK_IMPORTED_MODULE_1__.default(this.#taskRepository);
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
    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContainerPresenter);
    /***/ }),

  /***/ './modules/Task.js':
  /*! *************************!*\
  !*** ./modules/Task.js ***!
  \************************ */
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => (__WEBPACK_DEFAULT_EXPORT__),
      /* harmony export */ });
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

    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Task);
    /***/ }),

  /***/ './modules/TaskFormPresenter.js':
  /*! **************************************!*\
  !*** ./modules/TaskFormPresenter.js ***!
  \************************************* */
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => (__WEBPACK_DEFAULT_EXPORT__),
      /* harmony export */ });
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
    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskFormPresenter);
    /***/ }),

  /***/ './modules/TaskListHeaderPresenter.js':
  /*! ********************************************!*\
  !*** ./modules/TaskListHeaderPresenter.js ***!
  \******************************************* */
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => (__WEBPACK_DEFAULT_EXPORT__),
      /* harmony export */ });
    /* harmony import */ const _src_icon_arrows_ccw_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/icon-arrows-ccw.svg */ './src/icon-arrows-ccw.svg');

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
    icon.setAttribute('src', _src_icon_arrows_ccw_svg__WEBPACK_IMPORTED_MODULE_0__);
    this.#listStats.appendChild(icon);
  }

  getView = () => this.#view;

  setCompletedCount = (count) => {
    this.#completedCount.innerText = count;
    if (count === 0) this.#completedCount.classList.add('hidden');
    else this.#completedCount.classList.remove('hidden');
  }
    }
    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskListHeaderPresenter);
    /***/ }),

  /***/ './modules/TaskListPresenter.js':
  /*! **************************************!*\
  !*** ./modules/TaskListPresenter.js ***!
  \************************************* */
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => (__WEBPACK_DEFAULT_EXPORT__),
      /* harmony export */ });
    /* harmony import */ const _TaskPresenter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TaskPresenter.js */ './modules/TaskPresenter.js');

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
    const taskPresenter = new _TaskPresenter_js__WEBPACK_IMPORTED_MODULE_0__.default(task);
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

    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskListPresenter);
    /***/ }),

  /***/ './modules/TaskPresenter.js':
  /*! **********************************!*\
  !*** ./modules/TaskPresenter.js ***!
  \********************************* */
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => (__WEBPACK_DEFAULT_EXPORT__),
      /* harmony export */ });
    /* harmony import */ const _src_icon_more_vert_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/icon-more-vert.svg */ './src/icon-more-vert.svg');
    /* harmony import */ const _src_icon_check_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/icon-check.svg */ './src/icon-check.svg');
    /* harmony import */ const _src_icon_trash_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/icon-trash.svg */ './src/icon-trash.svg');

    class TaskPresenter {
  #task;

  #view;

  #checkIcon;

  #label;

  #input;

  #moreIcon;

  constructor(task) {
    this.#task = task;
    this.#view = document.createElement('li');
    this.#view.setAttribute('class', 'todo');
    this.#view.setAttribute('draggable', true);

    this.#checkIcon = document.createElement('img');
    this.#checkIcon.addEventListener('click', this.toggleCheckState);
    this.#label = document.createElement('label');
    this.#label.setAttribute('class', 'todo-label');
    this.#label.addEventListener('click', this.editState);
    this.#label.setAttribute('for', `task-${this.#task.index}`);
    this.#input = document.createElement('input');
    this.#input.setAttribute('id', `task-${this.#task.index}`);
    this.#input.setAttribute('type', 'text');
    this.#input.setAttribute('class', 'todo-label');
    this.#moreIcon = document.createElement('img');

    this.#view.appendChild(this.#checkIcon);
    this.#view.appendChild(this.#label);
    this.#view.appendChild(this.#input);
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
    this.#checkIcon.setAttribute('src', _src_icon_check_svg__WEBPACK_IMPORTED_MODULE_1__);
    this.#view.classList.remove('hidden');
    if (this.#task.completed) this.#checkIcon.classList.add('task-completed');
    else this.#checkIcon.classList.remove('task-completed');

    this.#label.innerText = this.#task.description;
    this.#input.classList.add('hidden');

    this.#moreIcon.setAttribute('class', 'icon-more-vert');
    this.#moreIcon.setAttribute('src', _src_icon_more_vert_svg__WEBPACK_IMPORTED_MODULE_0__);
  }

  hiddenState = () => {
    this.#view.classList.remove('hidden');
  }

  editState = () => {
    this.#view.classList.add('edit-task');
    this.#label.classList.add('hidden');
    this.#input.classList.remove('hidden');
    this.#input.setAttribute('value', this.#task.description);
    this.#input.focus();
    this.#input.addEventListener('blur', () => {
      this.#task.description = this.#input.value;
      this.showState();
    });
    this.#input.addEventListener('keypress', (evt) => {
      if (evt.key === 'Enter') {
        this.#task.description = this.#input.value;
        this.showState();
      }
    });
    this.#moreIcon.setAttribute('class', 'icon-trash');
    this.#moreIcon.setAttribute('src', _src_icon_trash_svg__WEBPACK_IMPORTED_MODULE_2__);
    this.#moreIcon.addEventListener('click', this.removeFromDom);
  }

  toggleCheckState = () => {
    this.#task.completed = !this.#task.completed;
    this.#checkIcon.classList.toggle('task-completed');
    this.#label.classList.toggle('completed');
    const changeState = new CustomEvent('changeState', {
      detail: {},
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    this.#view.dispatchEvent(changeState);
  }
    }

    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskPresenter);
    /***/ }),

  /***/ './modules/TaskRepository.js':
  /*! ***********************************!*\
  !*** ./modules/TaskRepository.js ***!
  \********************************** */
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => (__WEBPACK_DEFAULT_EXPORT__),
      /* harmony export */ });
    /* harmony import */ const _Task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task.js */ './modules/Task.js');
    /* harmony import */ const _TaskStorage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TaskStorage.js */ './modules/TaskStorage.js');
    /* harmony import */ const _User_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./User.js */ './modules/User.js');

    class TaskRepository {
  #tasks;

  #storage;

  #user;

  constructor(user = null, storageName = null) {
    this.#user = user === null
      ? new _User_js__WEBPACK_IMPORTED_MODULE_2__.default('Guess', 'guess')
      : user;
    this.#storage = storageName === null
      ? new _TaskStorage_js__WEBPACK_IMPORTED_MODULE_1__.default(this.#user, 'default')
      : new _TaskStorage_js__WEBPACK_IMPORTED_MODULE_1__.default(this.#user, storageName);
    this.#tasks = this.#storage.load();
    this.#user = user;
  }

  updateStorage = () => this.#storage.save(this.#tasks);

  addTask = (description) => {
    const task = new _Task_js__WEBPACK_IMPORTED_MODULE_0__.default(this.#newIndex(), description);
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

  getCompletedCount = () => this.#tasks.filter((task) => task.completed === true).length;

  removeAllCompleted = () => {
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

    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskRepository);
    /***/ }),

  /***/ './modules/TaskStorage.js':
  /*! ********************************!*\
  !*** ./modules/TaskStorage.js ***!
  \******************************* */
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => (__WEBPACK_DEFAULT_EXPORT__),
      /* harmony export */ });
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

    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskStorage);
    /***/ }),

  /***/ './modules/User.js':
  /*! *************************!*\
  !*** ./modules/User.js ***!
  \************************ */
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => (__WEBPACK_DEFAULT_EXPORT__),
      /* harmony export */ });
    class User {
  name;

  key;

  constructor(name, key) {
    this.name = name;
    this.key = key;
  }
    }

    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);
    /***/ }),

  /***/ './node_modules/css-loader/dist/cjs.js!./src/style.css':
  /*! *************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \************************************************************ */
  /***/ ((module, __webpack_exports__, __webpack_require__) => {
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => (__WEBPACK_DEFAULT_EXPORT__),
      /* harmony export */ });
    /* harmony import */ const _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ './node_modules/css-loader/dist/runtime/sourceMaps.js');
    /* harmony import */ const _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__ */__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ const _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ './node_modules/css-loader/dist/runtime/api.js');
    /* harmony import */ const _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /* #__PURE__ */__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */ const _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ './node_modules/css-loader/dist/runtime/getUrl.js');
    /* harmony import */ const _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /* #__PURE__ */__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
    // Imports

    const ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./icon-enter.png */ './src/icon-enter.png'), __webpack_require__.b);
    const ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
    const ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
    // Module
    ___CSS_LOADER_EXPORT___.push([module.id, `* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  list-style-type: none;\r\n  text-decoration: none;\r\n  font-family: 'Open Sans', 'Lucida Grande', tahoma, verdana, arial, sans-serif;\r\n  font-size: 1rem;\r\n  font-weight: 200;\r\n}\r\n\r\nmain {\r\n  position: relative;\r\n  height: 100vh;\r\n}\r\n\r\nform {\r\n  cursor: auto;\r\n}\r\n\r\n.changes-count {\r\n  background: red;\r\n  cursor: pointer;\r\n  color: white;\r\n  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);\r\n  border-radius: 7px;\r\n  font-size: 9px;\r\n  min-width: 14px;\r\n  padding: 0 3px;\r\n  font-weight: 600;\r\n  text-align: center;\r\n  box-shadow: 0 0 0 2px white;\r\n}\r\n\r\n#new-item {\r\n  width: 100%;\r\n  padding: 0 2.5rem 0 1rem;\r\n  font-style: italic;\r\n  vertical-align: middle;\r\n  border: none;\r\n  outline: none;\r\n  overflow: hidden;\r\n  resize: none;\r\n  display: inline-block;\r\n}\r\n\r\n#submit-new-item {\r\n  border: none;\r\n  outline: none;\r\n  display: inline-block;\r\n  appearance: none;\r\n  background-color: transparent;\r\n  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n  width: 2.5rem;\r\n  height: 2.6rem;\r\n  cursor: pointer;\r\n}\r\n\r\n#list-cont {\r\n  width: 100%;\r\n  max-width: 31.25rem;\r\n  box-sizing: border-box;\r\n  border-radius: 0.25rem;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\r\n  background: #f1f2f5;\r\n}\r\n\r\n.center {\r\n  margin: 0;\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  -ms-transform: translate(-50%, -50%);\r\n  transform: translate(-50%, -50%);\r\n}\r\n\r\nform,\r\n.list-header,\r\n.todo {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  gap: 1rem;\r\n  padding: 0 1rem;\r\n  background-color: #fff;\r\n  border-bottom: 1px solid rgba(0, 0, 0, 0.08);\r\n  min-height: 2.5rem;\r\n}\r\n\r\n.todo {\r\n  cursor: move;\r\n}\r\n\r\n.list-stats {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n}\r\n\r\n.todo-label {\r\n  width: 85%;\r\n  line-height: 1.25rem;\r\n  word-wrap: break-word;\r\n  background: transparent;\r\n  border: none;\r\n  outline: none;\r\n}\r\n\r\n.icon-trash,\r\n.icon-arrows-ccw,\r\n.icon-check,\r\n.icon-more-vert {\r\n  color: gray;\r\n  display: block;\r\n  height: 1rem;\r\n  width: 1rem;\r\n  object-fit: contain;\r\n}\r\n\r\n.icon-trash {\r\n  height: 1.5rem;\r\n  width: 1.5rem;\r\n}\r\n\r\n.icon-check {\r\n  cursor: pointer;\r\n  border: 2px solid gray;\r\n  border-radius: 2px;\r\n}\r\n\r\n.clear-all-btn {\r\n  display: block;\r\n  opacity: 0.5;\r\n  margin: 1rem auto;\r\n  border: 0;\r\n  outline: none;\r\n  background-color: transparent;\r\n}\r\n\r\n.edit-task {\r\n  background: lightgoldenrodyellow;\r\n}\r\n\r\n.task-completed {\r\n  filter: invert(49%) sepia(60%) saturate(2240%) hue-rotate(189deg) brightness(91%) contrast(98%);\r\n  border: none;\r\n}\r\n\r\n.completed {\r\n  text-decoration: line-through;\r\n  color: #9d9ea0;\r\n}\r\n\r\n.hidden {\r\n  display: none;\r\n}\r\n`, '', {
      version: 3, sources: ['webpack://./src/style.css'], names: [], mappings: 'AAAA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,qBAAqB;EACrB,qBAAqB;EACrB,6EAA6E;EAC7E,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,aAAa;AACf;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,eAAe;EACf,eAAe;EACf,YAAY;EACZ,yCAAyC;EACzC,kBAAkB;EAClB,cAAc;EACd,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,kBAAkB;EAClB,2BAA2B;AAC7B;;AAEA;EACE,WAAW;EACX,wBAAwB;EACxB,kBAAkB;EAClB,sBAAsB;EACtB,YAAY;EACZ,aAAa;EACb,gBAAgB;EAChB,YAAY;EACZ,qBAAqB;AACvB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,qBAAqB;EACrB,gBAAgB;EAChB,6BAA6B;EAC7B,yDAAuC;EACvC,4BAA4B;EAC5B,2BAA2B;EAC3B,aAAa;EACb,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,mBAAmB;EACnB,sBAAsB;EACtB,sBAAsB;EACtB,yCAAyC;EACzC,mBAAmB;AACrB;;AAEA;EACE,SAAS;EACT,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,oCAAoC;EACpC,gCAAgC;AAClC;;AAEA;;;EAGE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,SAAS;EACT,eAAe;EACf,sBAAsB;EACtB,4CAA4C;EAC5C,kBAAkB;AACpB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,UAAU;EACV,oBAAoB;EACpB,qBAAqB;EACrB,uBAAuB;EACvB,YAAY;EACZ,aAAa;AACf;;AAEA;;;;EAIE,WAAW;EACX,cAAc;EACd,YAAY;EACZ,WAAW;EACX,mBAAmB;AACrB;;AAEA;EACE,cAAc;EACd,aAAa;AACf;;AAEA;EACE,eAAe;EACf,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,cAAc;EACd,YAAY;EACZ,iBAAiB;EACjB,SAAS;EACT,aAAa;EACb,6BAA6B;AAC/B;;AAEA;EACE,gCAAgC;AAClC;;AAEA;EACE,+FAA+F;EAC/F,YAAY;AACd;;AAEA;EACE,6BAA6B;EAC7B,cAAc;AAChB;;AAEA;EACE,aAAa;AACf', sourcesContent: ["* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  list-style-type: none;\r\n  text-decoration: none;\r\n  font-family: 'Open Sans', 'Lucida Grande', tahoma, verdana, arial, sans-serif;\r\n  font-size: 1rem;\r\n  font-weight: 200;\r\n}\r\n\r\nmain {\r\n  position: relative;\r\n  height: 100vh;\r\n}\r\n\r\nform {\r\n  cursor: auto;\r\n}\r\n\r\n.changes-count {\r\n  background: red;\r\n  cursor: pointer;\r\n  color: white;\r\n  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);\r\n  border-radius: 7px;\r\n  font-size: 9px;\r\n  min-width: 14px;\r\n  padding: 0 3px;\r\n  font-weight: 600;\r\n  text-align: center;\r\n  box-shadow: 0 0 0 2px white;\r\n}\r\n\r\n#new-item {\r\n  width: 100%;\r\n  padding: 0 2.5rem 0 1rem;\r\n  font-style: italic;\r\n  vertical-align: middle;\r\n  border: none;\r\n  outline: none;\r\n  overflow: hidden;\r\n  resize: none;\r\n  display: inline-block;\r\n}\r\n\r\n#submit-new-item {\r\n  border: none;\r\n  outline: none;\r\n  display: inline-block;\r\n  appearance: none;\r\n  background-color: transparent;\r\n  background-image: url(./icon-enter.png);\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n  width: 2.5rem;\r\n  height: 2.6rem;\r\n  cursor: pointer;\r\n}\r\n\r\n#list-cont {\r\n  width: 100%;\r\n  max-width: 31.25rem;\r\n  box-sizing: border-box;\r\n  border-radius: 0.25rem;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\r\n  background: #f1f2f5;\r\n}\r\n\r\n.center {\r\n  margin: 0;\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  -ms-transform: translate(-50%, -50%);\r\n  transform: translate(-50%, -50%);\r\n}\r\n\r\nform,\r\n.list-header,\r\n.todo {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  gap: 1rem;\r\n  padding: 0 1rem;\r\n  background-color: #fff;\r\n  border-bottom: 1px solid rgba(0, 0, 0, 0.08);\r\n  min-height: 2.5rem;\r\n}\r\n\r\n.todo {\r\n  cursor: move;\r\n}\r\n\r\n.list-stats {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n}\r\n\r\n.todo-label {\r\n  width: 85%;\r\n  line-height: 1.25rem;\r\n  word-wrap: break-word;\r\n  background: transparent;\r\n  border: none;\r\n  outline: none;\r\n}\r\n\r\n.icon-trash,\r\n.icon-arrows-ccw,\r\n.icon-check,\r\n.icon-more-vert {\r\n  color: gray;\r\n  display: block;\r\n  height: 1rem;\r\n  width: 1rem;\r\n  object-fit: contain;\r\n}\r\n\r\n.icon-trash {\r\n  height: 1.5rem;\r\n  width: 1.5rem;\r\n}\r\n\r\n.icon-check {\r\n  cursor: pointer;\r\n  border: 2px solid gray;\r\n  border-radius: 2px;\r\n}\r\n\r\n.clear-all-btn {\r\n  display: block;\r\n  opacity: 0.5;\r\n  margin: 1rem auto;\r\n  border: 0;\r\n  outline: none;\r\n  background-color: transparent;\r\n}\r\n\r\n.edit-task {\r\n  background: lightgoldenrodyellow;\r\n}\r\n\r\n.task-completed {\r\n  filter: invert(49%) sepia(60%) saturate(2240%) hue-rotate(189deg) brightness(91%) contrast(98%);\r\n  border: none;\r\n}\r\n\r\n.completed {\r\n  text-decoration: line-through;\r\n  color: #9d9ea0;\r\n}\r\n\r\n.hidden {\r\n  display: none;\r\n}\r\n"], sourceRoot: '',
    }]);
    // Exports
    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);
    /***/ }),

  /***/ './node_modules/css-loader/dist/runtime/api.js':
  /*! *****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \**************************************************** */
  /***/ ((module) => {
    /*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
    module.exports = function (cssWithMappingToString) {
      const list = [];

      // return the list of modules as css string
      list.toString = function toString() {
        return this.map((item) => {
          let content = '';
          const needLayer = typeof item[5] !== 'undefined';
          if (item[4]) {
            content += '@supports ('.concat(item[4], ') {');
          }
          if (item[2]) {
            content += '@media '.concat(item[2], ' {');
          }
          if (needLayer) {
            content += '@layer'.concat(item[5].length > 0 ? ' '.concat(item[5]) : '', ' {');
          }
          content += cssWithMappingToString(item);
          if (needLayer) {
            content += '}';
          }
          if (item[2]) {
            content += '}';
          }
          if (item[4]) {
            content += '}';
          }
          return content;
        }).join('');
      };

      // import a list of modules into the list
      list.i = function i(modules, media, dedupe, supports, layer) {
        if (typeof modules === 'string') {
          modules = [[null, modules, undefined]];
        }
        const alreadyImportedModules = {};
        if (dedupe) {
          for (let k = 0; k < this.length; k++) {
            const id = this[k][0];
            if (id != null) {
              alreadyImportedModules[id] = true;
            }
          }
        }
        for (let _k = 0; _k < modules.length; _k++) {
          const item = [].concat(modules[_k]);
          if (dedupe && alreadyImportedModules[item[0]]) {
            continue;
          }
          if (typeof layer !== 'undefined') {
            if (typeof item[5] === 'undefined') {
              item[5] = layer;
            } else {
              item[1] = '@layer'.concat(item[5].length > 0 ? ' '.concat(item[5]) : '', ' {').concat(item[1], '}');
              item[5] = layer;
            }
          }
          if (media) {
            if (!item[2]) {
              item[2] = media;
            } else {
              item[1] = '@media '.concat(item[2], ' {').concat(item[1], '}');
              item[2] = media;
            }
          }
          if (supports) {
            if (!item[4]) {
              item[4] = ''.concat(supports);
            } else {
              item[1] = '@supports ('.concat(item[4], ') {').concat(item[1], '}');
              item[4] = supports;
            }
          }
          list.push(item);
        }
      };
      return list;
    };
    /***/ }),

  /***/ './node_modules/css-loader/dist/runtime/getUrl.js':
  /*! ********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \******************************************************* */
  /***/ ((module) => {
    module.exports = function (url, options) {
      if (!options) {
        options = {};
      }
      if (!url) {
        return url;
      }
      url = String(url.__esModule ? url.default : url);

      // If url is already wrapped in quotes, remove them
      if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
      }
      if (options.hash) {
        url += options.hash;
      }

      // Should url be wrapped?
      // See https://drafts.csswg.org/css-values-3/#urls
      if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
        return '"'.concat(url.replace(/"/g, '\\"').replace(/\n/g, '\\n'), '"');
      }
      return url;
    };
    /***/ }),

  /***/ './node_modules/css-loader/dist/runtime/sourceMaps.js':
  /*! ************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \*********************************************************** */
  /***/ ((module) => {
    module.exports = function (item) {
      const content = item[1];
      const cssMapping = item[3];
      if (!cssMapping) {
        return content;
      }
      if (typeof btoa === 'function') {
        const base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
        const data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,'.concat(base64);
        const sourceMapping = '/*# '.concat(data, ' */');
        const sourceURLs = cssMapping.sources.map((source) => '/*# sourceURL='.concat(cssMapping.sourceRoot || '').concat(source, ' */'));
        return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
      }
      return [content].join('\n');
    };
    /***/ }),

  /***/ './src/style.css':
  /*! ***********************!*\
  !*** ./src/style.css ***!
  \********************** */
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => (__WEBPACK_DEFAULT_EXPORT__),
      /* harmony export */ });
    /* harmony import */ const _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ './node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js');
    /* harmony import */ const _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__ */__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ const _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ './node_modules/style-loader/dist/runtime/styleDomAPI.js');
    /* harmony import */ const _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /* #__PURE__ */__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */ const _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ './node_modules/style-loader/dist/runtime/insertBySelector.js');
    /* harmony import */ const _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /* #__PURE__ */__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
    /* harmony import */ const _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ './node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js');
    /* harmony import */ const _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /* #__PURE__ */__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
    /* harmony import */ const _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ './node_modules/style-loader/dist/runtime/insertStyleElement.js');
    /* harmony import */ const _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /* #__PURE__ */__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
    /* harmony import */ const _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ './node_modules/style-loader/dist/runtime/styleTagTransform.js');
    /* harmony import */ const _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /* #__PURE__ */__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
    /* harmony import */ const _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ './node_modules/css-loader/dist/cjs.js!./src/style.css');

    const options = {};

    options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
    options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

    options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, 'head');

    options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
    options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

    const update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__.default, options);

    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__.default && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__.default.locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__.default.locals : undefined);
    /***/ }),

  /***/ './node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js':
  /*! ****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*************************************************************************** */
  /***/ ((module) => {
    const stylesInDOM = [];

    function getIndexByIdentifier(identifier) {
      let result = -1;

      for (let i = 0; i < stylesInDOM.length; i++) {
        if (stylesInDOM[i].identifier === identifier) {
          result = i;
          break;
        }
      }

      return result;
    }

    function modulesToDom(list, options) {
      const idCountMap = {};
      const identifiers = [];

      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const id = options.base ? item[0] + options.base : item[0];
        const count = idCountMap[id] || 0;
        const identifier = ''.concat(id, ' ').concat(count);
        idCountMap[id] = count + 1;
        const indexByIdentifier = getIndexByIdentifier(identifier);
        const obj = {
          css: item[1],
          media: item[2],
          sourceMap: item[3],
          supports: item[4],
          layer: item[5],
        };

        if (indexByIdentifier !== -1) {
          stylesInDOM[indexByIdentifier].references++;
          stylesInDOM[indexByIdentifier].updater(obj);
        } else {
          const updater = addElementStyle(obj, options);
          options.byIndex = i;
          stylesInDOM.splice(i, 0, {
            identifier,
            updater,
            references: 1,
          });
        }

        identifiers.push(identifier);
      }

      return identifiers;
    }

    function addElementStyle(obj, options) {
      const api = options.domAPI(options);
      api.update(obj);

      const updater = function updater(newObj) {
        if (newObj) {
          if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
            return;
          }

          api.update(obj = newObj);
        } else {
          api.remove();
        }
      };

      return updater;
    }

    module.exports = function (list, options) {
      options = options || {};
      list = list || [];
      let lastIdentifiers = modulesToDom(list, options);
      return function update(newList) {
        newList = newList || [];

        for (let i = 0; i < lastIdentifiers.length; i++) {
          const identifier = lastIdentifiers[i];
          const index = getIndexByIdentifier(identifier);
          stylesInDOM[index].references--;
        }

        const newLastIdentifiers = modulesToDom(newList, options);

        for (let _i = 0; _i < lastIdentifiers.length; _i++) {
          const _identifier = lastIdentifiers[_i];

          const _index = getIndexByIdentifier(_identifier);

          if (stylesInDOM[_index].references === 0) {
            stylesInDOM[_index].updater();

            stylesInDOM.splice(_index, 1);
          }
        }

        lastIdentifiers = newLastIdentifiers;
      };
    };
    /***/ }),

  /***/ './node_modules/style-loader/dist/runtime/insertBySelector.js':
  /*! ********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \******************************************************************* */
  /***/ ((module) => {
    const memo = {};
    /* istanbul ignore next  */

    function getTarget(target) {
      if (typeof memo[target] === 'undefined') {
        let styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

        if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
          try {
            // This will throw an exception if access to iframe is blocked
            // due to cross-origin restrictions
            styleTarget = styleTarget.contentDocument.head;
          } catch (e) {
            // istanbul ignore next
            styleTarget = null;
          }
        }

        memo[target] = styleTarget;
      }

      return memo[target];
    }
    /* istanbul ignore next  */

    function insertBySelector(insert, style) {
      const target = getTarget(insert);

      if (!target) {
        throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
      }

      target.appendChild(style);
    }

    module.exports = insertBySelector;
    /***/ }),

  /***/ './node_modules/style-loader/dist/runtime/insertStyleElement.js':
  /*! **********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \********************************************************************* */
  /***/ ((module) => {
    /* istanbul ignore next  */
    function insertStyleElement(options) {
      const element = document.createElement('style');
      options.setAttributes(element, options.attributes);
      options.insert(element, options.options);
      return element;
    }

    module.exports = insertStyleElement;
    /***/ }),

  /***/ './node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js':
  /*! **********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \********************************************************************************* */
  /***/ ((module, __unused_webpack_exports, __webpack_require__) => {
    /* istanbul ignore next  */
    function setAttributesWithoutAttributes(styleElement) {
      const nonce = true ? __webpack_require__.nc : 0;

      if (nonce) {
        styleElement.setAttribute('nonce', nonce);
      }
    }

    module.exports = setAttributesWithoutAttributes;
    /***/ }),

  /***/ './node_modules/style-loader/dist/runtime/styleDomAPI.js':
  /*! ***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \************************************************************** */
  /***/ ((module) => {
    /* istanbul ignore next  */
    function apply(styleElement, options, obj) {
      let css = '';

      if (obj.supports) {
        css += '@supports ('.concat(obj.supports, ') {');
      }

      if (obj.media) {
        css += '@media '.concat(obj.media, ' {');
      }

      const needLayer = typeof obj.layer !== 'undefined';

      if (needLayer) {
        css += '@layer'.concat(obj.layer.length > 0 ? ' '.concat(obj.layer) : '', ' {');
      }

      css += obj.css;

      if (needLayer) {
        css += '}';
      }

      if (obj.media) {
        css += '}';
      }

      if (obj.supports) {
        css += '}';
      }

      const { sourceMap } = obj;

      if (sourceMap && typeof btoa !== 'undefined') {
        css += '\n/*# sourceMappingURL=data:application/json;base64,'.concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), ' */');
      } // For old IE

      /* istanbul ignore if  */

      options.styleTagTransform(css, styleElement, options.options);
    }

    function removeStyleElement(styleElement) {
      // istanbul ignore if
      if (styleElement.parentNode === null) {
        return false;
      }

      styleElement.parentNode.removeChild(styleElement);
    }
    /* istanbul ignore next  */

    function domAPI(options) {
      const styleElement = options.insertStyleElement(options);
      return {
        update: function update(obj) {
          apply(styleElement, options, obj);
        },
        remove: function remove() {
          removeStyleElement(styleElement);
        },
      };
    }

    module.exports = domAPI;
    /***/ }),

  /***/ './node_modules/style-loader/dist/runtime/styleTagTransform.js':
  /*! *********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \******************************************************************** */
  /***/ ((module) => {
    /* istanbul ignore next  */
    function styleTagTransform(css, styleElement) {
      if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = css;
      } else {
        while (styleElement.firstChild) {
          styleElement.removeChild(styleElement.firstChild);
        }

        styleElement.appendChild(document.createTextNode(css));
      }
    }

    module.exports = styleTagTransform;
    /***/ }),

  /***/ './src/index.js':
  /*! **********************!*\
  !*** ./src/index.js ***!
  \********************* */
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ const _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ './src/style.css');
    /* harmony import */ const _modules_ContainerPresenter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/ContainerPresenter.js */ './modules/ContainerPresenter.js');

    document.addEventListener('DOMContentLoaded', () => {
      const main = document.getElementById('main-cont');
      const container = new _modules_ContainerPresenter_js__WEBPACK_IMPORTED_MODULE_1__.default(main);
    });
    /***/ }),

  /***/ './src/icon-arrows-ccw.svg':
  /*! *********************************!*\
  !*** ./src/icon-arrows-ccw.svg ***!
  \******************************** */
  /***/ ((module, __unused_webpack_exports, __webpack_require__) => {
    module.exports = `${__webpack_require__.p}8900882c8ca68499364a.svg`;
    /***/ }),

  /***/ './src/icon-check.svg':
  /*! ****************************!*\
  !*** ./src/icon-check.svg ***!
  \*************************** */
  /***/ ((module, __unused_webpack_exports, __webpack_require__) => {
    module.exports = `${__webpack_require__.p}df10fc08c2ebb37202c1.svg`;
    /***/ }),

  /***/ './src/icon-enter.png':
  /*! ****************************!*\
  !*** ./src/icon-enter.png ***!
  \*************************** */
  /***/ ((module, __unused_webpack_exports, __webpack_require__) => {
    module.exports = `${__webpack_require__.p}fa544f635765db738d2e.png`;
    /***/ }),

  /***/ './src/icon-more-vert.svg':
  /*! ********************************!*\
  !*** ./src/icon-more-vert.svg ***!
  \******************************* */
  /***/ ((module, __unused_webpack_exports, __webpack_require__) => {
    module.exports = `${__webpack_require__.p}8fb336c73185f55c18aa.svg`;
    /***/ }),

  /***/ './src/icon-trash.svg':
  /*! ****************************!*\
  !*** ./src/icon-trash.svg ***!
  \*************************** */
  /***/ ((module, __unused_webpack_exports, __webpack_require__) => {
    module.exports = `${__webpack_require__.p}d5650a6ea67eecdadcfb.svg`;
    /***/ }),

},
/** *** */ (__webpack_require__) => { // webpackRuntimeModules
/** *** */ const __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId));
  /** *** */ const __webpack_exports__ = (__webpack_exec__('./src/index.js'));
/** *** */ },
]);
// # sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUNmcUI7QUFDNkM7QUFDbEU7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHNFQUFrQjtBQUMxQyxDQUFDO0FBQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbW9kdWxlcy9Db250YWluZXJQcmVzZW50ZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL21vZHVsZXMvVGFzay5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbW9kdWxlcy9UYXNrRm9ybVByZXNlbnRlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbW9kdWxlcy9UYXNrTGlzdEhlYWRlclByZXNlbnRlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbW9kdWxlcy9UYXNrTGlzdFByZXNlbnRlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbW9kdWxlcy9UYXNrUHJlc2VudGVyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9tb2R1bGVzL1Rhc2tSZXBvc2l0b3J5LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9tb2R1bGVzL1Rhc2tTdG9yYWdlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9tb2R1bGVzL1VzZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUYXNrRm9ybVByZXNlbnRlciBmcm9tICcuL1Rhc2tGb3JtUHJlc2VudGVyLmpzJztcclxuaW1wb3J0IFRhc2tMaXN0UHJlc2VudGVyIGZyb20gJy4vVGFza0xpc3RQcmVzZW50ZXIuanMnO1xyXG5pbXBvcnQgVGFza1JlcG9zaXRvcnkgZnJvbSAnLi9UYXNrUmVwb3NpdG9yeS5qcyc7XHJcbmltcG9ydCBUYXNrTGlzdEhlYWRlclByZXNlbnRlciBmcm9tICcuL1Rhc2tMaXN0SGVhZGVyUHJlc2VudGVyLmpzJztcclxuXHJcbmNsYXNzIENvbnRhaW5lclByZXNlbnRlciB7XHJcbiAgI3Rhc2tSZXBvc2l0b3J5O1xyXG4gIFxyXG4gICNwYXJlbnQ7XHJcblxyXG4gICNoZWFkZXI7XHJcblxyXG4gICNmb3JtO1xyXG5cclxuICAjdGFza0xpc3Q7XHJcbiAgXHJcbiAgI3ZpZXc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHBhcmVudCwgdGFza1JlcG9zaXRvcnkgPSBudWxsKSB7XHJcbiAgICB0aGlzLiNwYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICB0aGlzLiN0YXNrUmVwb3NpdG9yeSA9IHRhc2tSZXBvc2l0b3J5ID09PSBudWxsXHJcbiAgICAgID8gbmV3IFRhc2tSZXBvc2l0b3J5KClcclxuICAgICAgOiB0YXNrUmVwb3NpdG9yeTtcclxuICAgIHRoaXMuI3ZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XHJcbiAgICB0aGlzLiN2aWV3LnNldEF0dHJpYnV0ZSgnaWQnLCAnbGlzdC1jb250Jyk7XHJcbiAgICB0aGlzLiN2aWV3LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY2VudGVyJyk7XHJcbiAgICB0aGlzLiN2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ25ld1Rhc2snLCB0aGlzLiNuZXdUYXNrKTtcclxuICAgIHRoaXMuI3ZpZXcuYWRkRXZlbnRMaXN0ZW5lcigncmVtb3ZlQWxsQ29tcGxldGVkJywgdGhpcy4jcmVtb3ZlQWxsQ29tcGxldGVkKTtcclxuICAgIHRoaXMuI3ZpZXcuYWRkRXZlbnRMaXN0ZW5lcigncmVtb3ZlVGFzaycsIHRoaXMuI3JlbW92ZVRhc2spO1xyXG4gICAgdGhpcy4jdmlldy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2VTdGF0ZScsIHRoaXMuI2NoYW5nZVN0YXRlKTtcclxuICAgIHRoaXMuI2hlYWRlciA9IG5ldyBUYXNrTGlzdEhlYWRlclByZXNlbnRlcigpO1xyXG4gICAgdGhpcy4jaGVhZGVyLnNldENvbXBsZXRlZENvdW50KHRoaXMuI3Rhc2tSZXBvc2l0b3J5LmdldENvbXBsZXRlZENvdW50KCkpO1xyXG4gICAgdGhpcy4jdmlldy5hcHBlbmRDaGlsZCh0aGlzLiNoZWFkZXIuZ2V0VmlldygpKTtcclxuICAgIHRoaXMuI2Zvcm0gPSBuZXcgVGFza0Zvcm1QcmVzZW50ZXIoKTtcclxuICAgIHRoaXMuI3ZpZXcuYXBwZW5kQ2hpbGQodGhpcy4jZm9ybS5nZXRWaWV3KCkpO1xyXG4gICAgdGhpcy4jdGFza0xpc3QgPSBuZXcgVGFza0xpc3RQcmVzZW50ZXIodGhpcy4jdGFza1JlcG9zaXRvcnkpO1xyXG4gICAgdGhpcy4jdmlldy5hcHBlbmRDaGlsZCh0aGlzLiN0YXNrTGlzdC5nZXRWaWV3KCkpO1xyXG4gICAgdGhpcy4jcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuI3ZpZXcpO1xyXG4gIH1cclxuXHJcbiAgI2NoYW5nZVN0YXRlID0gKCkgPT4ge1xyXG4gICAgdGhpcy4jdGFza1JlcG9zaXRvcnkudXBkYXRlU3RvcmFnZSgpO1xyXG4gICAgdGhpcy4jaGVhZGVyLnNldENvbXBsZXRlZENvdW50KHRoaXMuI3Rhc2tSZXBvc2l0b3J5LmdldENvbXBsZXRlZENvdW50KCkpO1xyXG4gIH1cclxuXHJcbiAgI25ld1Rhc2sgPSAoZXZ0KSA9PiB7XHJcbiAgICBjb25zdCBuZXdUYXNrID0gdGhpcy4jdGFza1JlcG9zaXRvcnkuYWRkVGFzayhldnQuZGV0YWlsKTtcclxuICAgIHRoaXMuI3Rhc2tMaXN0LmFkZFRhc2tWaWV3KG5ld1Rhc2spO1xyXG4gIH1cclxuXHJcbiAgI3JlbW92ZVRhc2sgPSAoZXZ0KSA9PiB7XHJcbiAgICB0aGlzLiN0YXNrUmVwb3NpdG9yeS5yZW1vdmVUYXNrKGV2dC5kZXRhaWwpO1xyXG4gICAgdGhpcy4jaGVhZGVyLnNldENvbXBsZXRlZENvdW50KHRoaXMuI3Rhc2tSZXBvc2l0b3J5LmdldENvbXBsZXRlZENvdW50KCkpO1xyXG4gIH1cclxuXHJcbiAgI3JlbW92ZUFsbENvbXBsZXRlZCA9ICgpID0+e1xyXG4gICAgdGhpcy4jdGFza1JlcG9zaXRvcnkucmVtb3ZlQWxsQ29tcGxldGVkKCk7XHJcbiAgICB0aGlzLiNoZWFkZXIuc2V0Q29tcGxldGVkQ291bnQodGhpcy4jdGFza1JlcG9zaXRvcnkuZ2V0Q29tcGxldGVkQ291bnQoKSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IENvbnRhaW5lclByZXNlbnRlcjsiLCJjbGFzcyBUYXNrIHtcbiAgaW5kZXg7XG5cbiAgZGVzY3JpcHRpb247XG5cbiAgY29tcGxldGVkO1xuXG4gIGNvbnN0cnVjdG9yKGluZGV4LCBkZXNjcmlwdGlvbiwgY29tcGxldGVkID0gZmFsc2UpIHtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuY29tcGxldGVkID0gY29tcGxldGVkO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2s7IiwiY2xhc3MgVGFza0Zvcm1QcmVzZW50ZXIge1xyXG4gICNpbnB1dDtcclxuXHJcbiAgI3N1Ym1pdDtcclxuXHJcbiAgI3ZpZXc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy4jdmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcclxuICAgIHRoaXMuI2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIHRoaXMuI2lucHV0LnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCAnQWRkIHRvIHlvdXIgbGlzdC4uLicpO1xyXG4gICAgdGhpcy4jaW5wdXQuc2V0QXR0cmlidXRlKCdpZCcsICduZXctaXRlbScpO1xyXG4gICAgdGhpcy4jaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICAgIHRoaXMuI3ZpZXcuYXBwZW5kQ2hpbGQodGhpcy4jaW5wdXQpO1xyXG4gICAgdGhpcy4jc3VibWl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIHRoaXMuI3N1Ym1pdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ljb24tcmV0dXJuJyk7XHJcbiAgICB0aGlzLiNzdWJtaXQuc2V0QXR0cmlidXRlKCdpZCcsICdzdWJtaXQtbmV3LWl0ZW0nKTtcclxuICAgIHRoaXMuI3N1Ym1pdC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnc3VibWl0Jyk7XHJcbiAgICB0aGlzLiNzdWJtaXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsICcnKTtcclxuICAgIHRoaXMuI3N1Ym1pdC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ2NsaWNrIHRoaXMgb3IgcHJlc3MgZW50ZXIgdG8gc3VibWl0Jyk7XHJcbiAgICB0aGlzLiN2aWV3LmFwcGVuZENoaWxkKHRoaXMuI3N1Ym1pdCk7XHJcbiAgICB0aGlzLiN2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuI3N1Ym1pdFRhc2spO1xyXG4gIH1cclxuXHJcbiAgZ2V0VmlldyA9ICgpID0+IHRoaXMuI3ZpZXc7XHJcblxyXG4gIGNsZWFuRm9ybSA9ICgpID0+IHtcclxuICAgIHRoaXMuI2lucHV0LnZhbHVlID0gJyc7XHJcbiAgfVxyXG5cclxuICAjc3VibWl0VGFzayA9ICgpID0+IHtcclxuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgQ3VzdG9tRXZlbnQoJ25ld1Rhc2snLCB7XHJcbiAgICAgIGRldGFpbDogdGhpcy4jaW5wdXQudmFsdWUsXHJcbiAgICAgIGJ1YmJsZXM6IHRydWUsXHJcbiAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgIGNvbXBvc2VkOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLiN2aWV3LmRpc3BhdGNoRXZlbnQobmV3VGFzayk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFRhc2tGb3JtUHJlc2VudGVyOyIsImltcG9ydCBpY29uQXJyb3dzQ2N3IGZyb20gJy4uL3NyYy9pY29uLWFycm93cy1jY3cuc3ZnJztcclxuXHJcbmNsYXNzIFRhc2tMaXN0SGVhZGVyUHJlc2VudGVyIHtcclxuICAjY29tcGxldGVkQ291bnQ7XHJcbiAgXHJcbiAgI2xpc3RTdGF0cztcclxuICBcclxuICAjdmlldztcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLiN2aWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLiN2aWV3LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbGlzdC1oZWFkZXInKTtcclxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcclxuICAgIHRpdGxlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbGlzdC1oZWFkZXInKTtcclxuICAgIHRpdGxlLmlubmVyVGV4dCA9ICdEZW1vJztcclxuICAgIHRoaXMuI3ZpZXcuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgdGhpcy4jbGlzdFN0YXRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLiNsaXN0U3RhdHMuc2V0QXR0cmlidXRlKCdjbGFzcycsICdsaXN0LXN0YXRzJyk7XHJcbiAgICB0aGlzLiN2aWV3LmFwcGVuZENoaWxkKHRoaXMuI2xpc3RTdGF0cyk7XHJcbiAgICB0aGlzLiNjb21wbGV0ZWRDb3VudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIHRoaXMuI2NvbXBsZXRlZENvdW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY2hhbmdlcy1jb3VudCcpO1xyXG4gICAgdGhpcy4jbGlzdFN0YXRzLmFwcGVuZENoaWxkKHRoaXMuI2NvbXBsZXRlZENvdW50KTtcclxuICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIGljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdpY29uLWFycm93cy1jY3cnKTtcclxuICAgIGljb24uc2V0QXR0cmlidXRlKCdzcmMnLCBpY29uQXJyb3dzQ2N3KTtcclxuICAgIHRoaXMuI2xpc3RTdGF0cy5hcHBlbmRDaGlsZChpY29uKTtcclxuICB9XHJcblxyXG4gIGdldFZpZXcgPSAoKSA9PiB0aGlzLiN2aWV3O1xyXG5cclxuICBzZXRDb21wbGV0ZWRDb3VudCA9IChjb3VudCkgPT4ge1xyXG4gICAgdGhpcy4jY29tcGxldGVkQ291bnQuaW5uZXJUZXh0ID0gY291bnQ7XHJcbiAgICBpZiAoY291bnQgPT09IDApIHRoaXMuI2NvbXBsZXRlZENvdW50LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgZWxzZSB0aGlzLiNjb21wbGV0ZWRDb3VudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgVGFza0xpc3RIZWFkZXJQcmVzZW50ZXI7IiwiaW1wb3J0IFRhc2tQcmVzZW50ZXIgZnJvbSAnLi9UYXNrUHJlc2VudGVyLmpzJztcblxuY2xhc3MgVGFza0xpc3RQcmVzZW50ZXIge1xuICAjcHJlc2VudGVycztcblxuICAjdGFza0xpc3Q7XG5cbiAgI2NsZWFyQWxsQnRuO1xuXG4gICN2aWV3O1xuXG4gIGNvbnN0cnVjdG9yKHRhc2tSZXBvc2l0b3J5KSB7XG4gICAgdGhpcy4jcHJlc2VudGVycyA9IFtdO1xuXG4gICAgdGhpcy4jdmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuI3Rhc2tMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLiN0YXNrTGlzdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xpc3QnKTtcbiAgICBjb25zdCB0YXNrcyA9IHRhc2tSZXBvc2l0b3J5LmFsbFRhc2tzKCk7XG5cbiAgICBpZiAodGFza3MgIT09IG51bGwpIHtcbiAgICAgIHRhc2tzLmZvckVhY2goKHRhc2spID0+IHRoaXMuYWRkVGFza1ZpZXcodGFzaykpO1xuICAgIH1cblxuICAgIHRoaXMuI3ZpZXcuYXBwZW5kQ2hpbGQodGhpcy4jdGFza0xpc3QpO1xuICAgIHRoaXMuI2NsZWFyQWxsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgdGhpcy4jY2xlYXJBbGxCdG4uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgIHRoaXMuI2NsZWFyQWxsQnRuLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY2xlYXItYWxsLWJ0bicpO1xuICAgIHRoaXMuI2NsZWFyQWxsQnRuLmlubmVyVGV4dCA9ICdDbGVhciBhbGwgY29tcGxldGVkJztcbiAgICB0aGlzLiNjbGVhckFsbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucmVtb3ZlQWxsQ29tcGxldGVkKTtcbiAgICB0aGlzLiN2aWV3LmFwcGVuZENoaWxkKHRoaXMuI2NsZWFyQWxsQnRuKTtcbiAgfVxuXG4gIGdldFZpZXcgPSAoKSA9PiB0aGlzLiN2aWV3O1xuXG4gIGFkZFRhc2tWaWV3ID0gKHRhc2spID0+IHtcbiAgICBjb25zdCB0YXNrUHJlc2VudGVyID0gbmV3IFRhc2tQcmVzZW50ZXIodGFzayk7XG4gICAgdGhpcy4jcHJlc2VudGVycy5wdXNoKHRhc2tQcmVzZW50ZXIpO1xuICAgIHRoaXMuI3Rhc2tMaXN0LmFwcGVuZENoaWxkKHRhc2tQcmVzZW50ZXIuZ2V0VmlldygpKTtcbiAgfVxuXG4gIHJlbW92ZUFsbENvbXBsZXRlZCA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdBcnJheSA9IHRoaXMuI3ByZXNlbnRlcnMuZmlsdGVyKChwcmVzZW50ZXIpID0+IHtcbiAgICAgIGlmIChwcmVzZW50ZXIuZ2V0Q2hlY2tlZFN0YXRlKCkgPT09IHRydWUpIHtcbiAgICAgICAgcHJlc2VudGVyLmdldFZpZXcoKS5yZW1vdmUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcblxuICAgIHRoaXMuI3ByZXNlbnRlcnMgPSBuZXdBcnJheTtcbiAgICBjb25zdCByZW1vdmVBbGxDb21wbGV0ZWQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3JlbW92ZUFsbENvbXBsZXRlZCcsIHtcbiAgICAgIGRldGFpbDoge30sXG4gICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgIH0pO1xuICAgIHRoaXMuI3ZpZXcuZGlzcGF0Y2hFdmVudChyZW1vdmVBbGxDb21wbGV0ZWQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2tMaXN0UHJlc2VudGVyOyIsImltcG9ydCBpY29uTW9yZVZlcnQgZnJvbSAnLi4vc3JjL2ljb24tbW9yZS12ZXJ0LnN2Zyc7XG5pbXBvcnQgaWNvbkNoZWNrIGZyb20gJy4uL3NyYy9pY29uLWNoZWNrLnN2Zyc7XG5pbXBvcnQgaWNvblRyYXNoIGZyb20gJy4uL3NyYy9pY29uLXRyYXNoLnN2Zyc7XG5cbmNsYXNzIFRhc2tQcmVzZW50ZXIge1xuICAjdGFzaztcblxuICAjdmlldztcblxuICAjY2hlY2tJY29uO1xuXG4gICNsYWJlbDtcblxuICAjaW5wdXQ7XG5cbiAgI21vcmVJY29uO1xuXG4gIGNvbnN0cnVjdG9yKHRhc2spIHtcbiAgICB0aGlzLiN0YXNrID0gdGFzaztcbiAgICB0aGlzLiN2aWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICB0aGlzLiN2aWV3LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndG9kbycpO1xuICAgIHRoaXMuI3ZpZXcuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCB0cnVlKTtcblxuICAgIHRoaXMuI2NoZWNrSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIHRoaXMuI2NoZWNrSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlQ2hlY2tTdGF0ZSk7XG4gICAgdGhpcy4jbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHRoaXMuI2xhYmVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndG9kby1sYWJlbCcpO1xuICAgIHRoaXMuI2xhYmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5lZGl0U3RhdGUpO1xuICAgIHRoaXMuI2xhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgYHRhc2stJHt0aGlzLiN0YXNrLmluZGV4fWApO1xuICAgIHRoaXMuI2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0aGlzLiNpbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgYHRhc2stJHt0aGlzLiN0YXNrLmluZGV4fWApO1xuICAgIHRoaXMuI2lucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XG4gICAgdGhpcy4jaW5wdXQuc2V0QXR0cmlidXRlKCdjbGFzcycsICd0b2RvLWxhYmVsJyk7XG4gICAgdGhpcy4jbW9yZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgIHRoaXMuI3ZpZXcuYXBwZW5kQ2hpbGQodGhpcy4jY2hlY2tJY29uKTtcbiAgICB0aGlzLiN2aWV3LmFwcGVuZENoaWxkKHRoaXMuI2xhYmVsKTtcbiAgICB0aGlzLiN2aWV3LmFwcGVuZENoaWxkKHRoaXMuI2lucHV0KTtcbiAgICB0aGlzLiN2aWV3LmFwcGVuZENoaWxkKHRoaXMuI21vcmVJY29uKTtcbiAgICB0aGlzLnNob3dTdGF0ZSgpO1xuICB9XG5cbiAgZ2V0VmlldyA9ICgpID0+IHRoaXMuI3ZpZXc7XG5cbiAgZ2V0Q2hlY2tlZFN0YXRlID0gKCkgPT4gdGhpcy4jdGFzay5jb21wbGV0ZWQ7XG5cbiAgcmVtb3ZlRnJvbURvbSA9ICgpID0+IHtcbiAgICBjb25zdCByZW1vdmVUYXNrID0gbmV3IEN1c3RvbUV2ZW50KCdyZW1vdmVUYXNrJywge1xuICAgICAgZGV0YWlsOiB0aGlzLiN0YXNrLFxuICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICB9KTtcbiAgICB0aGlzLiN2aWV3LmRpc3BhdGNoRXZlbnQocmVtb3ZlVGFzayk7XG4gICAgdGhpcy4jdmlldy5yZW1vdmUoKTtcbiAgfVxuXG4gIHNob3dTdGF0ZSA9ICgpID0+IHtcbiAgICB0aGlzLiN2aWV3LmNsYXNzTGlzdC5yZW1vdmUoJ2VkaXQtdGFzaycpO1xuICAgIHRoaXMuI2lucHV0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIHRoaXMuI2xhYmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIHRoaXMuI2NoZWNrSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ljb24tY2hlY2snKTtcbiAgICB0aGlzLiNjaGVja0ljb24uc2V0QXR0cmlidXRlKCdzcmMnLCBpY29uQ2hlY2spO1xuICAgIHRoaXMuI3ZpZXcuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgaWYgKHRoaXMuI3Rhc2suY29tcGxldGVkKSB0aGlzLiNjaGVja0ljb24uY2xhc3NMaXN0LmFkZCgndGFzay1jb21wbGV0ZWQnKTtcbiAgICBlbHNlIHRoaXMuI2NoZWNrSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCd0YXNrLWNvbXBsZXRlZCcpO1xuXG4gICAgdGhpcy4jbGFiZWwuaW5uZXJUZXh0ID0gdGhpcy4jdGFzay5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLiNpbnB1dC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcblxuICAgIHRoaXMuI21vcmVJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaWNvbi1tb3JlLXZlcnQnKTtcbiAgICB0aGlzLiNtb3JlSWNvbi5zZXRBdHRyaWJ1dGUoJ3NyYycsIGljb25Nb3JlVmVydCk7XG4gIH1cblxuICBoaWRkZW5TdGF0ZSA9ICgpID0+IHtcbiAgICB0aGlzLiN2aWV3LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICB9XG5cbiAgZWRpdFN0YXRlID0gKCkgPT4ge1xuICAgIHRoaXMuI3ZpZXcuY2xhc3NMaXN0LmFkZCgnZWRpdC10YXNrJyk7XG4gICAgdGhpcy4jbGFiZWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgdGhpcy4jaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgdGhpcy4jaW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHRoaXMuI3Rhc2suZGVzY3JpcHRpb24pO1xuICAgIHRoaXMuI2lucHV0LmZvY3VzKCk7XG4gICAgdGhpcy4jaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpID0+IHtcbiAgICAgIHRoaXMuI3Rhc2suZGVzY3JpcHRpb24gPSB0aGlzLiNpbnB1dC52YWx1ZTtcbiAgICAgIHRoaXMuc2hvd1N0YXRlKCk7XG4gICAgfSk7XG4gICAgdGhpcy4jaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZXZ0KSA9PiB7XG4gICAgICBpZiAoZXZ0LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICB0aGlzLiN0YXNrLmRlc2NyaXB0aW9uID0gdGhpcy4jaW5wdXQudmFsdWU7XG4gICAgICAgIHRoaXMuc2hvd1N0YXRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy4jbW9yZUljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdpY29uLXRyYXNoJyk7XG4gICAgdGhpcy4jbW9yZUljb24uc2V0QXR0cmlidXRlKCdzcmMnLCBpY29uVHJhc2gpO1xuICAgIHRoaXMuI21vcmVJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5yZW1vdmVGcm9tRG9tKTtcbiAgfVxuXG4gIHRvZ2dsZUNoZWNrU3RhdGUgPSAoKSA9PiB7XG4gICAgdGhpcy4jdGFzay5jb21wbGV0ZWQgPSAhdGhpcy4jdGFzay5jb21wbGV0ZWQ7XG4gICAgdGhpcy4jY2hlY2tJY29uLmNsYXNzTGlzdC50b2dnbGUoJ3Rhc2stY29tcGxldGVkJyk7XG4gICAgdGhpcy4jbGFiZWwuY2xhc3NMaXN0LnRvZ2dsZSgnY29tcGxldGVkJyk7XG4gICAgY29uc3QgY2hhbmdlU3RhdGUgPSBuZXcgQ3VzdG9tRXZlbnQoJ2NoYW5nZVN0YXRlJywge1xuICAgICAgZGV0YWlsOiB7fSxcbiAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgY29tcG9zZWQ6IHRydWUsXG4gICAgfSk7XG4gICAgdGhpcy4jdmlldy5kaXNwYXRjaEV2ZW50KGNoYW5nZVN0YXRlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYXNrUHJlc2VudGVyOyIsImltcG9ydCBUYXNrIGZyb20gJy4vVGFzay5qcyc7XG5pbXBvcnQgVGFza1N0b3JhZ2UgZnJvbSAnLi9UYXNrU3RvcmFnZS5qcyc7XG5pbXBvcnQgVXNlciBmcm9tICcuL1VzZXIuanMnO1xuXG5jbGFzcyBUYXNrUmVwb3NpdG9yeSB7XG4gICN0YXNrcztcblxuICAjc3RvcmFnZTtcblxuICAjdXNlcjtcblxuICBjb25zdHJ1Y3Rvcih1c2VyID0gbnVsbCwgc3RvcmFnZU5hbWUgPSBudWxsKSB7XG4gICAgdGhpcy4jdXNlciA9IHVzZXIgPT09IG51bGxcbiAgICAgID8gbmV3IFVzZXIoJ0d1ZXNzJywgJ2d1ZXNzJylcbiAgICAgIDogdXNlcjtcbiAgICB0aGlzLiNzdG9yYWdlID0gc3RvcmFnZU5hbWUgPT09IG51bGxcbiAgICAgID8gbmV3IFRhc2tTdG9yYWdlKHRoaXMuI3VzZXIsICdkZWZhdWx0JylcbiAgICAgIDogbmV3IFRhc2tTdG9yYWdlKHRoaXMuI3VzZXIsIHN0b3JhZ2VOYW1lKTtcbiAgICB0aGlzLiN0YXNrcyA9IHRoaXMuI3N0b3JhZ2UubG9hZCgpO1xuICAgIHRoaXMuI3VzZXIgPSB1c2VyO1xuICB9XG5cbiAgdXBkYXRlU3RvcmFnZSA9ICgpID0+IHRoaXMuI3N0b3JhZ2Uuc2F2ZSh0aGlzLiN0YXNrcyk7XG5cbiAgYWRkVGFzayA9IChkZXNjcmlwdGlvbikgPT4ge1xuICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzayh0aGlzLiNuZXdJbmRleCgpLCBkZXNjcmlwdGlvbik7XG4gICAgdGhpcy4jdGFza3MucHVzaCh0YXNrKTtcbiAgICB0aGlzLiNzdG9yYWdlLnNhdmUodGhpcy4jdGFza3MpO1xuICAgIHJldHVybiB0YXNrO1xuICB9XG5cbiAgcmVtb3ZlVGFzayA9ICh0YXNrKSA9PiB7XG4gICAgY29uc3QgbmV3QXJyYXkgPSB0aGlzLiN0YXNrcy5maWx0ZXIoKGVsZW1lbnQpID0+IHRhc2sgIT09IGVsZW1lbnQpO1xuICAgIHRoaXMuI3Rhc2tzID0gbmV3QXJyYXk7XG4gICAgdGhpcy4jb3JkZXJJbmRleHMoKTtcbiAgICB0aGlzLiNzdG9yYWdlLnNhdmUodGhpcy4jdGFza3MpO1xuICB9XG5cbiAgYWxsVGFza3MgPSAoKSA9PiB0aGlzLiN0YXNrcztcblxuICBnZXRDb21wbGV0ZWRDb3VudCA9ICgpID0+IHRoaXMuI3Rhc2tzLmZpbHRlcigodGFzaykgPT4gdGFzay5jb21wbGV0ZWQgPT09IHRydWUpLmxlbmd0aDtcblxuICByZW1vdmVBbGxDb21wbGV0ZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3QXJyYXkgPSB0aGlzLiN0YXNrcy5maWx0ZXIoKGVsZW1lbnQpID0+IGVsZW1lbnQuY29tcGxldGVkICE9PSB0cnVlKTtcbiAgICB0aGlzLiN0YXNrcyA9IG5ld0FycmF5O1xuICAgIHRoaXMuI29yZGVySW5kZXhzKCk7XG4gICAgdGhpcy4jc3RvcmFnZS5zYXZlKHRoaXMuI3Rhc2tzKTtcbiAgfVxuXG4gICNvcmRlckluZGV4cyA9ICgpID0+IHtcbiAgICB0aGlzLiN0YXNrcy5zb3J0KChhLCBiKSA9PiBhLmluZGV4IC0gYi5pbmRleCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLiN0YXNrcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdGhpcy4jdGFza3NbaV0uaW5kZXggPSBpO1xuICAgIH1cbiAgfVxuXG4gICNuZXdJbmRleCA9ICgpID0+IHRoaXMuI3Rhc2tzLmxlbmd0aDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFza1JlcG9zaXRvcnk7IiwiY29uc3QgREVGQVVMVF9CT09LX1NUT1JBR0VfS0VZID0gJ3NoOWJuaUNVdVUnO1xuXG5jbGFzcyBUYXNrU3RvcmFnZSB7XG4gICNrZXk7XG5cbiAgY29uc3RydWN0b3IodXNlciwgc3RvcmFnZSkge1xuICAgIHRoaXMuI2tleSA9IGAke0RFRkFVTFRfQk9PS19TVE9SQUdFX0tFWX0tJHt1c2VyLmtleX0tJHtzdG9yYWdlfWA7XG4gIH1cblxuICBsb2FkID0gKCkgPT4ge1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLiNrZXkpID09PSBudWxsKSByZXR1cm4gW107XG4gICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy4ja2V5KSk7XG4gIH1cblxuICBzYXZlID0gKGJvb2tzKSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy4ja2V5LCBKU09OLnN0cmluZ2lmeShib29rcykpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2tTdG9yYWdlOyIsImNsYXNzIFVzZXIge1xuICBuYW1lO1xuXG4gIGtleTtcblxuICBjb25zdHJ1Y3RvcihuYW1lLCBrZXkpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMua2V5ID0ga2V5O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVzZXI7IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vaWNvbi1lbnRlci5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbiAgZm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnLCAnTHVjaWRhIEdyYW5kZScsIHRhaG9tYSwgdmVyZGFuYSwgYXJpYWwsIHNhbnMtc2VyaWY7XFxyXFxuICBmb250LXNpemU6IDFyZW07XFxyXFxuICBmb250LXdlaWdodDogMjAwO1xcclxcbn1cXHJcXG5cXHJcXG5tYWluIHtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIGhlaWdodDogMTAwdmg7XFxyXFxufVxcclxcblxcclxcbmZvcm0ge1xcclxcbiAgY3Vyc29yOiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4uY2hhbmdlcy1jb3VudCB7XFxyXFxuICBiYWNrZ3JvdW5kOiByZWQ7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBjb2xvcjogd2hpdGU7XFxyXFxuICB0ZXh0LXNoYWRvdzogMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDdweDtcXHJcXG4gIGZvbnQtc2l6ZTogOXB4O1xcclxcbiAgbWluLXdpZHRoOiAxNHB4O1xcclxcbiAgcGFkZGluZzogMCAzcHg7XFxyXFxuICBmb250LXdlaWdodDogNjAwO1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgYm94LXNoYWRvdzogMCAwIDAgMnB4IHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4jbmV3LWl0ZW0ge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBwYWRkaW5nOiAwIDIuNXJlbSAwIDFyZW07XFxyXFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxyXFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgb3V0bGluZTogbm9uZTtcXHJcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxyXFxuICByZXNpemU6IG5vbmU7XFxyXFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxufVxcclxcblxcclxcbiNzdWJtaXQtbmV3LWl0ZW0ge1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgb3V0bGluZTogbm9uZTtcXHJcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxyXFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcclxcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcclxcbiAgd2lkdGg6IDIuNXJlbTtcXHJcXG4gIGhlaWdodDogMi42cmVtO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4jbGlzdC1jb250IHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgbWF4LXdpZHRoOiAzMS4yNXJlbTtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBib3JkZXItcmFkaXVzOiAwLjI1cmVtO1xcclxcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XFxyXFxuICBiYWNrZ3JvdW5kOiAjZjFmMmY1O1xcclxcbn1cXHJcXG5cXHJcXG4uY2VudGVyIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIHRvcDogNTAlO1xcclxcbiAgbGVmdDogNTAlO1xcclxcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcclxcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxyXFxufVxcclxcblxcclxcbmZvcm0sXFxyXFxuLmxpc3QtaGVhZGVyLFxcclxcbi50b2RvIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgZ2FwOiAxcmVtO1xcclxcbiAgcGFkZGluZzogMCAxcmVtO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXHJcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMDgpO1xcclxcbiAgbWluLWhlaWdodDogMi41cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4udG9kbyB7XFxyXFxuICBjdXJzb3I6IG1vdmU7XFxyXFxufVxcclxcblxcclxcbi5saXN0LXN0YXRzIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGFiZWwge1xcclxcbiAgd2lkdGg6IDg1JTtcXHJcXG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xcclxcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xcclxcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxuICBvdXRsaW5lOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uaWNvbi10cmFzaCxcXHJcXG4uaWNvbi1hcnJvd3MtY2N3LFxcclxcbi5pY29uLWNoZWNrLFxcclxcbi5pY29uLW1vcmUtdmVydCB7XFxyXFxuICBjb2xvcjogZ3JheTtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgaGVpZ2h0OiAxcmVtO1xcclxcbiAgd2lkdGg6IDFyZW07XFxyXFxuICBvYmplY3QtZml0OiBjb250YWluO1xcclxcbn1cXHJcXG5cXHJcXG4uaWNvbi10cmFzaCB7XFxyXFxuICBoZWlnaHQ6IDEuNXJlbTtcXHJcXG4gIHdpZHRoOiAxLjVyZW07XFxyXFxufVxcclxcblxcclxcbi5pY29uLWNoZWNrIHtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyYXk7XFxyXFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxyXFxufVxcclxcblxcclxcbi5jbGVhci1hbGwtYnRuIHtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgb3BhY2l0eTogMC41O1xcclxcbiAgbWFyZ2luOiAxcmVtIGF1dG87XFxyXFxuICBib3JkZXI6IDA7XFxyXFxuICBvdXRsaW5lOiBub25lO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxyXFxufVxcclxcblxcclxcbi5lZGl0LXRhc2sge1xcclxcbiAgYmFja2dyb3VuZDogbGlnaHRnb2xkZW5yb2R5ZWxsb3c7XFxyXFxufVxcclxcblxcclxcbi50YXNrLWNvbXBsZXRlZCB7XFxyXFxuICBmaWx0ZXI6IGludmVydCg0OSUpIHNlcGlhKDYwJSkgc2F0dXJhdGUoMjI0MCUpIGh1ZS1yb3RhdGUoMTg5ZGVnKSBicmlnaHRuZXNzKDkxJSkgY29udHJhc3QoOTglKTtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbXBsZXRlZCB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcXHJcXG4gIGNvbG9yOiAjOWQ5ZWEwO1xcclxcbn1cXHJcXG5cXHJcXG4uaGlkZGVuIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxTQUFTO0VBQ1QsVUFBVTtFQUNWLHNCQUFzQjtFQUN0QixxQkFBcUI7RUFDckIscUJBQXFCO0VBQ3JCLDZFQUE2RTtFQUM3RSxlQUFlO0VBQ2YsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGVBQWU7RUFDZixlQUFlO0VBQ2YsWUFBWTtFQUNaLHlDQUF5QztFQUN6QyxrQkFBa0I7RUFDbEIsY0FBYztFQUNkLGVBQWU7RUFDZixjQUFjO0VBQ2QsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQiwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsd0JBQXdCO0VBQ3hCLGtCQUFrQjtFQUNsQixzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsWUFBWTtFQUNaLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IscUJBQXFCO0VBQ3JCLGdCQUFnQjtFQUNoQiw2QkFBNkI7RUFDN0IseURBQXVDO0VBQ3ZDLDRCQUE0QjtFQUM1QiwyQkFBMkI7RUFDM0IsYUFBYTtFQUNiLGNBQWM7RUFDZCxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsV0FBVztFQUNYLG1CQUFtQjtFQUNuQixzQkFBc0I7RUFDdEIsc0JBQXNCO0VBQ3RCLHlDQUF5QztFQUN6QyxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxTQUFTO0VBQ1Qsa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixTQUFTO0VBQ1Qsb0NBQW9DO0VBQ3BDLGdDQUFnQztBQUNsQzs7QUFFQTs7O0VBR0UsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixtQkFBbUI7RUFDbkIsU0FBUztFQUNULGVBQWU7RUFDZixzQkFBc0I7RUFDdEIsNENBQTRDO0VBQzVDLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsVUFBVTtFQUNWLG9CQUFvQjtFQUNwQixxQkFBcUI7RUFDckIsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixhQUFhO0FBQ2Y7O0FBRUE7Ozs7RUFJRSxXQUFXO0VBQ1gsY0FBYztFQUNkLFlBQVk7RUFDWixXQUFXO0VBQ1gsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsY0FBYztFQUNkLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGVBQWU7RUFDZixzQkFBc0I7RUFDdEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsY0FBYztFQUNkLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsU0FBUztFQUNULGFBQWE7RUFDYiw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxnQ0FBZ0M7QUFDbEM7O0FBRUE7RUFDRSwrRkFBK0Y7RUFDL0YsWUFBWTtBQUNkOztBQUVBO0VBQ0UsNkJBQTZCO0VBQzdCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxhQUFhO0FBQ2ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJywgJ0x1Y2lkYSBHcmFuZGUnLCB0YWhvbWEsIHZlcmRhbmEsIGFyaWFsLCBzYW5zLXNlcmlmO1xcclxcbiAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgZm9udC13ZWlnaHQ6IDIwMDtcXHJcXG59XFxyXFxuXFxyXFxubWFpbiB7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICBoZWlnaHQ6IDEwMHZoO1xcclxcbn1cXHJcXG5cXHJcXG5mb3JtIHtcXHJcXG4gIGN1cnNvcjogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLmNoYW5nZXMtY291bnQge1xcclxcbiAgYmFja2dyb3VuZDogcmVkO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgY29sb3I6IHdoaXRlO1xcclxcbiAgdGV4dC1zaGFkb3c6IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMSk7XFxyXFxuICBib3JkZXItcmFkaXVzOiA3cHg7XFxyXFxuICBmb250LXNpemU6IDlweDtcXHJcXG4gIG1pbi13aWR0aDogMTRweDtcXHJcXG4gIHBhZGRpbmc6IDAgM3B4O1xcclxcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGJveC1zaGFkb3c6IDAgMCAwIDJweCB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuI25ldy1pdGVtIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgcGFkZGluZzogMCAyLjVyZW0gMCAxcmVtO1xcclxcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIG91dGxpbmU6IG5vbmU7XFxyXFxuICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbiAgcmVzaXplOiBub25lO1xcclxcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4jc3VibWl0LW5ldy1pdGVtIHtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIG91dGxpbmU6IG5vbmU7XFxyXFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICBhcHBlYXJhbmNlOiBub25lO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxyXFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pY29uLWVudGVyLnBuZyk7XFxyXFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcclxcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcclxcbiAgd2lkdGg6IDIuNXJlbTtcXHJcXG4gIGhlaWdodDogMi42cmVtO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4jbGlzdC1jb250IHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgbWF4LXdpZHRoOiAzMS4yNXJlbTtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBib3JkZXItcmFkaXVzOiAwLjI1cmVtO1xcclxcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XFxyXFxuICBiYWNrZ3JvdW5kOiAjZjFmMmY1O1xcclxcbn1cXHJcXG5cXHJcXG4uY2VudGVyIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIHRvcDogNTAlO1xcclxcbiAgbGVmdDogNTAlO1xcclxcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcclxcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxyXFxufVxcclxcblxcclxcbmZvcm0sXFxyXFxuLmxpc3QtaGVhZGVyLFxcclxcbi50b2RvIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgZ2FwOiAxcmVtO1xcclxcbiAgcGFkZGluZzogMCAxcmVtO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXHJcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMDgpO1xcclxcbiAgbWluLWhlaWdodDogMi41cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4udG9kbyB7XFxyXFxuICBjdXJzb3I6IG1vdmU7XFxyXFxufVxcclxcblxcclxcbi5saXN0LXN0YXRzIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGFiZWwge1xcclxcbiAgd2lkdGg6IDg1JTtcXHJcXG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xcclxcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xcclxcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxuICBvdXRsaW5lOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uaWNvbi10cmFzaCxcXHJcXG4uaWNvbi1hcnJvd3MtY2N3LFxcclxcbi5pY29uLWNoZWNrLFxcclxcbi5pY29uLW1vcmUtdmVydCB7XFxyXFxuICBjb2xvcjogZ3JheTtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgaGVpZ2h0OiAxcmVtO1xcclxcbiAgd2lkdGg6IDFyZW07XFxyXFxuICBvYmplY3QtZml0OiBjb250YWluO1xcclxcbn1cXHJcXG5cXHJcXG4uaWNvbi10cmFzaCB7XFxyXFxuICBoZWlnaHQ6IDEuNXJlbTtcXHJcXG4gIHdpZHRoOiAxLjVyZW07XFxyXFxufVxcclxcblxcclxcbi5pY29uLWNoZWNrIHtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyYXk7XFxyXFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxyXFxufVxcclxcblxcclxcbi5jbGVhci1hbGwtYnRuIHtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgb3BhY2l0eTogMC41O1xcclxcbiAgbWFyZ2luOiAxcmVtIGF1dG87XFxyXFxuICBib3JkZXI6IDA7XFxyXFxuICBvdXRsaW5lOiBub25lO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxyXFxufVxcclxcblxcclxcbi5lZGl0LXRhc2sge1xcclxcbiAgYmFja2dyb3VuZDogbGlnaHRnb2xkZW5yb2R5ZWxsb3c7XFxyXFxufVxcclxcblxcclxcbi50YXNrLWNvbXBsZXRlZCB7XFxyXFxuICBmaWx0ZXI6IGludmVydCg0OSUpIHNlcGlhKDYwJSkgc2F0dXJhdGUoMjI0MCUpIGh1ZS1yb3RhdGUoMTg5ZGVnKSBicmlnaHRuZXNzKDkxJSkgY29udHJhc3QoOTglKTtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbXBsZXRlZCB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcXHJcXG4gIGNvbG9yOiAjOWQ5ZWEwO1xcclxcbn1cXHJcXG5cXHJcXG4uaGlkZGVuIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcclxuaW1wb3J0IENvbnRhaW5lclByZXNlbnRlciBmcm9tICcuLi9tb2R1bGVzL0NvbnRhaW5lclByZXNlbnRlci5qcyc7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbi1jb250Jyk7XHJcbiAgY29uc3QgY29udGFpbmVyID0gbmV3IENvbnRhaW5lclByZXNlbnRlcihtYWluKTtcclxufSk7XHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=