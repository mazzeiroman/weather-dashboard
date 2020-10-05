var APIKey = "e17e89ad29a637df3767ab03ebde55a4";
// var city = "";
// var queryURL ="http://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + APIKey;

// console.log(queryURL)
var fiveDays = $(".fiveDays")
 fiveDays.addClass("row");

 var newDivCol11 =  $("<div>" + "</div>");
  newDivCol11.addClass("col-md-1 ");
  fiveDays.append(newDivCol11);

for (var i=0; i<5; i++){
var newDivCol2 = $("<div>" + "</div>");
newDivCol2.addClass("col-md-2 container alert-primary");
newDivCol2.append("<p>" +"Date"+ "</p>");

newDivCol2.append("<p>" +"Temp"+ "</p>");


  fiveDays.append(newDivCol2);
}

var newDivCol11 =  $("<div>" + "</div>");
newDivCol11.addClass("col-md-1");
fiveDays.append(newDivCol11);

$(document).on('click', '.searchBtn', function(event) {
    event.preventDefault();  
  
   var city = $("input").val();
    var queryURL ="http://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + APIKey; 

    var newDivRow = $("<div>" +city +"</div>");
    newDivRow.addClass("row alert alert-warning")
    $(".col-md-4").append(newDivRow);
  
  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {

      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(response);
      
      // Convert the temp to fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;

      // add temp content to html
      $(".temp").text("Temperature (K) " + response.main.temp);
      $(".tempF").text("Temperature (F) " + tempF.toFixed(2));


      // Transfer content to HTML
    $(".displayC").text(city);
    $("#temp").text("Temperature: " + tempF+" ℉ ");
    $("#hum").text("Humidity: " + response.main.humidity + " %");
    $("#wind").text("Wind Speed: " + response.wind.speed+ " MPH");

     var lon = response.coord.lon;
     var lat = response.coord.lat;
     var queryURLUV = "http://api.openweathermap.org/data/2.5/uvi?lat="+ lat+"&lon="+ lon+"&appid="+APIKey;

     $.ajax({
        url: queryURLUV,
        method: "GET"
      })
      .then(function(responseuv) {
          console.log(responseuv.value)
     $("#uv").text("UV Index: " + responseuv.value);
      })

      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + tempF);
    //   console.log(queryURLUV)
      
    })

})

