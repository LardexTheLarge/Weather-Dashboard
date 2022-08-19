//Variable Declarations
var API_KEY = "1d41d88a7537cedbb3f07e92b34b8e94";
var APIKEY = "704f9597167e48ceb527d58b08526b5f";
var now = new Date().toLocaleDateString();
var weatherItem = $("p");
var forecastSlot = $("#forecast");
var cityName = $("#currentDay");
var searchBtn = $("#search-btn");
var searchInput = $("#search-input");
var uvIndex = $("#uv-index");

//Functions
//this function calls all three api's and displays them to current and forecast
function getWeatherApi(location) {
  var searchResult = location; //location
  var openWeatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchResult +
    "&appid=" +
    API_KEY;
  //calls open weather api
  fetch(openWeatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.name);
      var lon = data.coord.lon;
      var lat = data.coord.lat;

      var weatherBit =
        "https://api.weatherbit.io/v2.0/current?lat=" +
        lat +
        "&lon=" +
        lon +
        "&key=" +
        APIKEY;

      //calls weather bit api
      fetch(weatherBit)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data.data[0]);
          //title of current day
          cityName.text(
            data.data[0].city_name + " " + now + " " + data.data[0].weather.icon
          );
          //array of api data aligning with current day info
          var weatherArray = [
            `Temp: ${data.data[0].temp} F`,
            `Wind: ${data.data[0].wind_spd.toFixed(1)} MPH`,
            `Humidity: ${data.data[0].rh} %`,
            `UV: ${data.data[0].uv.toFixed(2)}`,
          ];
          //loops through each array item and displays to weatherItem element
          for (var i = 0; i < weatherArray.length; i++) {
            weatherItem.eq(i).text(weatherArray[i]);
          }
          //color code UV index severity
          var uvColor = data.data[0].uv.toFixed(2);
          if (uvColor >= 7) {
            uvIndex.addClass("severe");
          } else if (uvColor == 5 || uvColor == 6) {
            uvIndex.removeClass("severe");
            uvIndex.addClass("moderate");
          } else {
            uvIndex.removeClass("severe");
            uvIndex.removeClass("moderate");
            uvIndex.addClass("favorable");
          }
        });

      var forcast =
        "https://api.weatherbit.io/v2.0/forecast/daily?&lat=" +
        lat +
        "&lon=" +
        lon +
        "&key=" +
        APIKEY;

      //calls weather bit forecast api
      fetch(forcast)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data.data);
          // console.log(data.data[1]);
          // console.log(data.data[2]);
          // console.log(data.data[3]);
          // console.log(data.data[4]);
          // console.log(data.data[5]);

          for (var i = 1; i <= 5; i++) {
            console.log(forecastArray);
            var forecastArray = [
              `Visual: ${data.data[i].weather.icon} `,
              `Temp: ${data.data[i].temp} F`,
              `Wind: ${data.data[i].wind_spd.toFixed(1)} MPH`,
              `Humidity: ${data.data[i].rh} %`,
            ];
            forecastSlot.eq(i).text(forecastArray);
          }
        });
    });
}

//Event Listeners
searchBtn.on("click", function () {
  var input = searchInput.val().trim();
  getWeatherApi(input);
});
