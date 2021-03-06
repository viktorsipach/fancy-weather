/* eslint-disable import/prefer-default-export */
import { getCurrentDate, getWeekDay } from './date.utils';
import { initMap, getUrlBg } from '../data/api.data';
import { hideSpinner } from '../components/spinner/spinner.components';
import { properties }  from '../constants/constants';


export const fahrToCel = (temp) => {
  if(document.getElementById('cel').classList.contains('active')) {
    const newTemp =  (temp - 32) * 5/9;
    return newTemp.toFixed(0);
  }
  return temp.toFixed(0);
}

const renderCurTemp = ( temp ) => {
  const currentTemp = document.querySelector('.temp__cur');
  const currentTempCel = fahrToCel( temp );
  currentTemp.innerText = `${currentTempCel}°`;
}

export const renderCurIcon = (nameIcon) => {
  const currentCont =  document.querySelector('.current');
  const icon = document.querySelector('.icon')
  if (icon) {
    icon.remove()
  }
  const currentIconCont = document.createElement('img');
  currentIconCont.className = 'icon';
  currentIconCont.src = `./assets/img/${nameIcon}.svg`
  currentCont.append(currentIconCont);
}

const renderSummary = (data) => {
  const summary = document.querySelector('.summary');
  summary.innerHTML = `${data}`
}

const renderFeelsTemp = (data) => {
  const feels = document.querySelector('.feels');
  const feelsTempCel =  fahrToCel(data);
  const lang = document.getElementById('lang').value;
  if (lang === 'en') {
    feels.innerHTML = `Feels like: ${feelsTempCel}°`;
  }
  else if (lang === 'ru') {
    feels.innerHTML = `Ощущается как: ${feelsTempCel}°`;
  }
  else {
    feels.innerHTML = `Адчуваецца як: ${feelsTempCel}°`;
  }
}

export const renderWind = (data) => {
  const wind = document.querySelector('.wind');
  const lang = document.getElementById('lang').value;
  if(lang === 'en') {
    wind.innerHTML = `Wind: ${data.toFixed(0)} m/s`;
  }
  else if (lang === 'ru') {
    wind.innerHTML = `Ветер: ${data.toFixed(0)} м/с`;
  }
  else {
    wind.innerHTML = `Вецер: ${data.toFixed(0)} м/с`;
  }
}

export const renderHumidity = (data) => {
  const humidity = document.querySelector('.humidity');
  const lang = document.getElementById('lang').value;
  if (lang === 'en') {
    humidity.innerHTML = `Humidity: ${(data * 100).toFixed(0)}%`;
  }
  else if (lang === 'ru') {
    humidity.innerHTML = `Влажность: ${(data * 100).toFixed(0)}%`;
  }
  else {
    humidity.innerHTML = `Вільготнасць: ${(data * 100).toFixed(0)}%`;
  }
}

const renderDailyWeather = (temp, indexDay, nameIcon) => {
  const lang = document.getElementById('lang').value;
  const daily = document.querySelector('.daily');
  const day = document.createElement('div');
  const weakDay = getWeekDay(new Date(),indexDay,lang)
  const tempCel = fahrToCel( temp );
  day.className = 'day';
  day.innerHTML = `
  <h3 class="day__name">${weakDay}</h3>
  <img src="./assets/img/${nameIcon}.svg" alt="icon" class="icon-small">
  <p class="day__temp">${tempCel}°</p>`
  daily.append(day);
}

