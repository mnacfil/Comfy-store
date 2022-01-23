import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const inputForm = getElement('.input-form')
let inputValue = getElement('.search-input')

const setupSearch = (products) => {
    inputForm.addEventListener('keyup', () => {
        let value = inputValue.value
        value = value.toLowerCase()
        if(value) {
            const searchCompany = products.filter(product => {
                let {name} = product
                name = name.toLowerCase()
                if(name.startsWith(value)) return product
            })
            display(searchCompany, getElement('.products-container'))
            // if no search match on the products
            if(searchCompany.length < 1) {
                const products = getElement('.products-container')
                products.innerHTML = `<h3 class="filter-error">
                    sorry, no products matched your search
                </h3>`
            }
        } else {
            display(products, getElement('.products-container'), true)
        }
    })

};

export default setupSearch;
