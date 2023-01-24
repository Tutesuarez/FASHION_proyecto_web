
let basket = [],
    products = [];

const emptyCart = document.querySelector('#emptyCart'),
    totalPrice = document.querySelector('#totalPrice'),
    checkOut = document.querySelector('#checkOut');

//Variable timer seccion Deal
const end = new Date('2/20/2023 9:30 AM');
let second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24,
    timer;

// Eventos para acciones del MOdal
emptyCart.addEventListener('click', () => {
    basket.length = [];
    showShoppingCart();
    processOrder();
});

checkOut.addEventListener('click', () => {
    if (basket.length === 0) {
        alert('Carro vacio');
    } else {
        location.href = 'shoppingcart.html';
        processOrder();
    }
});

//Mostrar carrito en formato Modal
const showShoppingCart = () => {
    const modalBody = document.querySelector('.modal .modal-body');

    modalBody.innerHTML = '';
    basket.forEach((prod) => {
        const { id, cantidad, img, nombre, precio } = prod;
        modalBody.innerHTML += `
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

    if (basket.length == 0) {
        modalBody.innerHTML = `<p>Your basket is Empty</p>`
    }

    basketContainer.textContent = basket.length;
    totalPrice.innerText = basket.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);
    savingStorage();
}
//Funcion eliminar producto del Modal
function deleteProduct(id) {
    const productId = id;
    basket = basket.filter((prod) => prod.id !== productId);
    showShoppingCart();
    processOrder();
}

// Almancenamiento de ourProductsItems en Local Stroage,
// para poder ser llamado dessde diferentes parte de la pagina.
function savingStorage1(objet, arr) {
    localStorage.setItem(objet, JSON.stringify(arr));
}

// Impracieon de cards
function printCards(arr, section) {

    arr.forEach((prod) => {
        const { id, img, nombre, precio } = prod;
        section.innerHTML +=
            `<div class="col">
                    <div class="card m-auto shadow-sm">
                        <img class="card-img" src="${img}" alt="perfume">
                        <div class="card-body">
                            <h3>${nombre}</h3>
                            <p>$${precio}</p>
                            <div class="d-flex justify-content-end align-items-center">
                                <a class="btn btn-outline-dark" onclick="addProductToBasket(${id})">Add</a>
                            </div>
                        </div>
                    </div>
                </div>`
    })
}

// fUNCION FILTADO POR CATEGORIA.
function filter(arr, prodName, position) {
    const result = arr.filter((el) => el.category === prodName);
    printCards(result, position);
}

//Almacenamiento del Basket(Carito en local storage)
function savingStorage() {
    localStorage.setItem("basket", JSON.stringify(basket));
}
//Carga de productos en el Basket.
function addProductToBasket(id) {
    const exists = basket.some(prod => prod.id === id);
    if (exists) {
        const prod = basket.map(prod => {
            if (prod.id === id) {
                prod.cantidad++;
            }
        })
    } else {
        let item = products.find((prod) => prod.id === id);
        basket.push(item);
    }
    showShoppingCart();
}

// Llamo al archivo contenedor de productos json y lo guardio en local storage.
fetch('./data/data.json')
    .then(res => res.json())
    .then(datos => {
        savingStorage1("products", datos);
    });

// Funcion cuenta regresiva para promocion en secciones women, men y kids
function showRemaining() {
    const item = document.querySelector('.countdown');
    let now = new Date();
    let distance = end - now;
    if (distance <= 0) {
        // Hacer desaparecer seccion
        clearInterval(timer);
        return;
    }
    let days = Math.floor(distance / day);
    let hours = Math.floor((distance % day) / hour);
    let minutes = Math.floor((distance % hour) / minute);
    let seconds = Math.floor((distance % minute) / second);

    item.innerHTML = `
        <div class="card col-4 me-md-4">
        <div class="card-body">
            <p class="card-title days number fw-bold m-0">${days}</p>
            <p class="card-text">Days</p>
        </div>
    </div>
    <div class="card col-4 me-md-4">
        <div class="card-body">
            <p class="card-title hours number fw-bold m-0">${hours}</p>
            <p class="card-text">Hours</p>
        </div>
    </div>
    <div class="card col-4 me-md-4">
        <div class="card-body">
            <p class="card-title minutes number fw-bold m-0 ">${minutes}</p>
            <p class="card-text">Minutes</p>
        </div>
    </div>`;

}

// Consumo de un API
async function fetchAPI(cat) {
    const URL = `https://fakestoreapi.com/products/category/${cat}`;
    fetch(URL)
        .then(response => response.json())
        .then(dataProduct => {
            console.log(dataProduct);
            pintarAPI(dataProduct);
        })
}

const pintarAPI = (arr) => {
    const imgAPI = document.querySelector('#imgAPI');
    let html;
    imgAPI.innerHTML = '';
    for (const item of arr) {
        const { image, title } = item;
        html =
            `
            <div class="row container">
                <div class="col d-flex justify-content-center">
                    <img src="${image}" class="card-img m-auto api__img" alt='${title}'>
                </div>
            </div> `
        imgAPI.innerHTML += html;
    }
}
