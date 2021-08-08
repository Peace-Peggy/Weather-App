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
function formatForecastDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day  = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
  
}
function displayWeatherForecast(response){
  let forecast     = response.data.daily;
  let holdForecast = document.querySelector("#days-forecast");

  let getForecastHTML = `<div class="row">`;
  
  forecast.forEach(function(getForecastDay, index){
    if(index < 6){
    let icon    = getForecastDay.weather[0].icon;
    let maxTemp = Math.round(getForecastDay.temp.max);
    let minTemp = Math.round(getForecastDay.temp.min);
    
      getForecastHTML = 
      getForecastHTML + `
          <div class="col-2">
            <div class="forecast-day">
              ${formatForecastDay(getForecastDay.dt)}
            </div>
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" width="40" />
            <div class="forecast-temperature">
              <span ="forecast-in-max">${maxTemp}°</span>
              <span ="forecast-in-min">${minTemp}°</span>
            </div>
          </div>`;
          }
         });
      getForecastHTML        = getForecastHTML + `</div>`;
      holdForecast.innerHTML = getForecastHTML
      }

function getWeatherForecast(cordinates){
  let latitude    = cordinates.lat;
  let longitude   = cordinates.lon;
  let apiKey      = "76408f461806bdd0e29fa34c52cb5991";
  let forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(forecastURL).then(displayWeatherForecast);
}
function displayTemperature(response){
                                                                                                                celciusTemp                  = response.data.main.temp;
                                                                                                            let iconElement                  = document.querySelector("#icon");
                                                                                                            let getCityName                  = response.data.name;
                                                                                                            let getWeatherDescription        = response.data.weather[0].description;
                                                                                                            let getHumidity                  = response.data.main.humidity;
                                                                                                            let getWind                      = Math.round(response.data.wind.speed);
                                                                                                            let cityName                     = document.querySelector("#city");
                                                                                                                cityName.innerHTML           = getCityName;
                                                                                                            let temperature                  = document.querySelector("#temperature");
                                                                                                            let holdTempValue                = Math.round(celciusTemp);
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

  getWeatherForecast(response.data.coord);
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

function showFahrenheit(event) {
  event.preventDefault();
  let theTemperature = document.querySelector("#temperature");
  linkToCelcius.classList.remove("active");
  linkToFahrenheit.classList.add("active");
  let fahrenheitConversion     = (celciusTemp * 9) / 5 + 32;
      theTemperature.innerHTML = Math.round(fahrenheitConversion);
}
function showCelcius(event) {
  event.preventDefault();
  linkToCelcius.classList.add("active");
  linkToFahrenheit.classList.remove("active");
  let theTemperature           = document.querySelector("#temperature");
      theTemperature.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

searchCity("Winnipeg");
let weatherForm = document.querySelector("#search-city");
weatherForm.addEventListener("submit", submitForm);

let linkToFahrenheit = document.querySelector("#link-to-fahrenheit");
linkToFahrenheit.addEventListener("click", showFahrenheit);

let linkToCelcius = document.querySelector("#link-to-celcius");
linkToCelcius.addEventListener("click", showCelcius);
