import { properties }  from '../constants/constants';

const getWeekDay = (date,indexDay,lang) => {
    const daysEng = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const daysRu = ['ВОСКРЕСЕНИЕ', 'ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА'];
    const daysBy = ['НЯДЗЕЛЯ', 'ПАНЯДЗЕЛАК', 'АЎТОРАК', 'СЕРАДА', 'ЧАЦВЕР', 'ПЯТНIЦА', 'СУБОТА'];
    let days = daysEng;  
    if(lang === 'ru') {
      days = daysRu;    
    } 
    if (lang === 'be') {
      days = daysBy;
    } 
    const indexCurrent = date.getDay() + indexDay;
    if(indexCurrent >= days.length) {
      const newIndex = indexCurrent-days.length;
      return days[newIndex];
      } 
    return days[indexCurrent]; 
    }
    
    const getMonth = (date,lang) => {
      const monthsEng = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const monthsRu = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
      const monthsBy = ['Студзеня', 'Лютага', 'Сакавіка', 'Красавіка', 'Траўня', 'Чэрвеня', 'Ліпеня', 'Жніўня', 'Верасня', 'Кастрычніка', 'Лістапада', 'Снежня'];
      let months = monthsEng;
      if(lang === 'ru') {
        months = monthsRu;     
      } 
      if (lang === 'be') {
        months = monthsBy;     
      } 
      const currMonth = date.getMonth(); 
      return months[currMonth]; 
    }

    const updateTime = (zone) => {
      const ONE_SECOND = 1000;
      const lang = document.getElementById('lang').value;
      const time = document.querySelector('.time');
      const optionsDate = {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: `${zone}` };
      if (properties.timeId) {
        clearInterval(properties.timeId)
      }
      properties.timeId = setInterval(() => {
        const date = new Date();
        time.innerText = `${date.toLocaleString(`${lang}`,optionsDate).replace(/,/g,'')}`
      }, ONE_SECOND);
    }
  
    const getCurrentDate = (zone,lang) => {
      const CUR_DAY = 0;
      const date = new Date();
      const optionsDate = {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: `${zone}` };
      const dateCont = document.querySelector('.date');
      const time = document.querySelector('.time');
      const weekday = getWeekDay(date,CUR_DAY,lang);
      const month = getMonth(date,lang);
      time.innerText = `${date.toLocaleString(`${lang}`,optionsDate).replace(/,/g,'')}`
      dateCont.innerText = `${weekday.slice(0,3)} ${date.toLocaleString(`${lang}`,{day: 'numeric'}).replace(/,/g,'')} ${month}`;
      updateTime(zone)
    }
  
    export { getWeekDay,getMonth,getCurrentDate };