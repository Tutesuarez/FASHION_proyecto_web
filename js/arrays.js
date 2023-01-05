
let ourProductsItems=[
    {id: 0,cantidad:1,categoria:'woman',img:'asset/img/pr-01.png',nombre:'Perfume',precio:250},
    {id: 1,cantidad:1,categoria:'woman',img:'asset/img/pr-02.png',nombre:'Handbags',precio:550},
    {id: 2,cantidad:1,categoria:'woman',img:'asset/img/pr-03.png',nombre:'Lipsticks',precio:150},
    {id: 3,cantidad:1,categoria:'woman',img:'asset/img/pr-04.png',nombre:'Watches',precio:600},
    {id: 4,cantidad:1,categoria:'woman',img:'asset/img/pr-05.png',nombre:'Brushes',precio:70},
    {id: 5,cantidad:1,categoria:'woman',img:'asset/img/pr-06.png',nombre:'Sunglasess',precio:300},
    {id: 6,cantidad:1,categoria:'woman',img:'asset/img/pr-07.png',nombre:'Shoes',precio:350},
    {id: 7,cantidad:1,categoria:'woman',img:'asset/img/pr-08.png',nombre:'Jyeweller',precio:800},
    {id: 8,cantidad:1,categoria:'man',img:'asset/img/man-belts.png',nombre:'Belts',precio:250},
    {id: 9,cantidad:1,categoria:'man',img:'asset/img/man-caps.png',nombre:'Caps',precio:100},
    {id: 10,cantidad:1,categoria:'man',img:'asset/img/man-shoes.png',nombre:'Shoes',precio:500},
    {id: 11,cantidad:1,categoria:'man',img:'asset/img/man-long-sleeves.png',nombre:'Sleeves',precio:600},
    {id: 12,cantidad:1,categoria:'man',img:'asset/img/man-t-shirt.png',nombre:'T-Shirts',precio:70},
    {id: 13,cantidad:1,categoria:'man',img:'asset/img/man-sunglasses.png',nombre:'Sunglasess',precio:230},
    {id: 14,cantidad:1,categoria:'man',img:'asset/img/man-watches.png',nombre:'Watches',precio:800},
    {id: 15,cantidad:1,categoria:'man',img:'asset/img/man-wallet.png',nombre:'Wallets',precio:150}
];


let basket=[];

const womanContainer = document.querySelector('#womanProductsContainer');
const manContainer = document.querySelector('#manProductsContainer');
const basketContainer = document.querySelector('#basketnumber');
const emptyCart= document.querySelector('#emptyCart');
const totalPrice=document.querySelector('#totalPrice');
const checkOut=document.querySelector('#checkOut');
const referencia=document.querySelector('#referencia');
const totalProcess=document.querySelector('#totalProcess');


if (referencia) {
    referencia.addEventListener('click',processOrder);
}
    

document.addEventListener('DOMContentLoaded',()=>{
    basket=JSON.parse(localStorage.getItem("basket")) || [];
    if(processOrder){
        document.querySelector('#referencia').click(processOrder);
        }
    showShoppingCart();
});


filterWoman();
//filterMan();

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
        let item = ourProductsItems.find((prod)=>prod.id===id);
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

function filterMan(){
    const resultMan=ourProductsItems.filter((el)=>el.categoria==='man');
    console.log(resultMan);
    //printCards(resultMan,manContainer);
}

function filterWoman(){
    const resultWoman=ourProductsItems.filter((el)=>el.categoria==='woman');
    console.log(resultWoman);
    printCards(resultWoman,womanContainer);
}

function processOrder(){
    basket.forEach((prod)=>{
        const shoppingList=document.querySelector('#shoppingList tbody');
        const {cantidad, img, nombre, precio}=prod;
        const row=document.createElement('tr');
        row.innerHTML +=`
        <td class="col  cart__list-img"><img src='${img}'></td>
        <td class="col cart__list-name"><p>${nombre}</p></td>
        <td class="col"><p>${cantidad}</p></td>
        <td class="col"><p>$${precio}</p></td>
        <td class="col"><p>$${precio*cantidad}</p></td>
        `
        shoppingList.appendChild(row);
    })

    totalProcess.innerText=basket.reduce((acc,prod)=> acc + prod.cantidad*prod.precio,0);
}



