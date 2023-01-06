const finalCheckOut=document.querySelector('#finalCheckOut');
const formSection=document.querySelector('#formSection');
const buyer={
    
}


//Muestra Formularios para terminar la compra. 
finalCheckOut.addEventListener('click',()=>{
    if (basket.length===0){
        alert('Su canasta esta vacia, Asegurese cargar un producto!!');
    }else{
        formSection.classList.remove('d-none');
        location.href='#formSection';
    }
})