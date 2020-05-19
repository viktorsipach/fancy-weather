
import { hideSpinner  } from '../components/spinner/spinner.components';

const errorHandler = (error) => {
    const info = document.querySelector('.info');
    info.innerText = error;
}

