let key = 'd999a578d6d8fff8855a42b1525503a5';
var myJson;



const imageMap = {
    'Clear': 'url("assets/clear.jpg")',
    'Rain': 'url("assets/rainy.jpg")',
    'Snow': 'url("assets/snow.jpg")',
    'Clouds': 'url("assets/cloudy.jpg")',
    'Thunderstorm': 'url("assets/storm.jpg")',
}

function triggerEvents() {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm) {
        function searchMeteo(searchTerm) {
            const Http = new XMLHttpRequest();
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&APPID=${key}`;

            Http.onreadystatechange = (e) => {
                if (Http.readyState === 4 && Http.status === 200) {
                    myJson = JSON.parse(Http.responseText);
                    console.log(myJson, Http);
                    for (var i = 0; i < myJson.weather.length; i++) {
                        var weatherElements = myJson.weather[i];
                        if (imageMap[weatherElements.main]) {
                            document.body.style.backgroundImage = imageMap[weatherElements.main]
                        } else {
                            document.body.style.backgroundImage = 'url("assets/default.jpg")'
                        }

                        // take weather : description, icon, main
                        let iconID = myJson.weather[i].icon;
                        let iconURL = 'http://openweathermap.org/img/wn/' + iconID + '.png';

                        let cityName = myJson.name;
                        let temperature = myJson.main.temp;
                        let localDescription = myJson.weather[i].description;
                        let localDescriptionCapitalized = localDescription.charAt(0).toUpperCase() + localDescription.slice(1);
                        let windSpeed = myJson.wind.speed;
                        let humidity = myJson.main.humidity;

                        document.getElementById("display_data").innerHTML =
                            `<div id="show_meteo">
                            <h1><img src="${iconURL}">${cityName}</h1>
                                <div>${temperature}°</div>
                                <div>${localDescriptionCapitalized}</div>                              
                             <div>Wind speed is ${windSpeed} m/s</div> 
                             <div>Humidity is ${humidity}%</div>
                             </div>`
                    }
                } else if (Http.statusText === "Not Found") {
                    document.getElementById('alertDialog').classList.remove('alertDialogNone');
                    document.getElementById('alertDialog').classList.add('displayAlertDialog');
                }
            }
            Http.open("GET", url);
            Http.send(Http.responseText);
        }
        searchMeteo(searchTerm);
    }
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            let currentLocation = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
            const result = fetch(`https://api.openweathermap.org/data/2.5/weather?${currentLocation}&units=metric&APPID=${key}`)
                .then(
                    response => {
                        response.json().then(r => {
                            const locationName = r.name;
                            document.getElementById('current_locationData').innerHTML =
                                `<div id="current_locationName">La tua posizione attuale é ${locationName}`
                        })
                    }
                ).catch(response => {
                    console.log('ho rotto tutto');
                })
        }
    );
} else {
    console.log("E' ora che cambi browser, stronzo!");
}



document.getElementById('search__btn').addEventListener('click', triggerEvents(), false);

document.getElementById('searchInput').onkeypress = function (e) {
    if (!e) e = input.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13') {
        // Enter pressed
        triggerEvents();
        return false;
    }
}

function closeAlert() {
    document.getElementById('alertDialog').style.display = 'none';
    document.getElementById("resetForm").reset();
}

function backHome(){
    window.open('index.html');
}
