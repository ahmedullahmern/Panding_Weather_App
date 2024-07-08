var img_set = document.getElementById("img_set")
var selected = document.getElementById("sel")
var temperatur = document.getElementById("temperatur")
var colud_condition = document.getElementById("colud_condition")
var loader = document.getElementById("loader")
var ci = document.getElementById("ci")
var main1 = document.getElementById("main1")
var APIkey = "f3e9d12da54701d645d6853826dfa41c"
var city;

function fetchWeater() {
    var APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
    img_set.style.display = "none"
    temperatur.innerHTML = ""
    loader.style.display = "block"
    colud_condition.innerHTML = ""
    ci.innerHTML = ""

    if (APIurl == "net::ERR_INTERNET_DISCONNECTED") {
        alert("hi")
    }

    fetch(APIurl)
        .then(function (res) {
            if (!res.ok) {
                throw new console.error("error he");
            }
            return res.json()
        })
        .then((data) => {
            img_set.style.display = "block"
            console.log(data)
            ci.innerHTML = data.name
            temperatur.innerHTML = Math.round(data.main.temp - 273) + "°C"
            colud_condition.innerHTML = data.weather[0].main
            img_set.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        })
        .catch(function (result) {
            if (result) {
                ci.innerHTML = "city not found"
                temperatur.innerHTML = ""
                loader.style.display = "none"
            }
            
        })
        .finally(() => {
            loader.style.display = "none";
        });

}
fetchWeater()

selected.addEventListener("change", function () {
    city = selected.value
    fetchWeater()
    selected.value = ""
})


