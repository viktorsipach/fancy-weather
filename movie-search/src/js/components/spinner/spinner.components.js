import { Spinner } from 'spin.js';

const options = {
    lines: 13, // The number of lines to draw
    length: 38, // The length of each line
    width: 15, // The line thickness
    radius: 45, // The radius of the inner circle
    scale: 0.2, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    color: '#000000', // CSS color or array of colors
    fadeColor: 'transparent', // CSS color or array of colors
    speed: 1, // Rounds per second
    rotate: 0, // The rotation offset
    animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    className: 'spinner__item', // The CSS class to assign to the spinner
    top: '50%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    position: 'absolute' // Element positioning
};

let mySpinner = null;

export const showSpinner = () => {
    const target = document.querySelector('.spinner');
    mySpinner = new Spinner(options).spin(target);
}

export const hideSpinner = () => {
    mySpinner.stop();
}



