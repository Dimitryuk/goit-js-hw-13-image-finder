import picsTemplate from './templates/template.hbs'
import picsFinder from './apiService'
import * as basicLightbox from 'basiclightbox';
import "basiclightbox/dist/basicLightbox.min.css"

const apiKey = '23096925-d42719920a727f8342c46883c'
const mainApi = 'https://pixabay.com/api/'
let page = 1


const refs = {
  input: document.querySelector('.input'),
  searchBtn: document.querySelector('.search__btn'),
  picsList: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  loadMore: document.querySelector('.load-more'),
  reset: document.querySelector('.reset__btn'),

}


function onInput(event) {
  event.preventDefault()
  const formInputValue = refs.input.value
  console.log(formInputValue);
showBtn()
  picsFinder(formInputValue, mainApi, page, apiKey)
    .then(markupRender)
    .then(page++)
    .catch(err)
 
}

function markupRender(array) {
  const markup = picsTemplate(array.map(item => item))
  refs.picsList.insertAdjacentHTML('beforeend', markup)
  
}
function err(res) {
  refs.picsList.innerHTML = ' '
  refs.loadMore.classList.add('is-hidden')
  
}

function showBtn() {
  if (refs.picsList.length!==0) {
    refs.loadMore.classList.remove('is-hidden')
  }
}


function onClickModalForBigImage(e) {
  const fullImageSrc = e.target.dataset.source;
  const instance = basicLightbox.create(`<img src="${fullImageSrc}">`);

  instance.show();
}


refs.form.addEventListener('submit', onInput)
refs.loadMore.addEventListener('click', onInput)
refs.reset.addEventListener('click', err)
refs.searchBtn.addEventListener('click', onInput)
refs.picsList.addEventListener('click', onClickModalForBigImage)

