import './scss/main.scss'

const hamburger = document.querySelector('.hamburger')
const cartContainer = document.querySelector('.main__cart')
const btnPrev = document.querySelector('.btn-outline')
const btnNext = document.querySelector('.btn-primary')
const btnPanel = document.querySelector('.main__button-panel')
const steps = document.querySelectorAll('.main__stepper-panel__container__step')
const formParts = document.querySelectorAll('.form-part')
const navContainer = document.querySelector('.nav-container')
const modeSwitchBtn = document.querySelector(
  '.nav-wrapper__icons-wrapper--switch'
)
const radioContainer = document.querySelector('.stage-2')
let step = 0

function hamburgerOnClick(e) {
  if (!e.target.classList.contains('hamburger')) {
    return
  }

  if (e.target.classList.contains('hamburger')) {
    navContainer.classList.toggle('d-none')
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

function handleFormPanel(e) {
  e.preventDefault()
  const nowStep = steps[step]
  if (e.target.matches('.btn-primary') && e.target.innerHTML === '下一步') {
    const nextStep = steps[step + 1]
    nowStep.classList.remove('active')
    nowStep.classList.remove('initial')
    nowStep.classList.add('checked')
    nextStep.classList.add('active')
    formParts[step].classList.toggle('d-none')
    formParts[step + 1].classList.toggle('d-none')
    step += 1
  } else if (e.target.matches('.btn-outline')) {
    const prevStep = steps[step - 1]
    if (prevStep === steps[0]) {
      nowStep.classList.remove('active')
      prevStep.classList.remove('checked')
      prevStep.classList.add('initial')
    } else {
      nowStep.classList.remove('active')
      prevStep.classList.remove('checked')
      prevStep.classList.add('active')
    }
    formParts[step].classList.toggle('d-none')
    formParts[step - 1].classList.toggle('d-none')
    step -= 1
  }
  controlBtn()
}

function controlBtn() {
  if (step === 0) {
    btnPrev.classList.add('d-none')
    btnNext.classList.add('first-step')
  } else {
    btnPrev.classList.remove('d-none')
    btnNext.classList.remove('first-step')
  }

  if (step === 2) {
    btnNext.innerHTML = '確認下單'
    btnNext.classList.add('last-step')
  } else {
    btnNext.innerHTML = '下一步'
    btnNext.classList.remove('last-step')
  }
}

function switchMode() {
  const body = document.querySelector('#body')
  const navLogo = document.querySelector('.nav__logo__pic')
  const footerLogo = document.querySelector('.footer__logo__pic')
  const search = document.querySelector('.nav-wrapper__icons-wrapper--search')
  const cart = document.querySelector('.nav-wrapper__icons-wrapper--cart')
  const modeToggle = document.querySelector(
    '.nav-wrapper__icons-wrapper--switch'
  )
  document.body.classList.toggle('dark-theme')
  if (body.classList.contains('dark-theme')) {
    navLogo.src = './public/logo-nightmode@2x.png'
    footerLogo.src = './public/logo-nightmode@2x.png'
    search.src = './public/search-nightmode@2x.png'
    cart.src = './public/shopping-cart-nightmode@2x.png'
    modeToggle.src = './public/sun-icon@2x.png'
    hamburger.src = './public/hamburger-nightmode@2x.png'
  } else {
    navLogo.src = './public/logo-daymode@2x%20(1).png'
    footerLogo.src = './public/logo-daymode@2x%20(1).png'
    search.src = './public/search-daymode.png'
    cart.src = './public/shopping-cart-daymode@2x.png'
    modeToggle.src = './public/moon-icon@2x.png'
    hamburger.src = './public/hamburger@2x.png'
  }
}

function handleDhlFreight(e) {
  const freight = document.querySelector(
    '.main__cart-container__items__freight--total'
  )
  if (e.target.classList.contains('dhl')) {
    freight.innerText = '500'
  }
  if (e.target.classList.contains('standard')) {
    freight.innerText = '免費'
  }
  calculateTotalAmount()
}

function handleRadioBorder(e) {
  const standardRadioWrapper = document.querySelector(
    '#standard-delivery-wrapper'
  )
  const dhlRadioWrapper = document.querySelector('#dhl-delivery-wrapper')
  if (e.target.classList.contains('dhl')) {
    standardRadioWrapper.classList.remove('checked')
    dhlRadioWrapper.classList.add('checked')
  }
  if (e.target.classList.contains('standard')) {
    standardRadioWrapper.classList.add('checked')
    dhlRadioWrapper.classList.remove('checked')
  }
}

hamburger.addEventListener('click', hamburgerOnClick)
cartContainer.addEventListener('click', adjustCartQty)
btnPanel.addEventListener('click', handleFormPanel)
modeSwitchBtn.addEventListener('click', switchMode)
radioContainer.addEventListener('click', handleDhlFreight)
radioContainer.addEventListener('click', handleRadioBorder)
