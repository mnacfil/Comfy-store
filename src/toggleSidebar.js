import { getElement } from './utils.js';

const openSidebar = getElement('.toggle-nav')
const closeSidebar = getElement('.sidebar-close')
const sidebarOverlay = getElement('.sidebar-overlay')

openSidebar.addEventListener('click', () => {
    sidebarOverlay.classList.add('show')
})

closeSidebar.addEventListener('click', () => {
    sidebarOverlay.classList.remove('show')
})