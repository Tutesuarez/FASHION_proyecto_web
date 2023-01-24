const kidsContainer = document.querySelector('#kidsProductsContainer');
const basketContainer = document.querySelector('#basketnumberk');

document.addEventListener('DOMContentLoaded',()=>{
    basket=JSON.parse(localStorage.getItem("basket")) || [];
    products = JSON.parse(localStorage.getItem("products")) || [];
    showShoppingCart();
    filter(products,'kids',kidsContainer);
    timer = setInterval(showRemaining, 1000);
});

