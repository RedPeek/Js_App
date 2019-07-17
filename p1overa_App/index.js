let key = 'd999a578d6d8fff8855a42b1525503a5';

//date to be continued
const options = {weekday : 'long', day : 'numeric', month : 'short'};
const today = new Date();
document.getElementById('date').innerHTML = today;

function showDrpDown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById("myDropdown");
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
    }
  }

  function getLocation(){
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
}