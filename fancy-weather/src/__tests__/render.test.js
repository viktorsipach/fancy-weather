import { fahrToCel, renderCurIcon, removeMap, renderWind, renderHumidity } from '../js/utils/render.utils'

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

beforeEach(() => {
  document.documentElement.innerHTML = html.toString();
})

describe('fahrToCel', () => {
  beforeEach(() => {
    document.getElementById('cel').classList.add('active')
  })
  it('fahrToCel should return string', () => {
    expect(fahrToCel(54)).toEqual(expect.any(String));
  });
  it('0 fahrenheit to equal -18 celsius', () => {
    expect(fahrToCel(0)).toBe('-18');
  });
  it('32 fahrenheit to equal 0 celsius', () => {
    expect(fahrToCel(32)).toEqual('0');
  });
  it('86 fahrenheit to equal 30 celsius', () => {
    expect(fahrToCel(86)).toEqual('30');
  });
});

describe('renderCurIcon', () => {
  beforeEach(() => {
    renderCurIcon('rain');
  })
  it('current icon exists ', () => {
    const icon = document.querySelector('.icon');
    expect(icon).toBeTruthy()
  })
  it('current icon src should be rain', () => {
    const icon = document.querySelector('.icon');
    expect(icon.src).toBe('http://localhost/assets/img/rain.svg')
  })
})

describe('removeMap', () => {
  beforeEach(() => {
    removeMap();
  })
  it('map not exists ', () => {
    const map = document.querySelector('.map');
    expect(map).toBeFalsy()
  })
  it('map not exists ', () => {
    const map = document.querySelector('.map');
    expect(map).not.toBeTruthy()
  })
})


describe('renderWind', () => {
  beforeEach(() => {
    renderWind(8);
  })
  it('wind to be defined', () => {
    const wind = document.querySelector('.wind');
    expect(wind.innerHTML).toBeDefined()
  })
  it('wind not be undefined', () => {
    const wind = document.querySelector('.wind');
    expect(wind.innerHTML).not.toBeUndefined()
  })
  it('wind to be "Wind: 8 m/s"', () => {
    const wind = document.querySelector('.wind');
    expect(wind.innerHTML).toBe('Wind: 8 m/s')
  })
})

describe('renderHumidity', () => {
  beforeEach(() => {
    renderHumidity(0.6);
  })
  it('humidity to be defined', () => {
    const humidity = document.querySelector('.humidity');
    expect(humidity.innerHTML).toBeDefined()
  })
  it('humidity not be undefined', () => {
    const humidity = document.querySelector('.humidity');
    expect(humidity.innerHTML).not.toBeUndefined()
  })
  it('humidity to be "Humidity: 60%"', () => {
    const humidity = document.querySelector('.humidity');
    expect(humidity.innerHTML).toBe('Humidity: 60%')
  })
})