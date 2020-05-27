/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */

const data = jest.genMockFromModule('../api.data')

const cities = require('./__mocksData__/cities.json')
const weather = require('./__mocksData__/weather.json')

const link = "https://images.unsplash.com/photo";

const mockGetCityLocationFn = jest.fn().mockImplementation((nameCity) => {
  return new Promise((resolve,reject) => {
    if (nameCity) {
      resolve(cities)
    } else {
      const error = 'Error'
      reject(error)
    }
  })
});

const mockGetWeatherFn = jest.fn().mockImplementation(() => Promise.resolve(weather));
const mockGetUrlBgFn = jest.fn().mockImplementation(() => Promise.resolve(link));
  

data.getCityLocation = mockGetCityLocationFn;
data.getWeather = mockGetWeatherFn;
data.getUrlBg = mockGetUrlBgFn;

module.exports = data;
