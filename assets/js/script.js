//Variable Declarations
var API_KEY = "1d41d88a7537cedbb3f07e92b34b8e94";
var APIKEY = "704f9597167e48ceb527d58b08526b5f";
var weatherItem = $("p");
var cityName = $("#currentDay");
// lat=39.7294&lon=-104.8125
//Functions
function getWeatherApi(location) {
  var searchResult = location; //location
  var openWeatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchResult +
    "&appid=" +
    API_KEY;

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

      fetch(weatherBit)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data.data[0]);
          console.log(data.data[0].weather.icon);
          console.log(data.data[0].datetime);
          console.log(data.data[0].temp);
          console.log(data.data[0].wind_spd);
          console.log(data.data[0].rh);
          console.log(data.data[0].uv);
          cityName.text(
            data.data[0].city_name +
              " " +
              data.data[0].datetime +
              " " +
              data.data[0].weather.icon
          );
          var weatherArray = [
            `Temp: ${data.data[0].temp} F`,
            `Wind: ${data.data[0].wind_spd} MPH`,
            `Humidity: ${data.data[0].rh} %`,
            `UV: ${data.data[0].uv}`,
          ];
          for (var i = 0; i < weatherArray.length; i++) {
            weatherItem.eq(i).text(weatherArray[i]);
          }
        });

      var forcast =
        "https://api.weatherbit.io/v2.0/forecast/daily?&lat=" +
        lat +
        "&lon=" +
        lon +
        "&key=" +
        APIKEY;
      fetch(forcast)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data.data);
          console.log(data.data[1]);
          console.log(data.data[2]);
          console.log(data.data[3]);
          console.log(data.data[4]);
          console.log(data.data[5]);
        });
    });
}
getWeatherApi("aurora");
//Event Listeners
