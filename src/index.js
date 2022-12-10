import './style.css';
import ContainerPresenter from '../modules/ContainerPresenter.js';

document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('main-cont');
  const container = new ContainerPresenter(main);
});

