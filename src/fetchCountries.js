
const fetchCountries = function (countryName) {
    const DATA_URL = 'https://restcountries.eu/rest/v2/name/'
    let url = `${DATA_URL}${countryName}`
     return fetch(url)
       .then(res => res.json() )
      
    .catch(error => console.log('error'))
   ;
  
}
  
export default fetchCountries