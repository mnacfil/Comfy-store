// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// specific
import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, getElement, formatPrice } from '../utils.js';

// selections
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
const imgDOM = getElement('.single-product-img');
const titleDOM = getElement('.single-product-title');
const companyDOM = getElement('.single-product-company');
const priceDOM = getElement('.single-product-price');
const colorsDOM = getElement('.single-product-colors');
const descDOM = getElement('.single-product-desc');
const cartBtn = getElement('.addToCartBtn');

// cart product
let productID;

// show product when page loads

window.addEventListener('DOMContentLoaded', async () => {
    const queryId = window.location.search
    const url = `${singleProductUrl}${queryId}`
    const response = await fetch(url)
    if(response.status >= 200 && response.status <= 299) {
        const product = await response.json()
        const {id, fields} = product

        const {company,colors,description,name,price,image :img} = fields
        const image = img[0].thumbnails.large.url

        document.title = `${name} | Comfy`
        pageTitleDOM.textContent = `Home / ${name}`
        imgDOM.src = image
        titleDOM.textContent = name
        companyDOM.textContent = company
        priceDOM.textContent = `${formatPrice(price)}`
        colors.forEach(color => {
            const span = document.createElement('span')
            span.classList.add('product-color')
            span.style.backgroundColor = `${color}`
            colorsDOM.appendChild(span)
        })
        descDOM.textContent = description   
        // cart button
        cartBtn.addEventListener('click', (e) => {
            addToCart(id)
        })
    } else {
        console.log(response.status, response.statusText);
        centerDOM.innerHTML = `<div>
                <h3 class="error>something went wrong</h3>"
                <a href="./index.html" class="btn">back home</a>
            </div>
        `
    }
    loading.style.display = 'none'
})