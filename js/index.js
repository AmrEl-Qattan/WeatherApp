// api   https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=cairo&days=3


// today's card variables   // 5

var today = document.getElementById('today');
var todayDate = document.getElementById('today-date');
var cityLocation = document.getElementById('location');
var todayDegree = document.getElementById('today-degree');
var todayIcon = document.getElementById('today-icon');
var todayDescription = document.getElementById('today-description');
var wind = document.getElementById('wind');
var compass = document.getElementById('compass');
var humidity = document.getElementById('humidty');
var searchBar = document.getElementById("search-bar");




//  next days variables // 6 
var nextDay = document.getElementsByClassName('nextDay');
var nextDayIcon = document.getElementsByClassName("nextDay-icon");
var maxDegree = document.getElementsByClassName("max-degree");
var minDegree = document.getElementsByClassName("min-degree");
var nextDayDescription = document.getElementsByClassName("nextDay-description");
// var currentCity = "Cairo";


// days arraw   // 3
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

//  months arraw  // 4
monthName = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Spet",
    "Oct",
    "Nov",
    "Dec",
  ]; 
//  get api   // 1 

var apiResponse;
var responData;
async function getWeatherData(currentCity='cairo'){   
     apiResponse =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`)
     responData =await apiResponse.json();
    // console.log(responData);
    displayTodayWeather();
    displayNextDayWeather();
}
getWeatherData();


// display today date  // 2 

function displayTodayWeather(){  
    var date = new Date();

    today.innerHTML = days[date.getDay()];
    todayDate.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`
    cityLocation.innerHTML = responData.location.name;
    todayDegree.innerHTML = responData.current.temp_c;
    todayIcon.setAttribute("src", `https:${responData.current.condition.icon}`);
    todayDescription.innerHTML = responData.current.condition.text;
    wind.innerHTML = responData.current.wind_kph;
    compass.innerHTML = responData.current.wind_dir;
    humidity.innerHTML = responData.current.humidity;
}
// displayTodayWeather();

// display next days weather  // 7

function displayNextDayWeather(){
    for(var i =0; i<nextDay.length;i++){
        nextDay[i].innerHTML=days[new Date(responData.forecast.forecastday[i + 1].date).getDay()];
        nextDayIcon[i].setAttribute("src", `https:${responData.forecast.forecastday[ i + 1].day.condition.icon}`);
        maxDegree[i].innerHTML = responData.forecast.forecastday[i + 1].day.maxtemp_c;
        minDegree[i].innerHTML = responData.forecast.forecastday[i + 1].day.mintemp_c;
        nextDayDescription[i].innerHTML = responData.forecast.forecastday[i + 1 ].day.condition.text;
    }
}

searchBar.addEventListener('keyup', function(){
    currentCity = searchBar.value;
    getWeatherData(currentCity);
});