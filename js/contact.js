const basketContainer = document.querySelector('#basketnumberc');
const sendButton = document.querySelector('#sendButton');
const contactInput = document.querySelectorAll('#formContact input');

document.addEventListener('DOMContentLoaded', () => {
    basket = JSON.parse(localStorage.getItem("basket")) || [];
    showShoppingCart();
});

const exp = {
    contactSurname: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    contactName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    contactEmail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    contactPhone: /^\d{10}$/, // 7 a 14 numeros.
}

const field2 = {
    contactName: false,
    contactSurname: false,
    contactEmail: false,
    contactPhone: false,
}

const formvalidation2 = (e) => {
    switch (e.target.name) {
        case 'contactName':
            fieldvalidation2(exp.contactName, e.target, 'contactName');
            break;
        case 'contactSurname':
            fieldvalidation2(exp.contactSurname, e.target, 'contactSurname');
            break;
        case 'contactEmail':
            fieldvalidation2(exp.contactEmail, e.target, 'contactEmail');
            break;
        case 'contactPhone':
            fieldvalidation2(exp.contactPhone, e.target, 'contactPhone');
            break;
    }
}

const fieldvalidation2 = (exp, input, fields) => {
    if (exp.test(input.value)) {
        field2[fields] = true;
        buttonActive();
    } else {
        Toastify({
            text: "wrong or incomplete field",
            duration: 2000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to left, #a30000, #e60000)",
            },
            onClick: function () { } // Callback after click
        }).showToast();
    }
}

sendButton.addEventListener('click', (e) => {
    e.preventDefault();
    (document.getElementById('gridCheck2').checked) ? successSendcontact() : Swal.fire("You don't look like a robot, please check the box");
});

function buttonActive(params) {
    const cambio = document.querySelector('#formContact button');
    (field2.contactName && field2.contactSurname && field2.contactEmail && field2.contactPhone) ? cambio.removeAttribute('disabled') : null;
}

function successSendcontact() {
    Swal.fire({
        position: '',
        icon: 'success',
        title: 'Thanks for your contact',
        text: 'will be in touch as soon as posible',
        showConfirmButton: true,
        timer: 5000
    })
        .then((result) => {
            location.href = 'index.html';

        })
}
contactInput.forEach((input) => {
    input.addEventListener('keyup', formvalidation2);
    input.addEventListener('blur', formvalidation2);

})