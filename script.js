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

