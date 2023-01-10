
const basketContainer = document.querySelector('#basketnumberd');

document.addEventListener('DOMContentLoaded',()=>{
    basket=JSON.parse(localStorage.getItem("basket")) || [];
    showShoppingCart();
});


