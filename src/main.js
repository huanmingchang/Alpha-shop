import './scss/main.scss'

const hamburger = document.querySelector('.hamburger')

// TODO  visibility 切換問題
function hamburgerOnClick(e) {
  const navWrapper = document.querySelector('.nav-wrapper')
  if (!e.target.classList.contains('hamburger')) {
    return
  }

  if (e.target.classList.contains('hamburger')) {
    if (navWrapper.style.visibility === 'hidden') {
      navWrapper.style.visibility = 'visible'
    } else {
      navWrapper.style.visibility = 'hidden'
    }
  }
}

hamburger.addEventListener('click', hamburgerOnClick)
