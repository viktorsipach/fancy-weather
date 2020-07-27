
export const showSpinner = () => {
  const spinner = document.querySelector('.spinner');
  spinner.classList.remove('hide-spinner');
}

export const hideSpinner = () => {
  const spinner = document.querySelector('.spinner');
  spinner.classList.add('hide-spinner');
}



