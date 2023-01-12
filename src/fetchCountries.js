import { Notify } from 'notiflix/build/notiflix-notify-aio';
const fetchCountries = name => {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(data.length);
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length <= 10 && data.length > 1) {
        data.forEach(country => {
          // Lists up to 10 countries that match entered value
          countryListEl(country);
        });
      } else {
        data.forEach(country => {
          // Creates html element for country with more detailed information
          countryInfoDetails(country);
        });
      }
    })
    .catch(() => Notify.failure('Oops, there is no country with that name'));
};

export { fetchCountries };