
import { showSpinner } from '../spinner/spinner.components';
import { getUserLocation, getCityLocation, getWeather } from '../../data/api.data'
import { renderInfo } from '../../utils/render.utils'


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
        hideContent();
    } else {
        getUserLocation().then(loc => getCityLocation(loc,lang)).then(loc => getWeather(loc,lang))
        .then(response => renderInfo(response,lang));
        info.innerText = '';
        showSpinner();
        hideContent();
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


