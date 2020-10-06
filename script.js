var APIKey = "e17e89ad29a637df3767ab03ebde55a4";
// var city = "";
// var queryURL ="http://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + APIKey;

// console.log(queryURL)
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
console.log(today)

var fiveDays = $(".fiveDays")
 fiveDays.addClass("row");


for (var i=0; i<5; i++){
var newDivCol2 = $("<div>" + "</div>");
newDivCol2.addClass("col-md-2 container alert-primary");
newDivCol2.attr("id","day"+[i+1])

 var newDivUl = $("<ul>" +"</ul>");
 var newDivLi1 = $("<li>" +"</li>");
 newDivLi1.attr("id","date"+[i+1]);
 var newDivLi2 = $("<li>" +"</li>");
 newDivLi2.attr("id","temp"+[i+1]);
 var newDivLi3 = $("<li>" +"</li>");
 newDivLi3.attr("id","hum"+[i+1]);

 newDivUl.append(newDivLi1)
 newDivUl.append(newDivLi2)
 newDivUl.append(newDivLi3)
 newDivCol2.append(newDivUl)
// newDivCol2.append("<p>" +"Date"+ "</p>");

// newDivCol2.append("<p>" +"Temp"+ "</p>");


  fiveDays.append(newDivCol2);
}


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
    $(".displayC").text(city + " ("+today+")");
    $("#temp").text("Temperature: " + Math.floor(tempF)+" ℉ ");
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
      
      
    //  if (responseuv.value <= 2){
    //     $("#uv").addClass(".green") 
    //  } else if (responseuv.value>2 && responseuv.value<=5){
    //     $("#uv").addClass(".yellow") 
    //  } else if (responseuv.value>5 && responseuv.value<=7){
    //     $("#uv").addClass(".orange") 
    //  } else if (responseuv.value>7 && responseuv.value<=10){
    //     $("#uv").addClass(".red") 
    //  } else {
    //     $("#uv").addClass(".purple") 
    //  }


      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + tempF);
    //   console.log(queryURLUV)
      
    })

    var queryURLFiveDay = "http://api.openweathermap.org/data/2.5/forecast?q="+ city+"&appid="+APIKey;
    console.log(queryURLFiveDay)

    $.ajax({
        url: queryURLFiveDay,
        method: "GET"
      })
      .then(function(responseFiveDay) {
        

            $("#date1").append(responseFiveDay.list[2].dt_txt)
            $("#hum1").append("humidity: "+ responseFiveDay.list[2].main.humidity +" %")
            $("#temp1").append(Math.floor( (responseFiveDay.list[2].main.temp - 273.15) * 1.80 + 32))

            $("#day2").append("<p>" + responseFiveDay.list[10].dt_txt + "</p>")
            $("#day2").append("<p>" +"humidity: "+ responseFiveDay.list[10].main.humidity + " %"+ "</p>")
            $("#day2").append("<p>" + Math.floor((responseFiveDay.list[10].main.temp - 273.15) * 1.80 + 32) + "</p>")

            $("#day3").append("<p>" + responseFiveDay.list[18].dt_txt + "</p>")
            $("#day3").append("<p>" +"humidity: "+ responseFiveDay.list[18].main.humidity + " %"+ "</p>")
            $("#day3").append("<p>" + Math.floor((responseFiveDay.list[18].main.temp - 273.15) * 1.80 + 32)+ "</p>")

            $("#day4").append("<p>" + responseFiveDay.list[26].dt_txt + "</p>")
            $("#day4").append("<p>" +"humidity: "+ responseFiveDay.list[26].main.humidity +" %"+  "</p>")
            $("#day4").append("<p>" + Math.floor((responseFiveDay.list[26].main.temp - 273.15) * 1.80 + 32) + "</p>")

            $("#day5").append("<p>" + responseFiveDay.list[34].dt_txt + "</p>")
            $("#day5").append("<p>" +"humidity: "+ responseFiveDay.list[34].main.humidity +" %"+  "</p>")
            $("#day5").append("<p>" + Math.floor((responseFiveDay.list[34].main.temp - 273.15) * 1.80 + 32)+ "</p>")

          console.log(responseFiveDay.list[2].dt_txt) 
          console.log(responseFiveDay.list[2].main.humidity)
          console.log(responseFiveDay.list[2].main.temp)
          
    // 2 10 18 26 34

     
      })

})

