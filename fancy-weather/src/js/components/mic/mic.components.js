/* eslint-disable no-undef */
/* eslint-disable new-cap */
/* eslint-disable import/prefer-default-export */

import { searchMovie }  from '../app/app.components'


const startSpeaking = () => {
    const STOP_ANIMATION = 5000;
    const mic = document.querySelector('.search-mic')
    const input = document.querySelector('.search-input')
    const recognition = new webkitSpeechRecognition();

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;
    recognition.start();   
    recognition.onresult = (event) => {
        const resultSpeaking  = event.results[0][0].transcript;
        mic.classList.remove('mic-active');
        input.value = resultSpeaking;
        recognition.stop();
        searchMovie();   
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