const basketContainer = document.querySelector('#basketnumberk');


document.addEventListener('DOMContentLoaded',()=>{
    basket=JSON.parse(localStorage.getItem("basket")) || [];
    showShoppingCart();
});