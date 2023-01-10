const basketContainer = document.querySelector('#basketnumbers');
const totalProcess=document.querySelector('#totalProcess');
const finalCheckOut=document.querySelector('#finalCheckOut');
const formSection=document.querySelector('#formSection');
const buyerName=document.querySelector('#inputName'),
    buyerSurname=document.querySelector('#inputSurname'),
    buyerEmail=document.querySelector('#inputEmail'),
    buyerAddress=document.querySelector('#inputAddress'),
    buyerAddress2=document.querySelector('#inputAddress2'),
    buyerCity=document.querySelector('#inputCity'),
    buyerZip=document.querySelector('#inputZip');
    
const paybutton=document.querySelector('#paybutton');
const cart__section=document.querySelector('#cart__section');
const checkout__section=document.querySelector('#checkout__section');



let buyer=[];

document.addEventListener('DOMContentLoaded',()=>{
    basket=JSON.parse(localStorage.getItem("basket")) || [];
   processOrder();
   showShoppingCart();
});


if (localStorage.getItem("buyer")==true){
    buyer=JSON.parse(localStorage.getItem("buyer"));
}else{
    buyer=[];
};

//Muestra Formularios para terminar la compra. 
finalCheckOut.addEventListener('click',()=>{
    if (basket.length===0){
        alert('Su canasta esta vacia, Asegurese cargar un producto!!');
    }else{
        formSection.classList.remove('d-none');
        location.href='#formSection';
    }
});

// Evento boton de pago
paybutton.addEventListener('click',(e)=>{
    e.preventDefault();
    if(document.getElementById('gridCheck').checked){
    let newBuyer=new buyers(buyerName.value,buyerSurname.value,buyerEmail.value,buyerAddress.value,buyerAddress2.value,buyerCity.value,buyerZip.value)
    console.log(newBuyer);
    creatBuyer(newBuyer);
    saveBuyer(buyers);
    completedPurchase();
    }else{
        alert('problemas gato')
    }
});


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

// constructor de Comprador.
class buyers {
    constructor(buyerName,buyerSurname,buyerEmail,buyerAddress,buyerAddress2,buyerCity,buyerZip){
        this.buyerName=buyerName,
        this.buyerSurname=buyerSurname,
        this.buyerEmail=buyerEmail,
        this.buyerAddress=buyerAddress,
        this.buyerAddress2=buyerAddress2,
        this.buyerCity=buyerCity,
        this.buyerZip=buyerZip;
    }
}

// limpia campos
function inputsCleaner() {
        buyerName.value='',
        buyerSurname.value='',
        buyerEmail.value='',
        buyerAddress.value='',
        buyerAddress2.value='',
        buyerCity.value='',
        buyerZip.value='';
    }

//cargar comprandor en array
function creatBuyer(buyer1) {
    return buyer.push(buyer1);
}

// craga de comprado en local strage
function saveBuyer(el) {
    return localStorage.setItem('buyer',JSON.stringify(el));
}


function completedPurchase() {
    const spinner=document.querySelector('#spinner');
    spinner.classList.add('d-flex');
    spinner.classList.remove('d-none');
    setTimeout(()=>{
        spinner.classList.remove('d-flex');
        spinner.classList.add('d-none');
        successPurchase();
    },4000)
}

function successPurchase() {
    Swal.fire({
        position: '',
        icon: 'success',
        title: 'Thanks for your purchase',
        showConfirmButton: true,
        timer: 4500});

        cart__section.classList.add('d-none');
        checkout__section.classList.add('d-none');
        formSection.classList.add('d-none');
}

//localStorage.removeItem('yourKey');
