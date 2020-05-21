/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-new */
/* eslint-disable consistent-return */

const errorHandler = (error) => {
    const info = document.querySelector('.info');
    info.innerText = error;
}

const getUrlBg = async (currWeather) => {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature,${currWeather}&client_id=3b23846a5a477d2e20a558a26aa625b0added57e4b20f76775dee5a18b1b4782`;
    try {
      const response = await fetch(url);
      if (response.status === 403) {
        console.clear();
      }
      else if (response.ok) {
        const jsonResponse = await response.json();
        const urlImg = jsonResponse.urls.regular;
        document.querySelector('body').style.backgroundImage = `url(${urlImg}),url('../assets/img/bg.jpg')`;
        document.getElementById('refresh').onclick = () => {
        getUrlBg(currWeather);
        }
      }
    } catch (error) {
        errorHandler(error)
    }
  };
  
  const getUserLocation =  async () => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const urlToFetch = `https://ipinfo.io/json?token=25822ad394c3bf`;
      try {
        const response = await fetch(proxyUrl + urlToFetch);
      if (response.ok) {
        const jsonResponse = await response.json();
        const currentLocation = jsonResponse.loc;
        return currentLocation;
        }   
      } catch (error) {
        errorHandler(error)
      }
  }
  
  const getCityLocation =  async (city,lang) => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const urlToFetch = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=50f19af06b9b4f63b6f5a72b837206db&pretty=1&no_annotations=1&language=${lang}`;
      try {
        const response = await fetch(proxyUrl + urlToFetch);
      if (response.ok) {
        const jsonResponse = await response.json();
        const {lat} = jsonResponse.results[0].geometry;
        const {lng} = jsonResponse.results[0].geometry;
        const cityLoc = `${lat},${lng}`;
        let cityCurrent = jsonResponse.results[0].components.city;
        const {country} = jsonResponse.results[0].components;
        const cityCont = document.querySelector('.city');
        if (!cityCurrent) {
          cityCurrent = '';
        }
        cityCont.innerHTML = `${cityCurrent} ${country}`;
          
        return cityLoc;
        }
        
      } catch (error) {
          errorHandler(error)
      }
  }
  
  const getWeather =  async (location,lang) => {
    if (location) {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = `https://api.darksky.net/forecast/845f34e74cf0b5ee0bfc1da38292e0b2/${location}?lang=${lang}`;
      try {
        const response = await fetch( proxyUrl + url);
        if(response.status === 400) {
          console.clear();
          getWeather(location,lang);
        }
        else if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
        } 
      } catch (error) {
          errorHandler(error)
        }
      }
  }
  
  const initMap = (lng,lat) => {
    const mapCont = document.createElement('div');
    mapCont.id = 'map';
    mapCont.className = 'map';
    document.querySelector('.container').append(mapCont);
    mapboxgl.accessToken = 'pk.eyJ1IjoidmlrdG9yc2lwYWNoIiwiYSI6ImNrM215dTBieDBydDIzZG40d3c1NDdxM3UifQ.OaTpJzjxPC0TVFqjijGiOw';
    const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [lng,lat], // starting position [lng, lat]
    zoom: 10 // starting zoom
    });
    new mapboxgl.Marker()
    .setLngLat([lng,lat])
    .addTo(map)
  }  
       
  export {getUrlBg, getUserLocation, getCityLocation, getWeather, initMap };