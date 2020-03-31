// API Call: http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}

// Weather API call
class Weather {
  constructor(location = "des moines") {
    this.location = location;
  }

  async getWeatherByCity() {
    try {
      const key = "9a39d7565e7c934ffa41d972af68873d";
      const path = `https://api.openweathermap.org/data/2.5/weather?q=${this.location}&appid=${key}&units=imperial`;
      const response = await fetch(path, { mode: "cors" });
      const data = await response.json();

      const weatherData = {
        city: data.name,
        temperature: data.main.temp,
        low: data.main.temp_min,
        high: data.main.temp_max,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon
      };
      return weatherData;
    } catch {
      throw new Error("Error message here");
    }
  }
}

(() => {
  // HTML Elements
  const form = document.querySelector("#search");
  const inputLocation = document.querySelector("#searchBar");
  const icon = document.querySelector("#icon");
  const description = document.querySelector("#description");
  const date = document.querySelector("#date");
  const location = document.querySelector("#location");
  const currentTemp = document.querySelector("#currentTemp");
  const feelsLike = document.querySelector("#feelsLike");
  const tempLow = document.querySelector("#tempLow");
  const tempHigh = document.querySelector("#tempHigh");
  const humidity = document.querySelector("#humidity");
  const wind = document.querySelector("#wind");
  const body = document.getElementsByTagName("body");

  const setBackground = description => {
    if (description.includes("clouds")) {
      document.body.style.backgroundImage =
        "url('https://s7d2.scene7.com/is/image/TWCNews/1031_nc_partly_cloudy_3')";
    } else if (description.includes("clear")) {
      document.body.style.backgroundImage =
        "url('https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')";
    } else if (
      description.includes("rain") ||
      description.includes("drizzle")
    ) {
      document.body.style.backgroundImage =
        "url('https://s7d2.scene7.com/is/image/TWCNews/rain_drops_streaksstockphotopng')";
    } else if (description.includes("thunderstorm")) {
      document.body.style.backgroundImage =
        "url('https://www.geico.com/more/wp-content/uploads/geico-more-Thunderstorms-post-2016.jpg')";
    } else if (description.includes("snow")) {
      document.body.style.backgroundImage =
        "url('https://i5.walmartimages.com/asr/fdb24de6-2d04-40a9-91e5-22c64ec9fc35_1.fdd766da0795ec7429750b10fb1ffecc.jpeg')";
    } else return;
  };

  let weather;

  form.addEventListener("submit", e => {
    e.preventDefault();
    weather = new Weather(inputLocation.value);

    weather.getWeatherByCity().then(data => {
      console.log(data);
      description.textContent = data.description;
      location.textContent = data.city;
      currentTemp.textContent = parseInt(data.temperature) + "°";
      feelsLike.textContent = parseInt(data.feelsLike) + "°";
      tempLow.textContent = parseInt(data.low) + "°";
      tempHigh.textContent = parseInt(data.high) + "°";
      humidity.textContent = parseInt(data.humidity);
      wind.textContent = parseInt(data.windSpeed) + " mph";
      icon.src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;

      setBackground(data.description);
      setUnits();
    });
  });
})();

// Test Area

function farenheitToCelsius(num) {
  return (parseInt(num) - 32) * (5 / 9);
}

function celsiusToFarenheight(num) {
  return parseInt(num) * (9 / 5) + 32;
}

function setUnits() {
  if (document.getElementById("farenheit").classList.contains("active")) {
    currentTemp.textContent = parseInt(data.temperature);
  }
}
