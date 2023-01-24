
const manContainer = document.querySelector('#manProductsContainer');
const basketContainer = document.querySelector('#basketnumber');


document.addEventListener('DOMContentLoaded',()=>{
    basket=JSON.parse(localStorage.getItem("basket")) || [];
    products = JSON.parse(localStorage.getItem("products")) || [];
    showShoppingCart();
    filter(products,'man',manContainer);
    timer = setInterval(showRemaining, 1000);
});

