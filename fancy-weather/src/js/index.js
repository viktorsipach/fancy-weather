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
  addClickBtnAudioHandler,
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
  addClickBtnAudioHandler();
  showSpinner();
  translateInput();
  searchWeather();
  // eslint-disable-next-line no-console
  console.log(`Чтобы проверить голосовое сообщение включите микрофон и скажите "погода" или "weather".
  Для звука "тише, громче" и "louder, quieter".
  'Background-image' по запросу текущей погоды.
  `)
}

window.onbeforeunload = () => {
  saveActiveBtn()
  localStorage.setItem('lang', document.getElementById('lang').value); 
}
