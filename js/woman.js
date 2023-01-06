const womanContainer = document.querySelector('#womanProductsContainer');
const basketContainer = document.querySelector('#basketnumberw');
const emptyCart= document.querySelector('#emptyCart');
const totalPrice=document.querySelector('#totalPrice');
const checkOut=document.querySelector('#checkOut');
const referencia=document.querySelector('#referencia');
const totalProcess=document.querySelector('#totalProcess');


document.addEventListener('DOMContentLoaded',()=>{
    basket=JSON.parse(localStorage.getItem("basket")) || [];
    showShoppingCart();
    filterWoman();
});


emptyCart.addEventListener('click',()=>{
    basket.length=[];
    showShoppingCart();
})

checkOut.addEventListener('click',()=>{
    if (basket.length===0){
        alert('Carro vacio');
    }else{
        location.href='shoppingcart.html';
        processOrder();
    }
})

function printCards(ABC,CDE) {

    ABC.forEach((prod)=>{
        const {id,img,nombre,precio} =prod;
        CDE.innerHTML+=
        `<div class="col">
                    <div class="card m-auto shadow-sm">
                        <img class="card-img" src="${img}" alt="perfume">
                        <div class="card-body">
                            <h3>${nombre}</h3>
                            <p>$${precio}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <a class="btn btn-dark" href="detail.html">Details</a>
                                </div>
                                <a class="btn btn-outline-dark" onclick="addProductToBasket(${id})">Add</a>
                            </div>
                        </div>
                    </div>
                </div>`
    })
}

function addProductToBasket(id) {
    const exists=basket.some(prod=>prod.id===id);
    if (exists) {
        const prod = basket.map(prod=>{
            if(prod.id===id){
                prod.cantidad++;
            }
        })
    } else {
        let item = products.find((prod)=>prod.id===id);
        basket.push(item);
    }    
    showShoppingCart();
}

function deleteProduct(id) {
    const productId=id;
    basket=basket.filter((prod)=>prod.id !== productId);
    showShoppingCart();
}

const showShoppingCart = () =>{
    const modalBody = document.querySelector ('.modal .modal-body');
    
    modalBody.innerHTML='';
    basket.forEach((prod) => {
        const {id,cantidad,img,nombre,precio} =prod;
        modalBody.innerHTML+=`
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col modal-img"><img src="${img}" ></div>
                <div class="col modal-name ms-auto">${nombre}</div>
                <div class="col modal-name ms-auto">${cantidad}</div>
                <div class="col modal-name ms-auto">$${precio}</div>
                <div class="col">
                <button type="button" class="btn btn-danger" onclick="deleteProduct(${id})">Delete</button>
                </div>
        </div>
        `
    });

    if (basket.length==0) {
        modalBody.innerHTML=`<p>Your basket is Empty</p>`
    } 

    basketContainer.textContent=basket.length;
    totalPrice.innerText = basket.reduce((acc,prod)=> acc + prod.cantidad*prod.precio,0);

    savingStorage();
}

function savingStorage() {
    localStorage.setItem("basket",JSON.stringify(basket));
}

function filterWoman(){
    products=JSON.parse(localStorage.getItem("products")) || [];
    //const resultWoman=ourProductsItems.filter((el)=>el.categoria==='woman');
    const resultWoman=products.filter((el)=>el.categoria==='woman');
    console.log(resultWoman);
    printCards(resultWoman,womanContainer);
}





