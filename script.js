let apiKey = "76408f461806bdd0e29fa34c52cb5991";

let currentDate = new Date();
console.log(currentDate);
//Start of function updateDateAndTime
function updateDateAndTime(currentDateAndTime) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentDay = days[currentDate.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let currentMonth = months[currentDate.getMonth()];

  let currentHour = currentDate.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = currentDate.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  let date = currentDate.getDate();

  let currentTime                  = `${currentHour}:${currentMinute}`;
      currentDateAndTime.innerHTML = `${currentDay} ${currentMonth} ${date}, ${currentTime}`;
}
//End of function updateDateAndTime

//Start of function updateCity
function updateCity(event) {
  event.preventDefault();
  let inputCity             = document.querySelector("#input-city");
  let displayCity           = document.querySelector("#select-city");
      displayCity.innerHTML = inputCity.value;
}
//End of function updateCity

//Start of function calculateFahrenheit
function calculateFahrenheit(event) {
  event.preventDefault();
  let theTemperature           = document.querySelector("#temperature-value");
  let checkTemperature         = theTemperature.innerHTML;
      theTemperature.innerHTML = Math.round((checkTemperature * 9) / 5 + 32);
}
//End of function calculateFahrenheit

function calculateCelcius(event) {
  event.preventDefault();
  let theTemperature           = document.querySelector("#temperature-value");
  let checkTemperature         = theTemperature.innerHTML;
      theTemperature.innerHTML = Math.round((checkTemperature - 32) * (5 / 9));
}

function showCurrentTemp(response) {
  //console.log(response.data.main.temp);
  let currentTemp = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#temperature-value");
  let description = response.data.weather[0].description;
  //console.log(description);
      displayTemp.innerHTML        = `${currentTemp}`;
  let weatherDescription           = document.querySelector("#weather-description");
      weatherDescription.innerHTML = description;
}

function getCityName(event) {
  event.preventDefault();
  let nameOfCity            = document.querySelector("#input-city");
  let displayCity           = document.querySelector("#select-city");
      displayCity.innerHTML = `${nameOfCity.value}`;
  let city                  = displayCity.innerHTML;
  let units                 = "metric";
  let apiUrl                = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  //axios.get(`${apiUrl}&appid=${apiKey}`).then(showCurrentTemp);
  console.log(axios.get(`${apiUrl}`).then(showCurrentTemp));
}

//Start of getCurrentLocationTemp
function getCurrentLocationTemp(position) {
  let latitude  = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units     = "metric";
  console.log(latitude, longitude, units);
  let geoApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(axios.get(`${geoApi}`).then(showCurrentTemp));
}
//End of getCurrentLocationTemp

//Start of getCurrentLocation
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocationTemp);
}
//End of getCurrentLocation

// let displayCity = document.querySelector("#select-city");
//   displayCity.innerHTML = inputCity.value;
//Feature 1: Update Date and Time
let currentDateAndTime = document.querySelector("#date-and-time");
updateDateAndTime(currentDateAndTime);

//Feature 2: Update City
let showFormCity = document.querySelector("#show-form-city");
showFormCity.addEventListener("submit", updateCity);

//Bonus- Feature 3: Update temperature based on unit
let linkToFahrenheit = document.querySelector("#link-to-fahrenheit");
linkToFahrenheit.addEventListener("click", calculateFahrenheit);

let linkToCelcius = document.querySelector("#link-to-celcius");
linkToCelcius.addEventListener("click", calculateCelcius);

let searchButton = document.querySelector("#show-form-city");
searchButton.addEventListener("submit", getCityName);

let locationButton = document.querySelector("#show-location");
locationButton.addEventListener("submit", getCurrentLocation);
//navigator.geolocation.getCurrentPosition(getCurrentLocation);
