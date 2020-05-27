import { getWeekDay, getMonth } from '../js/utils/date.utils'


describe('getWeekDay', () => {
  it('weekDay should be "WEDNESDAY"', () => {
    const date = new Date(2020,4,27)
    const indexDay = 0
    const lang = 'en'
    expect(getWeekDay(date,indexDay,lang)).toBe('WEDNESDAY')
  })
  it('weekDay should be "FRIDAY"', () => {
    const date = new Date(2020,4,29)
    const indexDay = 0
    const lang = 'en'
    expect(getWeekDay(date,indexDay,lang)).toBe('FRIDAY')
  })
  it('weekDay should be "СРЕДА"', () => {
    const date = new Date(2020,4,27)
    const indexDay = 0
    const lang = 'ru'
    expect(getWeekDay(date,indexDay,lang)).toBe('СРЕДА')
  })
  it('weekDay should be "ЧЕТВЕРГ"', () => {
    const date = new Date(2020,4,27)
    const indexDay = 1
    const lang = 'ru'
    expect(getWeekDay(date,indexDay,lang)).toBe('ЧЕТВЕРГ')
  })
})

describe('getMonth', () => {
  it('getMonth should be "May"', () => {
    const date = new Date(2020,4,27)
    const lang = 'en'
    expect(getMonth(date,lang)).toBe('May')
  })
  it('getMonth should be length 4', () => {
    const date = new Date(2020,6,29)
    const lang = 'en'
    expect(getMonth(date,lang)).toHaveLength(4)
  })
  it('getMonth should be "Мая"', () => {
    const date = new Date(2020,4,27)
    const lang = 'ru'
    expect(getMonth(date,lang)).toBe('Мая')
  })
  it('getMonth should be "December"', () => {
    const date = new Date(2020,11,27)
    const lang = 'en'
    expect(getMonth(date,lang)).toBe('December')
  })
})