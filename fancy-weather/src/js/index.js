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
  searchWeather
} from './components/app/app.components'


window.onload = () => {
    Keyboard.addElements()
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

    Keyboard.addClickKeyboardHandler()
    addClickSearchHandler();
    addClickClearHandler();
    addClickKeyboardHandler();
    addClickMicHandler();
    addChangeLangHandler();
    showSpinner();
    translateInput();
    searchWeather();
}

window.onbeforeunload = () => {
  localStorage.setItem('lang', document.getElementById('lang').value); 
}
