import picsTemplate from './templates/template.hbs'
import picsFinder from './apiService'
// import { objectTypeAnnotation } from 'babel-types'
import axios from "axios"

const apiKey = '23096925-d42719920a727f8342c46883c'
const mainApi = 'https://pixabay.com/api/'
let page = 1


const refs = {
  input: document.querySelector('.input'),
  searchBtn: document.querySelector('.search-form__btn'),
  picsList: document.querySelector('.gallery'),
  form: document.querySelector('.search-form')
}



function onInput(event) {
  event.preventDefault()
  const formInputValue = refs.input.value
  console.log(formInputValue);

  picsFinder(formInputValue, mainApi, page, apiKey)
  .then(markupRender)
  
  

}

function markupRender(array) {
  const markup = picsTemplate(array.map(item => item))
  refs.picsList.insertAdjacentHTML('beforeend', markup)
  
}

refs.form.addEventListener('submit', onInput)


console.log(refs.input.value);

