
import { getUrlBg, getCityLocation, getWeather } from '../js/data/api.data';

jest.mock('../js/data/api.data')

describe('getUrlBg', () => {
  it('the fetch resolves', () => {
    return expect(getWeather()).resolves.toBeDefined();
  });
  it('link should to be https://images.unsplash.com/photo', async () => {
    const data = await getUrlBg('Rain');
    expect(data).toBeDefined();
    expect(data).toEqual('https://images.unsplash.com/photo');
    })
})

describe('getCityLocation', () => {
  it('should return location for Minsk', () => {
    return getCityLocation('Minsk')
    .then(data => {
      expect(data).toBeDefined()
      expect(data.Minsk).toEqual('27,53')
    })
  })
  it('should return location for Moscow', async () => {
    const data = await getCityLocation('Moscow');
    expect(data).toBeDefined();
    expect(data.Moscow).toEqual('37,55');
  })
  it('the fetch resolves', () => {
    return expect(getCityLocation('Minsk')).resolves.toBeDefined();
  });
  it('the fetch fails with an error', () => {
    return expect(getCityLocation('')).rejects.toMatch('Error');
  });
})

describe('getWeather', () => {
  it('the fetch resolves', () => {
    return expect(getWeather()).resolves.toBeDefined();
  });
  it('humidity should to equal 0.5', () => {
    return getWeather()
    .then(data => {
      expect(data).toBeDefined()
      expect(data.humidity).toEqual(0.5)
    })
  })
  it('icon should to be cloudy', () => {
    return getWeather()
    .then(data => {
      expect(data).toBeDefined()
      expect(data.icon).toEqual('cloudy')
    })
  })
  it('temperature should to equal 61.58', async () => {
    const data = await getWeather();
    expect(data).toBeDefined();
    expect(data.temperature).toEqual(61.58);
  })
  it('windSpeed should to equal 6.7', async () => {
    const data = await getWeather();
    expect(data).toBeDefined();
    expect(data.windSpeed).toEqual(6.7);
  })
})
