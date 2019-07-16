let key = '80a0ba7110302ba21743d6faf99e9041';


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