import axios from "axios";

const API_URL = "http://cities-game-api.io";

function getRandomCity() {
  return axios.get(API_URL + "/public/city");
}

function checkCity(city) {
  return axios.get(API_URL + "/public/city/check/" + city);
}

function getRandomCityByLetter(letter) {
  return axios.get(API_URL + "/public/city/search/letter/" + letter);
}

export { getRandomCity, checkCity, getRandomCityByLetter };