const renderMap = (latitude,longitude) => {
  initMap( longitude,latitude );
  const lang = document.getElementById('lang').value;
  const dataLocation = document.createElement('div');
  dataLocation.className = 'data-location';
  const longitudeCont = document.createElement('p');
  const latitudeCont = document.createElement('p');
  if(lang === 'en') {
    longitudeCont.append(`Longitude: ${Math.floor(longitude)}°${(Math.ceil(longitude.toString(10).slice(2,5) * 60)).toString(10).slice(0,2)}'`);
    latitudeCont.append(`Latitude: ${Math.floor(latitude)}°${(Math.ceil(latitude.toString(10).slice(2,5) * 60)).toString(10).slice(0,2)}'`);
  }
  else if (lang === 'ru') {
    longitudeCont.append(`Долгота: ${Math.floor(longitude)}°${(Math.ceil(longitude.toString(10).slice(2,5) * 60)).toString(10).slice(0,2)}'`);
    latitudeCont.append(`Широта: ${Math.floor(latitude)}°${(Math.ceil(latitude.toString(10).slice(2,5) * 60)).toString(10).slice(0,2)}'`);
  }
  else {
    longitudeCont.append(`Даўгата: ${Math.floor(longitude)}°${(Math.ceil(longitude.toString(10).slice(2,5) * 60)).toString(10).slice(0,2)}'`);
    latitudeCont.append(`Шырата: ${Math.floor(latitude)}°${(Math.ceil(latitude.toString(10).slice(2,5) * 60)).toString(10).slice(0,2)}'`);
  }
  dataLocation.append(longitudeCont);
  dataLocation.append(latitudeCont);
  document.querySelector('.container').append(dataLocation);
}

const renderCity = () => {
  const cityCont = document.querySelector('.city');
  cityCont.innerText = properties.dataCity
}

const removeDaily = () => {
  const dayNodes = document.querySelectorAll('.day')
  if (dayNodes.length) {
    dayNodes.forEach((el) => el.remove())
  }
}

export const removeMap = () => {
  const map = document.querySelector('.map')
  const location = document.querySelector('.data-location')
  if (map) {
    map.remove()
    location.remove()
  } else if (location) {
    location.remove()
  }
}

const showContent = () => {
  const container = document.querySelector('.container');
  const tickerCont = document.querySelector('.ticker');
  container.classList.remove('hide');
  tickerCont.classList.remove('hide');
}

export const hideContent = () => {
  const tickerCont = document.querySelector('.ticker');
  const container = document.querySelector('.container');
  container.classList.add('hide');
  tickerCont.classList.add('hide');
}

const getDataTicker = (data) => {
  const tickerCont = document.querySelector('.ticker');
  const lang = document.getElementById('lang').value;
  let ticker = '';
  data.forEach((el,index) => {
    const weakDay = getWeekDay(new Date(),index,lang)
    ticker += `${weakDay} : ${el.summary} `;
  })
  tickerCont.innerText = ticker;
}

const renderInfo = (jsonResponse,lang) => {
  if (jsonResponse) {
    const LOAD_DATA = 1300;
    const { timezone } = jsonResponse;
    const currentTemp = jsonResponse.currently.temperature;
    const currentIcon = jsonResponse.currently.icon;
    const { summary } = jsonResponse.currently;
    const feelsTemp = jsonResponse.currently.apparentTemperature;
    const wind =  jsonResponse.currently.windSpeed;
    const { humidity } = jsonResponse.currently;
    const firstDayTemp = jsonResponse.daily.data[properties.FIRST_ELEMENT].temperatureMax;
    const firstDayIcon = jsonResponse.daily.data[properties.FIRST_ELEMENT].icon;
    const secondDayTemp = jsonResponse.daily.data[properties.SECOND_ELEMENT].temperatureMax;
    const secondDayIcon= jsonResponse.daily.data[properties.SECOND_ELEMENT].icon;
    const thirdDayTemp = jsonResponse.daily.data[properties.THIRD_ELEMENT].temperatureMax;
    const thirdDayIcon = jsonResponse.daily.data[properties.THIRD_ELEMENT].icon;
    const {latitude} = jsonResponse;
    const {longitude} = jsonResponse;
    getCurrentDate(timezone,lang);
    renderCity()
    renderCurTemp(currentTemp)
    renderCurIcon(currentIcon)
    renderSummary(summary)
    renderFeelsTemp(feelsTemp)
    renderWind(wind)
    renderHumidity(humidity)
    removeDaily()
    renderDailyWeather(firstDayTemp,properties.FIRST_DAY,firstDayIcon)
    renderDailyWeather(secondDayTemp,properties.SECOND_DAY,secondDayIcon)
    renderDailyWeather(thirdDayTemp,properties.THIRD_DAY,thirdDayIcon)
    removeMap()
    renderMap(latitude, longitude)
    hideSpinner()
    hideContent()
    getDataTicker(jsonResponse.daily.data)
    getUrlBg(summary)
    setTimeout(showContent,LOAD_DATA)
   
    return summary;
}
  return null;
}

export { renderInfo };