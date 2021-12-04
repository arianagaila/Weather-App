let h3 = document.querySelector("#date");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${hours}`;
}

h3.innerHTML = `${day} ${hours}:${minutes} </br>`;

function displayWeatherCondition(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#current-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "abe8133e2a18c1d21a8707cbc98dbdb8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "abe8133e2a18c1d21a8707cbc98dbdb8";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function celcius(event) {
  event.preventDefault();
  let link = document.querySelector("#current-temp");
  link.innerHTML = "17";
}

let followCelcius = document.querySelector("#celcius");
followCelcius.addEventListener("click", celcius);

function farenheit(event) {
  event.preventDefault();
  let link = document.querySelector("#current-temp");
  link.innerHTML = "66";
}

let followFarenheit = document.querySelector("#farenheit");
followFarenheit.addEventListener("click", farenheit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
