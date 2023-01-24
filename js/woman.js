const womanContainer = document.querySelector('#womanProductsContainer');
const basketContainer = document.querySelector('#basketnumberw');


document.addEventListener('DOMContentLoaded',()=>{
    basket=JSON.parse(localStorage.getItem("basket")) || [];
    products = JSON.parse(localStorage.getItem("products")) || [];
    showShoppingCart();
    filter(products,'woman',womanContainer);
    timer = setInterval(showRemaining, 1000);
});

