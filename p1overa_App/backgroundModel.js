const imageMap = {
    'Clear': 'url("assets/clear.jpg")',
    'Rain' : 'url("assets/rainy.jpg")',
    'Snow' : 'url("assets/snow.jpg")',
    'Clouds' : 'url("assets/cloudy.jpg")',
    'Thunderstorm' : 'url("assets/storm.jpg")',
}

export default imageMap;

/*riscrivi switch come oggetto con chiave, valore
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
                            */