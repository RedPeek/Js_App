let key = 'd999a578d6d8fff8855a42b1525503a5';
const imageMap = {
    'Clear': `url("assets/clear.jpg")`,
    'Rain': `url("assets/rainy.jpg")`,
    'Snow': `url("assets/snow.jpg")`,
    'Clouds': `url("assets/cloudy.jpg")`,
    'Thunderstorm': `url("assets/storm.jpg")`,
}

function triggerEvents() {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm) {
        function searchMeteo(searchTerm) {
            const Http = new XMLHttpRequest();
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&APPID=${key}`;

            Http.onreadystatechange = (e) => {
                if (Http.readyState === 4 && Http.status === 200) {
                    weatherResponce = JSON.parse(Http.responseText);
                    for (var i = 0; i < weatherResponce.weather.length; i++) {
                        var weatherElements = weatherResponce.weather[i];
                        if (imageMap[weatherElements.main]) {
                            document.body.style.backgroundImage = imageMap[weatherElements.main]
                        } else {
                            document.body.style.backgroundImage = `url("assets/default.jpg")`;
                        }

                        // take weather : description, icon, main
                        let iconID = weatherResponce.weather[i].icon;
                        let iconURL = 'http://openweathermap.org/img/wn/' + iconID + '.png';

                        let cityName = weatherResponce.name;
                        let temperature = weatherResponce.main.temp;
                        let localDescription = weatherResponce.weather[i].description;
                        let localDescriptionCapitalized = localDescription.charAt(0).toUpperCase() + localDescription.slice(1);
                        let windSpeed = weatherResponce.wind.speed;
                        let humidity = weatherResponce.main.humidity;

                        document.getElementById("displayData").innerHTML =
                            `<div id="show_meteo">
                            <h1><img src="${iconURL}">${cityName}</h1>
                                <div>${temperature}°</div>
                                <div>${localDescriptionCapitalized}</div>                              
                             <div>Wind speed is ${windSpeed} m/s</div> 
                             <div>Humidity is ${humidity}%</div>
                             </div>`
                    }
                } else if (Http.statusText === "Not Found") {
                    document.getElementById('alertDialog').classList.remove('alert_dialog_none');
                    document.getElementById('alertDialog').classList.add('display_alert_dialog');
                }
            }
            Http.open("GET", url);
            Http.send(Http.responseText);
        }
        searchMeteo(searchTerm);
    }
}
document.getElementById('searchMeteoBtn').addEventListener('click', triggerEvents(), false);
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