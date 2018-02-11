import axios from "axios";

const API_URL = "https://u3284.green.elastictech.org";

function getRandomCity() {
  return axios.get(API_URL + "/city");
}

function checkCity(city) {
  return axios.get(API_URL + "/city/check/" + city);
}

function getRandomCityByLetter(letter) {
  return axios.get(API_URL + "/city/search/letter/" + letter);
}

export { getRandomCity, checkCity, getRandomCityByLetter };
