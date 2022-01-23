
const allProductsUrl = 'https://course-api.com/javascript-store-products'
// temporary single product
// 'https://course-api.com/javascript-store-single-product?id=rec43w3ipXvP28vog'
const singleProductUrl =
  'https://course-api.com/javascript-store-single-product'

const getElement = (selection) => {
  const element = document.querySelector(selection)
  if (element) return element
  throw new Error(`Please check "${selection}" selector, no such element exist`)
}

const formatPrice = (price) => {
  const formatPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format((price / 100).toFixed(2))
  return formatPrice
}

const getStorageItem = (name) => {
  let storageItem = localStorage.getItem(name)
  if(storageItem) {
    storageItem = JSON.parse(storageItem)
  } else {
    storageItem = []
  }
  return storageItem
}
const setStorageItem = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value))
}

export {
  allProductsUrl,
  singleProductUrl,
  getElement,
  formatPrice,
  getStorageItem,
  setStorageItem,
}
