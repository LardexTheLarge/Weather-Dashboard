//Variable Declerations
var API_KEY = "704f9597167e48ceb527d58b08526b5f";

//Functions
function getWeatherApi() {
  var url =
    "https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY&include=minutely";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
getWeatherApi();

function getUVIndex() {
  var lat = $("#lat").val();
  var lng = $("#lng").val();
  var alt = $("#alt").val();
  var ozone = $("#ozone").val();
  var dt = $("#dt").val();

  $.ajax({
    type: "GET",
    dataType: "json",
    beforeSend: function (request) {
      request.setRequestHeader(
        "x-access-token",
        "bed77c07b72ceed9e0f50531d3cf941a"
      );
    },
    url:
      "https://api.openuv.io/api/v1/uv?lat=" +
      lat +
      "&lng=" +
      lng +
      "&alt=" +
      alt +
      "&ozone=" +
      ozone +
      "&dt=" +
      dt,
    success: function (response) {
      //handle successful response
    },
    error: function (response) {
      // handle error response
    },
  });
}
//Event Listeners
