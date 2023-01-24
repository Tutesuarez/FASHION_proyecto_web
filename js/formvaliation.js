
const formulario = document.getElementById('formulario'),
    inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	surname: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^\d{10}$/, // 7 a 14 numeros.
    address:/^[a-zA-ZÀ-ÿ\s]+[a-zA-Z0-9-.]{1,40}$/,
    city: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    codezip: /^\d{4}$/,
    cardnumber:/^\d{1,16}$/,
    cardtext:/^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    securitycode:/^\d{1,3}$/
}

const field = {
	surname:false,
	name: false,
	mail: false,
	phone: false,
    address:false,
    city: false,
    codezip: false,
    cardnumber:false,
    cardtext:false,
    securitycode:false,
}

const formvalidation=(e)=>{
    switch (e.target.name){
        case'name':
            fieldvalidation(expresiones.name, e.target,'name');
        break;
        case'surname':
        fieldvalidation(expresiones.surname, e.target, 'surname');
        break;
        case'mail':
        fieldvalidation(expresiones.mail, e.target,'mail');
        break;
        case'address':
        fieldvalidation(expresiones.address, e.target,'address');
        break;
        case'phone':
        fieldvalidation(expresiones.phone, e.target,'phone');
        break;
        case'city':
        fieldvalidation(expresiones.city, e.target,'city');
        break;
        case'codezip':
        fieldvalidation(expresiones.codezip, e.target,'codezip');
        break;
        case'cardnumber':
        fieldvalidation(expresiones.cardnumber, e.target,'cardnumber');
        break;
        case'cardtext':
        fieldvalidation(expresiones.cardtext, e.target,'cardtext');
        break;
        //case'expdate':
        //fieldvalidation(expresiones.expdate, e.target,'expdate');
        //break;
        case'securitycode':
        fieldvalidation(expresiones.securitycode, e.target,'securitycode');
        break;      
    }
}

const fieldvalidation=(exp,input,fields)=>{
    if (exp.test(input.value)) {
        field[fields]=true;
        habilitarButton();
    }else{
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
            onClick: function(){} // Callback after click
          }).showToast();
    }
}
// eventos formulario.
inputs.forEach((input)=>{
    input.addEventListener('keyup',formvalidation);
    input.addEventListener('blur',formvalidation);
    
})

function habilitarButton() {
    const cambio= document.querySelector('#formulario button');
(field.address && field.cardnumber && field.cardtext && field.city && field.codezip && field.mail && field.name && field.phone && field.securitycode && field.surname) ? cambio.removeAttribute('disabled') : null;
}
