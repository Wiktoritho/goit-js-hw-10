let _ = require('lodash');

import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputCountry.addEventListener(
  'input',
  _.debounce(() => {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    if (inputCountry.value == '') {
      return;
    } else {
      fetchCountries(inputCountry.value.trim());

    }
  }, DEBOUNCE_DELAY)
);

const countryListEl = country => {
  countryList.insertAdjacentHTML(
    'beforeend',
    `
  <li class="country-list__element">
    <img src="${country.flags.svg}" alt="${country.flags.svg}"/>
    <p>${country.name.common}</p>
   </li>`
  );
};

const countryInfoDetails = country => {
  countryInfo.innerHTML = `
  <img src="${country.flags.svg}" alt="${country.flags.svg}"/>
  <h2>${country.name.common}</h2>
  <p><span class="bold">Capital:</span> ${country.capital}</p>
  <p><span class="bold">Population:</span> ${country.population}</p>
  <p><span class="bold">Languages:</span> ${Object.values(country.languages)}</>
  `;
};
