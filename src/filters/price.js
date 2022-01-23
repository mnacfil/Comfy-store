import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const priceForm = getElement('.price-form')
const priceValue = getElement('.price-value')
const priceRange = getElement('.price-filter')

const setupPrice = (store) => {
    const prices = store.map(product  => product.price)
    let maxPrice = Math.max(...prices)
    maxPrice = Math.ceil(maxPrice / 100)
    priceRange.min = 0
    priceRange.max = maxPrice
    priceRange.value = maxPrice
    priceValue.textContent = `Value: $${maxPrice}`

    priceForm.addEventListener('input', () => {
        let value = parseInt(priceRange.value)
        priceValue.textContent = `Value: $${value}`

        const filterPrice = store.filter(product => {
            const {price} = product
            if((price / 100) <= value) return product
        })
        display(filterPrice, getElement('.products-container'), true)
        if(filterPrice.length < 1) {
            const products = getElement('.products-container')
            products.innerHTML = `<h3 class="filter-error">sorry, no products matched your search</h3>`
        }
    })
};

export default setupPrice;
