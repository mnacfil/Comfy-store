import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const companies = getElement('.companies')

const setupCompanies = (store) => {
    const company = new Set(store.map(product => product.company))
    const allCompany = ['all', ...company]
    companies.innerHTML = allCompany.map(company => {
        return `<button class="company-btn">${company}</button>`
    }).join('')

    companies.addEventListener('click', e => {
        const chooseCompany = e.target.textContent
        let filterCompany = []
        if(chooseCompany === 'all') {
            filterCompany = store
        } else {
            filterCompany = store.filter(product => {
                return product.company === chooseCompany
            })
        }
        display(filterCompany, getElement('.products-container'), true)
    })
};

export default setupCompanies;
