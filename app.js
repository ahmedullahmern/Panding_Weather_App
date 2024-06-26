var img_set = document.getElementById("img_set")
var selected = document.getElementById("sel")
var temperatur = document.getElementById("temperatur")
var colud_condition = document.getElementById("colud_condition")
var loader = document.getElementById("loader")
var ci = document.getElementById("ci")
var main1 = document.getElementById("main1")
var APIkey = "f3e9d12da54701d645d6853826dfa41c"
var city  ;

function fetchWeater() {
    var APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
    img_set.innerHTML=""
    temperatur.innerHTML="Loading..."
    colud_condition.innerHTML=""
    ci.innerHTML=""

    fetch(APIurl)
        .then(function(res){
            if(!res.ok){
                throw new console.error("error he");
            }
       return res.json()
        })
        .then((data) => {
            console.log(data)
            ci.innerHTML=data.name
            temperatur.innerHTML = Math.round(data.main.temp - 273) + "°C"
            colud_condition.innerHTML = data.weather[0].main
            img_set.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        })        
        .catch(function(result){
            if(result){
                ci.innerHTML="city not found"
                temperatur.innerHTML=""
            }
        })

}
fetchWeater()

selected.addEventListener("change",function(){
    city=selected.value
    fetchWeater()
    selected.value=""
})


