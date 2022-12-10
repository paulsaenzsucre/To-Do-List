import './style.css';
import ContainerPresenter from '../modules/ContainerPresenter.js';

document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('main-cont');
  (() => new ContainerPresenter(main))();
});
