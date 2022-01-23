import { formatPrice } from './utils.js';
import { addToCart } from './cart/setupCart.js';

const display = (arrayProducts, element, filters) => {
    element.innerHTML = arrayProducts.map(product => {
        const {name,company,id,image,colors,price} = product
        return `
            <article class="product">
                <div class="product-container">
                    <img src="${image}" class="product-img img" alt=${name}>
                <div class="product-icons">
                    <a href="./product.html?id=${id}" class="product-icon" data-id=${id}>
                        <i class="fas fa-search"></i>
                    </a>
                    <button class="product-cart-btn product-icon" data-id=${id}>
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
                </div>
            <footer>
                <p class="product-name">${name}</p>
                <h4 class="product-price">${formatPrice(price)}</h4>
            </footer>
        </article>
        `
    }).join('')
    if(filters) return
    element.addEventListener('click', e => {
        const cartBtn = e.target.parentElement
        if(cartBtn.classList.contains('product-cart-btn')){
            addToCart(cartBtn.dataset.id)
        }
        
    })
};

export default display;
