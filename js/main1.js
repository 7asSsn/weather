//! Today variables
let todayName = document.getElementById("today_data_day_name");
let todayNumber = document.getElementById("today_data_day_number");
let todayMonth = document.getElementById("today_data_month");
let todayLocation = document.getElementById("today_location");
let todayTemp = document.getElementById("today_temp");
let todayConditionImg = document.getElementById("today_condition_img");
let todayConditionText = document.getElementById("today_condition_text");
let todayHumidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("windDirection");
let weatherData;
// !Tomorrow variables
let tomorrowDay = document.getElementsByClassName("tomorrow_day_name");
let tomorrowMinTemp = document.getElementsByClassName("tomorrow_min_temp");
let tomorrowMaxTemp = document.getElementsByClassName("tomorrow_max_temp");
let tomorrowConditionImg = document.getElementsByClassName(
  "tomorrow_condition_img"
);
let tomorrowConditionText = document.getElementsByClassName(
  "tomorrow_condition_text"
);

// !search variables
let searchInput = document.getElementById("search");

//! Fetch API function
async function getWeatherData(cityName) {
  let weatherResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${cityName}&days=3`
  );
  let weatherData = await weatherResponse.json();
  return weatherData;
}

// !display Today Data
function displayTodayData(data) {
  let todayDate = new Date();
  todayName.innerHTML = todayDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  todayNumber.innerHTML = todayDate.getDate();
  todayMonth.innerHTML = todayDate.toLocaleDateString("en-US", {
    month: "long",
  });

  todayLocation.innerHTML = data.location.name;
  todayTemp.innerHTML = data.current.temp_c;
  todayConditionImg.setAttribute("src", "https:" + data.current.condition.icon);
  todayConditionText.innerHTML = data.current.condition.text;
  todayHumidity.innerHTML = data.current.humidity + "%";
  wind.innerHTML = data.current.wind_kph;
  windDirection.innerHTML = data.current.wind_dir;
}
// !display Tomorrow
function displayNextDay(data) {
  let forecastData = data.forecast.forecastday;
  for (let i = 0; i < 2; i++) {
    let nextDate = new Date(forecastData[i + 1].date);
    tomorrowMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c;
    tomorrowConditionImg[i].setAttribute(
      "src",
      "https:" + forecastData[i + 1].day.condition.icon
    );
    tomorrowMinTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c;
    tomorrowConditionText[i].innerHTML = forecastData[i + 1].day.condition.text;
    tomorrowDay[i].innerHTML = nextDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
  }
}
//!start application
async function startApp(city = "cairo") {
  let weatherData = await getWeatherData(city);
  if (!weatherData.error) {
    displayTodayData(weatherData);
    displayNextDay(weatherData);
  }
}
startApp();

//! search
searchInput.addEventListener("input", function () {
  startApp(searchInput.value);
});
