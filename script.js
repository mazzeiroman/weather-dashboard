var APIKey = "e17e89ad29a637df3767ab03ebde55a4";
var usersArray = JSON.parse(localStorage.getItem("usersInput")) || [];


console.log(usersArray)
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
// console.log(today)

var usersArray = JSON.parse(localStorage.getItem("usersInput")) || [];
var lastCity= usersArray[usersArray.length-1]
var fiveDays = $(".fiveDays")
 fiveDays.addClass("row");



for (var i=0; i<5; i++){
var newDivCol2 = $("<div>" + "</div>");
//col-md-2 inside newDivCol2.addClass("card text-white bg-primary mb-3");
newDivCol2.addClass("card text-white bg-primary mb-3");
newDivCol2.attr("id","day"+[i+1])

 var newDivUl = $("<ul>" +"</ul>");
 var newDivLi1 = $("<p>" +"</p>");
 newDivLi1.attr("id","date"+[i+1]);
 var newDivIcon = $("<img/>");
newDivIcon.attr("id","icon"+[i+1])
 var newDivLi2 = $("<li>" +"</li>");
 newDivLi2.attr("id","temp"+[i+1]);
 var newDivLi3 = $("<li>" +"</li>");
 newDivLi3.attr("id","hum"+[i+1]);

 newDivUl.append(newDivLi1)
 newDivUl.append(newDivIcon)
 newDivUl.append(newDivLi2)
 newDivUl.append(newDivLi3)
 newDivCol2.append(newDivUl)
// newDivCol2.append("<p>" +"Date"+ "</p>");

// newDivCol2.append("<p>" +"Temp"+ "</p>");


  fiveDays.append(newDivCol2);

}

if(lastCity){
    searchWeather(lastCity)
    }

// $(document).on("load",function(event) {
//     event.preventDefault(); 
//     var cityName = usersArray[0];
//     searchWeather(cityName)
// })

$(document).on('click', '.searchBtn', function(event) {
    event.preventDefault(); 
    var cityName = $("input").val();
    searchWeather(cityName)
})

$(document).on('click', '.cityClick', function(event) {
    event.preventDefault();  

    var cityNameLi = $(this).text();
    console.log($(this).text())
    searchWeather(cityNameLi)
 
 });

  function searchWeather(city) {
//    var city = $("input").val();

//    console.log(city)
    var queryURL ="https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + APIKey; 

    var usersInput =city;
    
      console.log(usersArray);

      if(usersArray.indexOf(city) === -1){
        console.log("The something variable is not in usersArray")
        usersArray.push(usersInput);
    }

    //   usersArray.push(usersInput);
      localStorage.setItem('usersInput', JSON.stringify(usersArray));
  
     var revArr = usersArray.reverse();
     console.log(revArr);


     $(".citiesLi").empty()
    
     // appending new city to the DOM
     for (i=0; i< revArr.length; i++){
    var newDivRow = $("<div>" +revArr[i] +"</div>");
    newDivRow.addClass("row alert alert-warning cityClick")
    newDivRow.attr("id","cityClick"+[i])
    // console.log(usersArray[i])
    $(".citiesLi").append(newDivRow);

     }
    
    //  $(document).on('click', '.cityClick', function(event) {
    //     event.preventDefault();  
    
    //     city1 = $(this).text();
    //     console.log(city1)
     
    //  });
    
     
  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {

      // Log the queryURL
    //   console.log(queryURL);

      // Log the resulting object
    //   console.log(response);
    //   console.log(response.weather[0].icon);
      var titleImg = response.weather[0].icon;

      // Convert the temp to fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;

      // add temp content to html
      $(".temp").text("Temperature (K) " + response.main.temp);
      $(".tempF").text("Temperature (F) " + tempF.toFixed(2));


      // Transfer content to HTML
    $(".displayC").children("span").text(city + " ("+today+")");
    $(".displayC").children("img").attr("src", "https://openweathermap.org/img/wn/"+titleImg+"@2x.png")
    $("#temp").text("Temperature: " + Math.floor(tempF)+" ℉ ");
    $("#hum").text("Humidity: " + response.main.humidity + " %");
    $("#wind").text("Wind Speed: " + response.wind.speed+ " MPH");

     var lon = response.coord.lon;
     var lat = response.coord.lat;


      // Log the data in the console as well
    //   console.log("Wind Speed: " + response.wind.speed);
    //   console.log("Humidity: " + response.main.humidity);
    //   console.log("Temperature (F): " + tempF);
    

    var queryURLF = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&exclude=minutely,hourly,alerts&appid="+APIKey;
    //   console.log(queryURLF)

      $.ajax({
        url: queryURLF,
        method: "GET"
      })
      .then(function(responseF) {
    //   console.log(responseF)
    //   console.log(responseF.current.uvi)
      var uvEl =$("#uv").children("span");
      uvEl.text(" "+ responseF.current.uvi);
      uvEl.removeAttr("class")
     
      var uvi = responseF.current.uvi;
        if (uvi <= 2){
            uvEl.addClass("green") 
     } else if (uvi>2 && uvi<=5){
        uvEl.addClass("yellow") 
     } else if (uvi>5 && uvi<=7){
        uvEl.addClass("orange") 
     } else if (uvi>7 && uvi<=10){
        uvEl.addClass("red") 
     } else {
        uvEl.addClass("purple") 
     }

  for (var i=0; i<=5; i++) {
    
    var unix = responseF.daily[i+1].dt;
    var date =new Date(unix * 1000);
    // console.log(date.toString().slice(4,15) )

    // console.log(responseF.daily[i].weather[0].icon)
    var daysIcon = responseF.daily[i].weather[0].icon;
    var temper = responseF.daily[i+1].temp.day

     $("#date"+[i+1]).html(date.toString().slice(4,15))
     $("#icon"+[i+1]).attr("src", "https://openweathermap.org/img/wn/"+daysIcon+"@2x.png")
     $("#hum"+[i+1]).html(responseF.daily[i+1].humidity+"%")
     $("#temp"+[i+1]).html(Math.floor(temper) + " ℉ ")
  }

      })

    
    })
}

$(".clearBtn").on("click", function(){
  localStorage.clear();
  $(".citiesLi").empty()
})

