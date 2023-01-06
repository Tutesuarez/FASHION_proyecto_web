const basketContainer = document.querySelector('#basketnumbers');
const emptyCart= document.querySelector('#emptyCart');
const totalPrice=document.querySelector('#totalPrice');
const checkOut=document.querySelector('#checkOut');
const referencia=document.querySelector('#referencia');
const totalProcess=document.querySelector('#totalProcess');


const finalCheckOut=document.querySelector('#finalCheckOut');
const formSection=document.querySelector('#formSection');
const buyer=[];

if (referencia) {
    referencia.addEventListener('click',processOrder);
}
    

document.addEventListener('DOMContentLoaded',()=>{
    basket=JSON.parse(localStorage.getItem("basket")) || [];
    //showShoppingCart();
    if(processOrder){
        document.querySelector('#referencia').click(processOrder);
        }
   showShoppingCart();
});


//Muestra Formularios para terminar la compra. 
finalCheckOut.addEventListener('click',()=>{
    if (basket.length===0){
        alert('Su canasta esta vacia, Asegurese cargar un producto!!');
    }else{
        formSection.classList.remove('d-none');
        location.href='#formSection';
    }
});

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

    //savingStorage();
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