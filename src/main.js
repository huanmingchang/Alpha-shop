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
  calculateTotalAmount()
}

function calculateTotalAmount() {
  const qtyArr = document.querySelectorAll(
    '.main__cart-container__items__product-info-wrapper--modifier--qty'
  )
  const priceArr = document.querySelectorAll(
    '.main__cart-container__items__product-info-wrapper--price'
  )
  const freight = Number(
    document
      .querySelector('.main__cart-container__items__freight--total')
      .innerText.replace(/[^0-9]+/g, '')
  )
  const total = document.querySelector(
    '.main__cart-container__items__subtotal--total'
  )
  const qty = []
  const price = []
  let sum = 0

  qtyArr.forEach((element) => qty.push(Number(element.innerText)))
  priceArr.forEach((element) =>
    price.push(Number(element.innerText.replace(/[^0-9]+/g, '')))
  )

  for (let i = 0; i < qty.length; i++) {
    sum += qty[i] * price[i]
  }

  sum += freight
  total.innerText =
    '$' + sum.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
}

hamburger.addEventListener('click', hamburgerOnClick)
cartContainer.addEventListener('click', adjustCartQty)
