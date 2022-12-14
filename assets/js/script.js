//Variable Declarations
var API_KEY = "1d41d88a7537cedbb3f07e92b34b8e94";
var APIKEY = "704f9597167e48ceb527d58b08526b5f";
var now = new Date().toLocaleDateString();
var weatherItem = $("p");
var cityName = $("#currentDay");
var cityIcon = $("#current-icon");
var searchBtn = $("#search-btn");
var searchInput = $("#search-input");
var uvIndex = $("#uv-index");
var dataList = $("#datalistOptions");

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
          //title of current day
          cityName.text(data.data[0].city_name + " " + now);
          cityIcon.attr(
            "src",
            "https://www.weatherbit.io/static/img/icons/" +
              data.data[0].weather.icon +
              ".png"
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
          //loops through each forecast card element displays api keys appropriately
          for (var i = 1; i <= 6; i++) {
            //this line goes to title-i and displays date time key
            $("#title-" + i).text(data.data[i].datetime);
            $("#vis-" + i).attr(
              "src",
              "https://www.weatherbit.io/static/img/icons/" +
                data.data[i].weather.icon +
                ".png"
            );
            $("#tmp-" + i).text("Temp: " + data.data[i].temp + " F");
            $("#wind-" + i).text("Wind: " + data.data[i].wind_spd + " MPH");
            $("#hum-" + i).text("Humidity: " + data.data[i].rh + " %");
          }
        });
    });
}

//saves the city user inputs into the search area
function saveCity(input) {
  //gets city storage key from local storage
  var cityStorage = localStorage.getItem("cityStorage");
  //if city storage is empty turn city storage into an array
  //else turn the JSON into a object
  if (cityStorage === null) cityStorage = [];
  else {
    cityStorage = JSON.parse(cityStorage);
  }
  //moves the new input to the front of the array
  cityStorage.unshift(input);
  //new search added is city storage turned into a string
  var newSearchAdded = JSON.stringify(cityStorage);
  //set the new search into the city storage key
  localStorage.setItem("cityStorage", newSearchAdded);
}

//displays the search into the recent searches
function displayCity() {
  //gets the city storage key from local storage
  var cityStorage = localStorage.getItem("cityStorage");
  //turns the city storage into an object
  cityStorage = JSON.parse(cityStorage);

  //the .empty function empty's the data list and brings the recent search to the top
  dataList.empty();

  //if the city storage is NOT empty loop through the next if statement
  if (cityStorage != null) {
    for (var i = 0; i < 5; i++) {
      //if city storage index is NOT empty create the option element and put it in the datalist
      if (cityStorage[i] != null) {
        var option = document.createElement("option");
        option.value = cityStorage[i];
        dataList.append(option);
      }
    }
  }
}

//Event Listeners
searchBtn.on("click", function () {
  var input = searchInput.val().trim();
  getWeatherApi(input);
  saveCity(input);
  displayCity(input);
});
