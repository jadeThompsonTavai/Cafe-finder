const API_KEY = AIzaSyDeYMMUrJfFcUCpIipiQzyE1jcRcKzND-4;
const useProxy = true;
const proxy = "https://cors-anywhere.herokuapp.com";


key = API_KEY;

function getLocation() {
    //get device location
    const cache = JSON.parse(localStorage.getItem('cachedLocation') || '{}');
    const now = Date.now();

    //check if any location data cached < 10min ago
    if(cache.timestamp && now - cache.timestamp < 10 * 60 * 1000) {
        useLocation(cache.lat, cache.lng);
    } else {
        //pull current location
        navigator.geolocation.getCurrentPosition(pos => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;

            localStorage.setItem('cachedLocation', JSON.strignify({lat, lng, timestamp: now}));
            useLocation(lat, lng);
        }, () => alert("Location access denied or unavailable."));
    }
}