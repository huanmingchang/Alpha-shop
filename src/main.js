import './scss/main.scss'

const hamburger = document.querySelector('.hamburger')
const cartContainer = document.querySelector('.main__cart')

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

function adjustCartQty(e) {
  const plusQty = e.target.previousElementSibling
  const minusQty = e.target.nextElementSibling
  if (!e.target.classList.contains('btn')) {
    return
  }
  if (e.target.classList.contains('btn-plus')) {
    plusQty.innerText = Number(plusQty.innerText) + 1
  }
  if (e.target.classList.contains('btn-minus')) {
    minusQty.innerText = Number(minusQty.innerText) - 1
    if (Number(minusQty.innerText) < 0) {
      minusQty.innerText = 0
    }
  }
}

hamburger.addEventListener('click', hamburgerOnClick)
cartContainer.addEventListener('click', adjustCartQty)
