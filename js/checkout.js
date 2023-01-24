const basketContainer = document.querySelector('#basketnumbers'),
    totalProcess = document.querySelector('#totalProcess'),
    finalCheckOut = document.querySelector('#finalCheckOut'),
    formSection = document.querySelector('#formSection');

const buyerName = document.querySelector('#inputName'),
    buyerSurname = document.querySelector('#inputSurname'),
    buyerEmail = document.querySelector('#inputEmail'),
    buyerAddress = document.querySelector('#inputAddress'),
    buyerphone = document.querySelector('#inputphone'),
    buyerCity = document.querySelector('#inputCity'),
    buyerZip = document.querySelector('#inputZip');

const paybutton = document.querySelector('#paybutton'),
    cart__section = document.querySelector('#cart__section'),
    checkout__section = document.querySelector('#checkout__section');

let buyer = [];

document.addEventListener('DOMContentLoaded', () => {
    basket = JSON.parse(localStorage.getItem("basket")) || [];
    showShoppingCart();
    processOrder();
});


if (localStorage.getItem("buyer") == true) {
    buyer = JSON.parse(localStorage.getItem("buyer"));
} else {
    buyer = [];
};

//Muestra Formularios para terminar la compra. 
finalCheckOut.addEventListener('click', () => {
    if (basket.length === 0) {
        alert('Su canasta esta vacia, Asegurese cargar un producto!!');
    } else {
        formSection.classList.remove('d-none');
        location.href = '#formSection';
    }
});

// Evento boton de pago
paybutton.addEventListener('click', (e) => {
    e.preventDefault();
    if (document.getElementById('gridCheck').checked) {
        let newBuyer = new buyers(buyerName.value, buyerSurname.value, buyerEmail.value, buyerAddress.value, buyerphone.value, buyerCity.value, buyerZip.value)
        creatBuyer(newBuyer);
        saveBuyer(buyers);
        completedPurchase();
    } else {
        Swal.fire("You don't look like a robot, please check the box");
    }
});

// renderizacion de la orden de compra.
function processOrder() {
    const shoppingList = document.querySelector('#shoppingList tbody');
    shoppingList.innerHTML = '';
    basket.forEach((prod) => {
        const { cantidad, img, nombre, precio, id } = prod;
        const row = document.createElement('tr');
        row.innerHTML += `
        <td class="col  cart__list-img"><img src='${img}'></td>
        <td class="col cart__list-name"><p>${nombre}</p></td>
        <td class="col"><input class="input_cantidad form-control" type="number" min="1" value="${cantidad}" id="${id}" style="max-width: 60px"></td>
        <td class="col"><p class="input_price">$${precio}</p></td>
        <td class="col"><p class="input_total_price">$${precio * cantidad}</p></td>
        `
        shoppingList.appendChild(row);

    })
    updateProcessTotal();
    shoppingList.addEventListener('change', increaseQuantity);

}

//Funcion sumatoria de total
function updateProcessTotal() {
    basket.forEach((prod) => {
        const shoppingList = document.querySelector('#shoppingList tbody');
        const { cantidad, precio } = prod;
        totalProcess.innerText = basket.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);
    })
}
// Icrementador de contidad de producto
function increaseQuantity(e) {
    const input = e.target;
    input.value <= 0 ? (input.value = 1) : null;

    basket.forEach((prod) => {
        const { cantidad, id } = prod;
        console.log(prod.id);
        (prod.id == e.target.id) ? prod.cantidad = Number(e.target.value) : null;

    })
    processOrder();
    savingStorage();
}


// constructor de Comprador.
class buyers {
    constructor(buyerName, buyerSurname, buyerEmail, buyerAddress, buyerphone, buyerCity, buyerZip) {
        this.buyerName = buyerName,
            this.buyerSurname = buyerSurname,
            this.buyerEmail = buyerEmail,
            this.buyerAddress = buyerAddress,
            this.buyerphone = buyerphone,
            this.buyerCity = buyerCity,
            this.buyerZip = buyerZip;
    }
}

// limpia campos
function inputsCleaner() {
    buyerName.value = '',
        buyerSurname.value = '',
        buyerEmail.value = '',
        buyerAddress.value = '',
        buyerphone.value = '',
        buyerCity.value = '',
        buyerZip.value = '';
}

//cargar comprandor en array
function creatBuyer(buyer1) {
    return buyer.push(buyer1);
}

// craga de comprador en local strage
function saveBuyer(el) {
    return localStorage.setItem('buyer', JSON.stringify(el));
}

//Spinner de compra
function completedPurchase() {
    const spinner = document.querySelector('#spinner');
    spinner.classList.add('d-flex');
    spinner.classList.remove('d-none');
    setTimeout(() => {
        spinner.classList.remove('d-flex');
        spinner.classList.add('d-none');
        successPurchase();
    }, 4000)
}

// Sweet Alert. de compra
function successPurchase() {
    Swal.fire({
        position: '',
        icon: 'success',
        title: 'Thanks for your purchase',
        text: 'You will receive your order in the next 5 business days',
        showConfirmButton: true,
        timer: 5000
    })
        .then((result) => {
            cleanTheStorage();
            location.href = 'index.html';

        })
}

// Limpiamos carrito y datos de comprador del local storage.
function cleanTheStorage() {
    localStorage.removeItem('basket');
    localStorage.removeItem('buyer');
}
