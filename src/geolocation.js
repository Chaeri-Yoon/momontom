const API_KEY = "fc143835e033e035175987058d5bcc98";
const temperature = document.querySelector('.jsTemperature');
const position = document.querySelector('.jsLocation');

function getGeo(){
    navigator.geolocation.getCurrentPosition(getGeoSuccess, getGeoFail);
}
function setGeo(_coordsObj){
    localStorage.setItem('coords', JSON.stringify(_coordsObj));
}
function getGeoSuccess(position){
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    const coordsObj = {lat, lng};
    setGeo(coordsObj);
    getWeather();
}
function getWeather(_lat, _lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${_lat}&lon=${_lng}&appid=${API_KEY}`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temp = Math.ceil(json.main.temp - 273.15);
        const pos = json.name;

        displayWeatherData(temp, pos);
    });
}
function displayWeatherData(_temp, _pos){
    temperature.innerText = `${_temp}˚`;
    position.innerText = _pos;
}
function getGeoFail(){}
function loadCoords(){
    const loadedCoords = localStorage.getItem('coords');
    if(loadedCoords == null)    getGeo();
    else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.lat, parsedCoords.lng);
    }
}
function init(){
    loadCoords();
}
init();