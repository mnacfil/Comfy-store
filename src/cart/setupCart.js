// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';
import display from '../displayProducts.js';
// set items

const cartItemCountDOM = getElement('.cart-item-count')
const cartItemsDOM = getElement('.cart-items')
const cartTotalDOM = getElement('.cart-total')

let cart = getStorageItem('cart')

export const addToCart = (id) => {
  let item = cart.find(cartItem => cartItem.id === id)

    // if item is not there, then add to cart
  if(!item) {
    let product = findProduct(id)
    product = {...product, amount: 1};
    cart = [...cart, product];
    //add item to the DOM
    addToCartDOM(product)
  } else {
    // update values
    const amount = increaseAmount(id)
    const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')]
    const newAmount = items.find(value => value.dataset.id === id)
    newAmount.textContent = amount
    
  }
  // add one to the item count
  displayCartItemCount()
  // display cart totals
  displayCartTotal()
  // set cart in local storage
  setStorageItem('cart', cart)

  // more stuff coming up
  openCart()
};

function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return total += cartItem.amount
  }, 0)
  cartItemCountDOM.textContent = amount;
}

function displayCartTotal() {
  let total = cart.reduce((total, cartItem) => {
    return total += cartItem.price * cartItem.amount
  }, 0)
  cartTotalDOM.textContent = `Total : ${formatPrice(total)}`
}

function displayCartItemsDOM() {
  cart.forEach(cartItem => {
    addToCartDOM(cartItem)
  })
}

function removeItem(id) {
  cart = cart.filter(cartItem => cartItem.id !== id)
}

function increaseAmount(id) {
    let newAmount;
    cart = cart.map(cartItem => {
    if(cartItem.id === id) {
      newAmount = cartItem.amount + 1
      cartItem = {...cartItem, amount: cartItem.amount + 1}
    }
    return cartItem
  })
  return newAmount
}

function decreaseAmount(id) {
  let newAmount
  cart = cart.map(cartItem => {
    if(cartItem.id === id) {
      newAmount = cartItem.amount - 1
      cartItem = {...cartItem, amount: newAmount};
    }
    return cartItem
  })
  return newAmount
}

function setupCartFunctionality(){
  cartItemsDOM.addEventListener('click', (e) => {
    const element = e.target
    const parent = e.target.parentElement
    const id = e.target.dataset.id
    const parentID = e.target.parentElement.dataset.id
    // remove item on DOM
    if(element.classList.contains('cart-item-remove-btn')) {
      removeItem(id)
      element.parentElement.parentElement.remove()
    }
    // decrease
    if(parent.classList.contains('cart-item-decrease-btn')) {
      const newAmount = decreaseAmount(parentID)
      if(newAmount === 0) {
        // remove if it 0
        removeItem(parentID)
        parent.parentElement.parentElement.remove()
      } else {
        parent.previousElementSibling.textContent = newAmount
      }
    }
    // increase
    if(parent.classList.contains('cart-item-increase-btn')) {
      const newAmount = increaseAmount(parentID)
      parent.nextElementSibling.textContent = newAmount
    }
      // update on DOM
      displayCartItemCount()
      displayCartTotal()
      setStorageItem('cart', cart)
  })
}

// diplay in all pages
const init = () => {
  // display amount of cart items
  displayCartItemCount()
  // diplay total
  displayCartTotal()
  // add all cart items to the dom
  displayCartItemsDOM()
  // setup cart functionality
  setupCartFunctionality()
}

init();