let container = document.querySelector('#container')

const setBackGround = (background) => {
  container.style.background = `url("${window.URL.createObjectURL(background)}") top/cover`
  container.classList.add('after');
  container.innerHTML = ''
}

const setSpinner = () => {
  container.innerHTML = '<i class="fas fa-spinner"></i>'
}

const displayForm = () => {

}

const setDefatulBackground = () => {
  container.classList.add('default');
  container.classList.add('after');
  container.innerHTML = ''
}

export { setBackGround, setSpinner, setDefatulBackground }