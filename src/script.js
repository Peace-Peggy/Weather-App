//VANILLA JS
function formatDateTime(timestamp){
  //calculate the time and date. Then return a formated date and time
  let date    = new Date(timestamp);
  let hours   = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }

   if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days    = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`

}
function displayTemperature(response){
  let iconElement                  = document.querySelector("#icon");
  let getCityName                  = response.data.name;
  let getWeatherDescription        = response.data.weather[0].description;
  let getHumidity                  = response.data.main.humidity;
  let getWind                      = Math.round(response.data.wind.speed);
  let cityName                     = document.querySelector("#city");
      cityName.innerHTML           = getCityName;
  let temperature                  = document.querySelector("#temperature");
  let holdTempValue                = Math.round(response.data.main.temp);
      temperature.innerHTML        = holdTempValue;
  let weatherDescription           = document.querySelector("#weather-description");
      weatherDescription.innerHTML = getWeatherDescription;
  let humidity                     = document.querySelector("#humidity");
      humidity.innerHTML           = getHumidity;
  let wind                         = document.querySelector("#wind");
      wind.innerHTML               = getWind;
  let dateElement                  = document.querySelector("#date-time");
      dateElement.innerHTML        = formatDateTime(response.data.dt*1000);
  let getIconCode                  = response.data.weather[0].icon;
      iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${getIconCode}@2x.png`);
      iconElement.setAttribute("alt", `${getWeatherDescription}`)
}
function searchCity(city){
  let apiKey = "76408f461806bdd0e29fa34c52cb5991";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayTemperature);
}

function submitForm(event){
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);

}

searchCity("Winnipeg");
let weatherForm = document.querySelector("#search-city");
weatherForm.addEventListener("submit", submitForm);