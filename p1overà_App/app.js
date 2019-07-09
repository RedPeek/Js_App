let key = '10bf4b34c4ec859a2ec60cab4c6c5c9a';
var myJson;

//riscrivi funzione in maniera di beccare sia click che keydown

document.getElementById("search__btn").addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm) {
        function searchMeteo(searchTerm) {

            const Http = new XMLHttpRequest();
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&APPID=${key}`;


            Http.onreadystatechange = (e) => {
                if (Http.readyState === 4 && Http.status === 200) {
                    myJson = JSON.parse(Http.responseText);
                    console.log(myJson);

                    for (var i = 0; i < myJson.weather.length; i++) {
                        var weatherElements = myJson.weather[i];
                        //riscrivi switch come oggetto con chiave, valore
                        switch (weatherElements.main) {

                            case 'Clear':
                                document.body.style.backgroundImage = 'url("assets/clear.jpg")';
                                break;
                            case 'Rain':
                                document.body.style.backgroundImage = 'url("assets/rainy.jpg")';
                                break;
                            case 'Snow':
                                document.body.style.backgroundImage = 'url("assets/snow.jpg")';
                                break;
                            case 'Clouds':
                                document.body.style.backgroundImage = 'url("assets/cloudy.jpg")';
                                break;
                            case 'Thunderstorm':
                                document.body.style.backgroundImage = 'url("assets/storm.jpg")';
                                break;
                            default:
                                document.body.style.backgroundImage = 'url("assets/default.jpg")';
                                break;
                        }

                        // take weather : description, icon, main
                        let iconID = myJson.weather[i].icon;
                        let iconURL = 'http://openweathermap.org/img/wn/' + iconID + '.png';
                        document.getElementById("icon_img").src = iconURL;
                        document.innerHTML = `${iconURL}`;

                        let weatherDescription = myJson.weather[i].main;
                        let cityName = myJson.name;
                        let temperature = myJson.main.temp;
                        console.log(temperature); //che cazzo di unità do misura è?
                        let localDescription = myJson.weather[i].description;
                        console.log(localDescription);
                        let windSpeed = myJson.wind.speed;
                        console.log(windSpeed);
                        let humidity = myJson.main.humidity;
                        console.log(humidity);



                        var printData = document.getElementById("weather_description").innerHTML =
                            `<h1>${weatherDescription} in ${cityName}</h1>
                             <div>Temperature is ${temperature} with ${localDescription} </div> 
                              
                             <div>Wind speed is ${windSpeed} m/s and Humidity is ${humidity}%</div> `

                        console.log(printData);




                    }


                }
            }
            Http.open("GET", url);
            Http.send(Http.responseText);



        }


        searchMeteo(searchTerm);


        console.log('ci sono');
    }
})
