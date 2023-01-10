
const manContainer = document.querySelector('#manProductsContainer');
const basketContainer = document.querySelector('#basketnumber');


document.addEventListener('DOMContentLoaded',()=>{
    basket=JSON.parse(localStorage.getItem("basket")) || [];
    showShoppingCart();
    filterMan();
});

