import '../css/reset.css';
import '../scss/style.scss';
import { showSpinner } from './components/spinner/spinner.components';
import { Keyboard } from './components/keyboard/keyboard.components';
import { addClickMicHandler } from './components/mic/mic.components'

import { 
  addClickSearchHandler, 
  addClickClearHandler, 
  addClickKeyboardHandler, 
  addChangeLangHandler,
  translateInput,
  searchWeather,
  addClickBtnCelHandler,
  addClickBtnFarHandler,
  saveActiveBtn 
} from './components/app/app.components'

const startSetting = () => {
  const btnCel = document.getElementById('cel')
  const btnFar = document.getElementById('far')
  if (localStorage.getItem('rusLang') === 'null') {
    Keyboard.createKeys(Keyboard.alphabet.eng)
  } else if (localStorage.getItem('rusLang') === 'false') {
    Keyboard.createKeys(Keyboard.alphabet.rus)
  } else {
    Keyboard.createKeys(Keyboard.alphabet.eng)
  }

  if (localStorage.getItem('lang') === null) {
    document.getElementById('lang').value = 'en';
  }
  else {
    document.getElementById('lang').value = localStorage.getItem('lang')
  }

  if (localStorage.getItem('btnActive') === null || localStorage.getItem('btnActive') === 'cel') {
    btnCel.classList.add('active');
  }
  else {
    btnFar.classList.add('active');
  }
}

window.onload = () => {
    Keyboard.addElements()
    Keyboard.addClickKeyboardHandler()
    startSetting()
    addClickSearchHandler();
    addClickClearHandler();
    addClickKeyboardHandler();
    addClickMicHandler();
    addChangeLangHandler();
    addClickBtnCelHandler();
    addClickBtnFarHandler();
    showSpinner();
    translateInput();
    searchWeather();
}

window.onbeforeunload = () => {
  saveActiveBtn()
  localStorage.setItem('lang', document.getElementById('lang').value); 
}
