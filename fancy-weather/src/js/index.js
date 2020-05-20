import '../css/reset.css';
import '../scss/style.scss';
import { showSpinner } from './components/spinner/spinner.components';
import { Keyboard } from './components/keyboard/keyboard.components';
import { addClickMicHandler } from './components/mic/mic.components'
import {getUrlBg,getUserLocation, getCityLocation, getWeather } from './data/api.data';
import { renderInfo } from './utils/render.utils';


import { 
  addClickSearchHandler, 
  addClickClearHandler, 
  addClickKeyboardHandler, 
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
    Keyboard.addClickKeyboardHandler()
    addClickSearchHandler();
    addClickClearHandler();
    addClickKeyboardHandler();
    addClickMicHandler();
    showSpinner();
    if (localStorage.getItem('lang') === null) {
      document.getElementById('lang').value = 'en';
    }
    else {
      document.getElementById('lang').value = localStorage.getItem('lang')
    }
    
    let lang = document.getElementById('lang').value;
    getUserLocation().then(loc => getCityLocation(loc,lang)).then(loc => getWeather(loc,lang))
    .then(response => renderInfo(response,lang)).then(currWeather => getUrlBg(currWeather));
}
