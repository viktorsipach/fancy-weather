
import { showSpinner } from '../spinner/spinner.components';
import { getUserLocation, getCityLocation, getWeather } from '../../data/api.data'
import { renderInfo } from '../../utils/render.utils'
import { properties }  from '../../constants/constants';


const hideKeyboard = () => {
  const keyboard = document.querySelector('.keyboard')
  keyboard.classList.toggle('hide-keyboard');
}

export const hideContent = () => {
  const container = document.querySelector('.container');
  container.classList.add('hide');
}

export const searchWeather = () => {
  const { value } = document.querySelector('.search-input')
  const info = document.querySelector('.info')
  const lang = document.getElementById('lang').value;
  const keyboard = document.querySelector('.keyboard')
  const isCorrect = /^[0-9.!#$%&'*+/=?^_`{|}~-]+/;

  if (!keyboard.classList.contains('hide-keyboard')) {
    hideKeyboard()
  }

  if (value && !isCorrect.test(value) && value.length > 1) {
    getCityLocation(value,lang).then(location => {
      if (location) {
        getCityLocation(value,lang).then(loc => getWeather(loc,lang))
        .then(response => renderInfo(response,lang))};
      });
    info.innerText = '';
    showSpinner();
  } else {
    getUserLocation().then(loc => getCityLocation(loc,lang)).then(loc => getWeather(loc,lang))
    .then(response => renderInfo(response,lang));
    info.innerText = '';
    showSpinner();
  }      
}

export const translateInput = () => {
  const lang = document.getElementById('lang').value;
  const input = document.querySelector('.search-input')
  const btn = document.querySelector('.search-btn')
  if (lang === 'ru') {
      btn.innerText = 'Поиск';
      input.placeholder = "Поиск города"
  } else if (lang === 'be') {
      btn.innerText = 'Пошук';
      input.placeholder = "Пошук горада"
  } else {
      btn.innerText = 'Search';
      input.placeholder = "Search city";
  }
}

export const addChangeLangHandler = () => {
  const { value } = document.querySelector('.search-input')
  const lang = document.getElementById('lang');
  lang.onchange = () => {
      translateInput()
      searchWeather(value)
  }
}
   
export const addClickKeyboardHandler = () => {
  const icon = document.querySelector('.search-tia')
  icon.addEventListener('click', hideKeyboard)
}
export const addClickSearchHandler = () => {
  const submit = document.querySelector('.search-btn')
  submit.addEventListener('click', (e) => {
      e.preventDefault();
      searchWeather();
  })
}

export const addClickClearHandler = () => {
  const input = document.querySelector('.search-input')
  const clear = document.querySelector('.search-clear')
  clear.addEventListener('click', () => {
      input.value = '';
  })
}

export const addClickBtnCelHandler = () => {
  const btnCel = document.getElementById('cel')
  const btnFar = document.getElementById('far')
  btnCel.addEventListener('click', () => {
    if (btnFar.classList.contains('active')) {
        btnCel.classList.add('active');
        btnFar.classList.remove('active');
        searchWeather();
    }
  })
}

export const addClickBtnFarHandler = () => {
  const btnCel = document.getElementById('cel')
  const btnFar = document.getElementById('far')
  btnFar.addEventListener('click', () => {
    if (btnCel.classList.contains('active')) {
        btnCel.classList.remove('active');
        btnFar.classList.add('active');
        searchWeather();
    }
  })
}

export const saveActiveBtn = () => {
  const btnCel = document.getElementById('cel')
  if (btnCel.classList.contains('active')) {
      localStorage.setItem('btnActive', 'cel'); 
  } else {
      localStorage.setItem('btnActive', 'far'); 
  }
}

const getMessageWeather = () => {
  const ticker = document.querySelector('.ticker').innerText;
  const curWeather = document.querySelectorAll('[data-speak]')
  let message = ''
  curWeather.forEach((el) => {
      message += `${el.innerText},`
  })
  message += ticker;
  return message;
}

export const speakWeather = () => {
  if(window.speechSynthesis) {
    setTimeout(() => {
      const lang = document.getElementById('lang').value;
      const voices = window.speechSynthesis.getVoices()
      const msg = new SpeechSynthesisUtterance()
      let voice = null;
      if (lang === 'en') {
          const ENG_INDEX = 1;
          voice = voices[ENG_INDEX]
          msg.rate = 1.2;
      } else {
          [voice] = voices
          msg.rate = 1.8;
      }
      msg.volume = properties.volume;
      msg.voice = voice;
      msg.text = getMessageWeather()
      window.speechSynthesis.speak(msg)
    },0)
  }
}

export const addClickBtnAudioHandler = () => {
  const btn = document.querySelector('.controls__audio')
  btn.addEventListener('click', speakWeather)
}


