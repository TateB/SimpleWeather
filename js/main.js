$(document).ready( function () {

  /* Get IP location */

  var location = "";
  var link = "http://api.ipinfodb.com/v3/ip-city/?callback=?";
  var options = {
    key : "967d1ff4865e541568cd1a11803c57203cf3e69123464ac8a76d939879020bf5",
    ip : myip,
    format : 'json'
  };
  function display(data) {
    location += data.cityName;
    location += ',' + data.countryName;

    $('h2').html(data.cityName + ', ' + data.countryName);

    /* Set Temperature Units */

    var tempUnit = 'metric';
    var shortTemp = 'C';

    /* On click change tempUnit */

    $('button').click( function () {
      $('button').removeClass('active');
      $(this).addClass('active');
      if($(this).is(':contains("C")'))  {
        tempUnit = 'metric';
        $('#main').html(32 + "&deg;" + "C");
        doWeather();
        shortTemp = 'C';
      } else {
        tempUnit = 'imperial';
        $('#main').html(67.6 + "&deg;" + "F");
        doWeather();
        shortTemp = 'F';
      }
    });

    /* Get weather information */

    function doWeather() {
      var linkWeather = "http://api.openweathermap.org/data/2.5/weather?callback=?";
      var optionsWeather = {
        apiKey : '94dfb4553ae4ab27c02714834ec4f7e5',
        units : tempUnit,
        q : location
      };
      function displayWeather(data) {
        var mainHTML = data.main.temp;
        var weatherIcon = data.weather[0].id;
        $('#main').html(mainHTML + "&deg;" + shortTemp);
        $('.image').addClass("wi-owm-" + weatherIcon);
      }
      $.getJSON(linkWeather, optionsWeather, displayWeather);
    }

    doWeather();
  }
  $.getJSON(link, options, display);


}); //end ready
