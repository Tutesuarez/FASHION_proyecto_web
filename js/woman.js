const womanContainer = document.querySelector('#womanProductsContainer');
const basketContainer = document.querySelector('#basketnumberw');


document.addEventListener('DOMContentLoaded',()=>{
    basket=JSON.parse(localStorage.getItem("basket")) || [];
    showShoppingCart();
    filterWoman();
});

