import fetchCountries from "./fetchCountries";
import refs from "./refs";
import template from './templates/template.hbs'
import { debounce } from "debounce";
import { alert, info, success, error } from '../node_modules/@pnotify/core/dist/PNotify.js';


import "@pnotify/core/dist/PNotify.css" 
import "@pnotify/desktop/dist/PNotifyDesktop" ;
import '@pnotify/core/dist/BrightTheme.css';

 
// const myError = error({
//   text: "I'm an error message."
// });



refs.input.addEventListener('input', debounce(onInputChange, 500))

function onInputChange() {
    refs.countriesList.innerHTML = "";
    const inputValue = refs.input.value
    if (inputValue) {
        fetchCountries(inputValue.trim()).then((data) => createMarkup(data))
        .catch((error)=> console.log('error'))
    }

}
function createMarkup(data) {
    const markup = template(data)
    if (data.status===404) {
        error({
      text: `No country has been found. Please enter a more specific query!`,
      styling: "brighttheme",
      delay: 1500,
    });
    return;
        
    }
    if (data && data.length >= 5) {
    error({
      title: `Too many matches found.`,
      text: `We found ${data.length} countries. Please enter a more specific query!`,
      styling: "brighttheme",
      delay: 1500,
    });
    return (refs.countriesList.innerHTML = `<li>${country.name}</li>`);
  }
  if (data.length <= 10) {
    refs.country-item.insertAdjacentHTML("beforeend", markup);
  }
  if (data.length > 10) {
    error({
      text: `Please enter a more specific query !`,
      styling: "brighttheme",
      delay: 1500,
    });
  }
  if (data.length === 1) {
    refs.countriesList.innerHTML = "";
    refs.countriesList.insertAdjacentHTML("beforeend", markup);
  }
}