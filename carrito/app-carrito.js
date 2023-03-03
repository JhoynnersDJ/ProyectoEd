
const stockProductos = [
  {
    id: 1,
    nombre: "Chorizo Iberico",
    cantidad: 1,
    desc: "Está hecho con carne de cerdo ibérico que se cura mediante un proceso complejo de secado.",
    precio: 10,
    img: "iberico.jpg",
  },
  {
    id: 2,
    nombre: "Chorizo Español",
    cantidad: 1,
    desc: "Es una deliciosa mezcla de carne de cerdo y pimentón Español embutido en tripa natural.",
    precio: 12,
    img: "español.jpg",
  },
    {
    id: 3,
    nombre: "Chorizo Navarra",
    cantidad: 1,
    desc: "Embutido en tripa gorda, al corte, entre rojo y anaranjado, a causa del pimentón.",
    precio: 15,
    img: "navarra.jpg",
  },
    {
    id: 4,
    nombre: "Queso Gouda",
    cantidad: 1,
    desc: "Es un queso de leche de vaca pasteurizada que sobresale por su color amarillento.",
    precio: 5,
    img: "gouda.jpg",
  },
    {
    id: 5,
    nombre: "Queso Emmental",
    cantidad: 1,
    desc: "Es un queso suizo hecho de leche de vaca y con agujeros característicos",
    precio: 7,
    img: "emmental.jpg",
  },
    {
    id: 6,
    nombre: "Queso de Cabra",
    cantidad: 1,
    desc: "Es un tipo de queso con sabor intenso y normalmente su textura es una pasta cremosa.",
    precio: 2,
    img: "cabra.jpg",
  },
    {
    id: 7,
    nombre: "Jamon Serrano",
    cantidad: 1,
    desc: "Es un alimento obtenido a partir de la salazón y secado al aire de las patas traseras del cerdo.",
    precio: 30,
    img: "serrano.jpg",
  },
      {
    id: 8,
    nombre: "Pastrami",
    cantidad: 1,
    desc: "Es un producto de origen animal. Normalmente en su elaboración se emplea falda de ternera, carne roja de vaca.",
    precio: 22,
    img: "pastrami.jpg",
  },
      {
    id: 9,
    nombre: "Jamon de Cerdo",
    cantidad: 1,
    desc: "Es el nombre genérico del producto alimenticio obtenido de las patas traseras del cerdo.",
    precio: 8,
    img: "cerdo.jpg",
  },

];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});
if(formulario){
  formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}$</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn-hover" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if(existe){
    const prod = carrito.map(prod => {
      if(prod.id === id){
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()

};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}$</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}$</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}$</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

 function enviarCompra(e){
   e.preventDefault()
   const cliente = document.querySelector('#cliente').value
   const email = document.querySelector('#correo').value

   if(email === '' || cliente == ''){
     Swal.fire({
       title: "¡Debes completar tu email y nombre!",
       text: "Rellena el formulario",
       icon: "error",
       confirmButtonText: "Aceptar",
   })
 } else {
       Swal.fire({
       title: "Compra realizada con exito",
       text: "Su compra llegará a su destino pronto",
       icon: "success",
       confirmButtonText: "Aceptar",
   })

  
   const spinner = document.querySelector('#spinner')
   spinner.classList.add('d-flex')
   spinner.classList.remove('d-none')

   setTimeout(() => {
     spinner.classList.remove('d-flex')
     spinner.classList.add('d-none')
     formulario.reset()

     const alertExito = document.createElement('p')
     alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
     alertExito.textContent = 'Compra realizada correctamente'
     formulario.appendChild(alertExito)

     setTimeout(() => {
       alertExito.remove()
     }, 3000)


   }, 3000)
 }
 localStorage.clear()

 }

