import picsTemplate from './templates/template.hbs';
import picsFinder from './apiService';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

const apiKey = '23096925-d42719920a727f8342c46883c';
const mainApi = 'https://pixabay.com/api/';
let page = 1;

const refs = {
  input: document.querySelector('.input'),
  searchBtn: document.querySelector('.search__btn'),
  picsList: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  loadMore: document.querySelector('.load-more'),
  reset: document.querySelector('.reset__btn'),
};

function onInput(event) {
  event.preventDefault();
  const formInputValue = refs.input.value;
  if (formInputValue === '') {
    error({
      text: 'Please enter something!',
      delay: 2000,
    });
  } else {
    showBtn();
    scroll();
    picsFinder(formInputValue, mainApi, page, apiKey)
      .then(markupRender)
      .then(page++)
      .catch(error);
  }
}

function markupRender(array) {
  const markup = picsTemplate(array);

  refs.picsList.insertAdjacentHTML('beforeend', markup);
}

function err(res) {
  refs.picsList.innerHTML = ' ';
  refs.loadMore.classList.add('is-hidden');
}

function showBtn() {
  if (refs.picsList.length !== 0) {
    refs.loadMore.classList.remove('is-hidden');
    refs.picsList.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function onClickModalForBigImage(e) {
  const fullImageSrc = e.target.dataset.source;
  const instance = basicLightbox.create(`<img src="${fullImageSrc}">`);

  instance.show();
}

// const element = document.getElementById('.my-element-selector');
// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });

function scroll() {
  refs.loadMore.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

refs.form.addEventListener('submit', onInput);
refs.loadMore.addEventListener('click', onInput);
refs.reset.addEventListener('click', err);
refs.searchBtn.addEventListener('click', onInput);
refs.picsList.addEventListener('click', onClickModalForBigImage);
refs.searchBtn.addEventListener('click', scroll);
refs.loadMore.addEventListener('click', scroll);
