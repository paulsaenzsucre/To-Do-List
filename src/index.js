import './style.css';
import iconMoreVert from './icon-more-vert.svg';
import iconCheck from './icon-check.svg';
import iconArrowsCcw from './icon-arrows-ccw.svg';

const tasks = [
  {
    index: 3,
    description: 'task 0000000000000',
    completed: false,
  },
  {
    index: 1,
    description: 'task 1',
    completed: true,
  },
  {
    index: 0,
    description: 'task 2',
    completed: false,
  },
  {
    index: 2,
    description: 'task 3',
    completed: false,
  },
];

function showTasks() {
  let element;
  let listItem;
  const listCont = document.getElementById('list-cont');

  listItem = document.createElement('div');
  listItem.setAttribute('class', 'list-header');
  element = document.createElement('h2');
  element.setAttribute('class', 'list-header');
  element.appendChild(document.createTextNode('Demo'));
  listItem.appendChild(element);
  listCont.appendChild(listItem);
  const div = document.createElement('div');
  div.setAttribute('class', 'list-stats');

  element = document.createElement('span');
  element.setAttribute('class', 'changes-count');
  const completed = tasks.filter((task) => task.completed === true).length;
  element.appendChild(document.createTextNode(`${completed}`));
  if (completed === 0) element.classList.add('hidden');
  else element.classList.remove('hidden');
  div.appendChild(element);

  element = document.createElement('img');
  element.setAttribute('class', 'icon-arrows-ccw');
  element.setAttribute('src', iconArrowsCcw);
  div.appendChild(element);

  listItem.appendChild(div);

  const form = document.createElement('form');
  element = document.createElement('input');
  element.setAttribute('placeholder', 'Add to your list...');
  element.setAttribute('id', 'new-item');
  element.setAttribute('type', 'text');
  form.appendChild(element);

  element = document.createElement('input');
  element.setAttribute('class', 'icon-return');
  element.setAttribute('id', 'submit-new-item');
  element.setAttribute('type', 'submit');
  element.setAttribute('value', '');
  element.setAttribute('title', 'click this or press enter to submit');
  form.appendChild(element);

  listCont.appendChild(form);

  const list = document.createElement('ul');
  list.setAttribute('class', 'list');
  tasks.sort((a, b) => a.index - b.index);
  tasks.forEach((task) => {
    listItem = document.createElement('li');
    listItem.setAttribute('class', 'todo');

    element = document.createElement('img');
    element.setAttribute('class', 'icon-check');
    element.setAttribute('src', iconCheck);
    if (task.completed) element.classList.add('task-completed');
    else element.classList.remove('task-completed');
    listItem.appendChild(element);

    element = document.createElement('label');
    element.setAttribute('class', 'todo-label');
    element.appendChild(document.createTextNode(task.description));
    listItem.appendChild(element);

    element = document.createElement('img');
    element.setAttribute('class', 'icon-more-vert');
    element.setAttribute('src', iconMoreVert);
    listItem.appendChild(element);

    list.appendChild(listItem);
  });

  listCont.appendChild(list);

  element = document.createElement('button');
  element.setAttribute('type', 'button');
  element.setAttribute('class', 'clear-all-btn');
  element.appendChild(document.createTextNode('Clear all completed'));
  listCont.appendChild(element);
}

showTasks();
