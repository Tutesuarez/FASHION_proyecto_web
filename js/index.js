const basketContainer = document.querySelector('#basketnumberi');


document.addEventListener('DOMContentLoaded',()=>{
    basket=JSON.parse(localStorage.getItem("basket")) || [];
    showShoppingCart();
    fetchAPI("men's clothing");
});
