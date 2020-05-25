/* eslint-disable no-undef */
/* eslint-disable new-cap */
/* eslint-disable import/prefer-default-export */

import { searchWeather,speakWeather }  from '../app/app.components'
import { properties }  from '../../constants/constants';

const startSpeaking = () => {
    const STOP_ANIMATION = 5000;
    const mic = document.querySelector('.search-mic')
    const input = document.querySelector('.search-input')
    const lang = document.getElementById('lang').value;
    const recognition = new webkitSpeechRecognition();

    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;
    recognition.start();   
    recognition.onresult = (event) => {
        const resultSpeaking  = event.results[0][0].transcript;
        if(resultSpeaking === 'weather' || resultSpeaking === 'погода') {
            speakWeather()
        } else if (resultSpeaking === 'louder' || resultSpeaking === 'громче') {
            const MAX_VOLUME = 1;
            if (properties.volume < MAX_VOLUME) {
                properties.volume += 0.2;
                properties.volume = Number(properties.volume.toFixed(1))
            } 
        } else if (resultSpeaking === 'quieter' || resultSpeaking === 'тише') {
            const MIN_VOLUME = 0.2;
            if (properties.volume > MIN_VOLUME) {
                properties.volume -= 0.2;
                properties.volume = Number(properties.volume.toFixed(1));
            } 
        } else {
            mic.classList.remove('mic-active');
            input.value = resultSpeaking;
            recognition.stop();
            searchWeather();   
        }    
    };   
    setTimeout(() => {
        if (mic.classList.contains('mic-active')) {
            mic.classList.remove('mic-active');
        }
    }, STOP_ANIMATION)
      
};

export const addClickMicHandler = () => {
    const mic = document.querySelector('.search-mic')
    mic.addEventListener('click', () => {
        if (!mic.classList.contains('mic-active') && window.webkitSpeechRecognition) {
            mic.classList.add('mic-active')
            startSpeaking()
        }
    })
}