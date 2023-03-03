const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnChorizo = document.querySelector('.chorizo');
const btnQueso = document.querySelector('.queso');
const btnJamon = document.querySelector('.jamon');
const contenedorPlatillos = document.querySelector('.platillos');
document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    platillos();
});

const eventos = () =>{
    menu.addEventListener('click',abrirMenu);
}

const abrirMenu = () =>{
     navegacion.classList.remove('ocultar');
     botonCerrar();
}

const botonCerrar = () =>{
    const btnCerrar = document.createElement('p');
    const overlay  = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');

    // while(navegacion.children[5]){
    //     navegacion.removeChild(navegacion.children[5]);
    // }
    navegacion.appendChild(btnCerrar);   
    cerrarMenu(btnCerrar,overlay);
    
}

const observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const imagen = entry.target;
                imagen.src = imagen.dataset.src;
                observer.unobserve(imagen);
            }
        }); 
});


imagenes.forEach(imagen=>{
   
    observer.observe(imagen);
});

const cerrarMenu = (boton, overlay) =>{
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');  
        boton.remove();
    }
}

const platillos = () =>{
    let platillosArreglo = [];
    const platillos = document.querySelectorAll('.platillo');

    platillos.forEach(platillo=> platillosArreglo = [...platillosArreglo,platillo]);

    const chorizos = platillosArreglo.filter(chorizo=> chorizo.getAttribute('data-platillo') === 'chorizo');
    const quesos = platillosArreglo.filter(queso => queso.getAttribute('data-platillo') === 'queso');
    const jamones = platillosArreglo.filter(jamon => jamon.getAttribute('data-platillo') === 'jamon');

    mostrarPlatillos(chorizos, quesos, jamones, platillosArreglo);

}

const mostrarPlatillos = (chorizos, quesos, jamones, todos) =>{
    btnChorizo.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        chorizos.forEach(chorizo=> contenedorPlatillos.appendChild(chorizo));
    });

    btnQueso.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
         quesos.forEach(queso=> contenedorPlatillos.appendChild(queso));
    });

    btnJamon.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        jamones.forEach(jamon=> contenedorPlatillos.appendChild(jamon));
    });
    btnTodos.addEventListener('click',()=>{
        limpiarHtml(contenedorPlatillos);
        todos.forEach(todo=> contenedorPlatillos.appendChild(todo));
    });
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}