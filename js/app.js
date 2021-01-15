// const $motherboard = document.querySelector('#1');
// const $monitor = document.querySelector('#2');
// const $placadevideo = document.querySelector('#3');
// const $auriculares = document.querySelector('#4');
// const $microprocesador = document.querySelector('#5');
// const microprocesador1 = document.querySelector('#6');

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaProductos = document.querySelector('#lista-productos');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const $continuarCompra = document.querySelector('#continuar-compra');
let arrayCarrito = [];

// const $detalleMotherboard = document.querySelector('#1');
// const $detalleMonitor = document.querySelector('#2');
// const $detallePlacaDeVideo = document.querySelector('#3');
// const $detalleAuriculares = document.querySelector('#4');
// const $detalleMicroprocesador = document.querySelector('#5');
// const $detalleMicroprocesador1 = document.querySelector('#6');

listaProductos.addEventListener('click', agregarProductos);
carrito.addEventListener('click', eliminarProducto);
vaciarCarrito.addEventListener('click', vaciarProductos);

document.addEventListener('DOMContentLoaded', () => {
  arrayCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

  insertarProducto();
})

function vaciarProductos() {
  borrarHTML()
  arrayCarrito = [];
  guardarStorage();
}

function agregarProductos(e) {
  e.preventDefault();
  if (e.target.classList.contains("btn-shop")) {
    // Selecciono el card del producto sobre el que se hizo click
    const productoSeleccionado = (e.target.parentElement)
    // console.log(productoSeleccionado);
    obtenerDatosDelProducto(productoSeleccionado);
  }
}

function eliminarProducto(e) {
  if (e.target.classList.contains('borrar-producto')) {
    const productoId = e.target.getAttribute('data-id');
    arrayCarrito = arrayCarrito.filter(productos => productos.id !== productoId);
    insertarProducto();
    guardarStorage();
  }
}

function obtenerDatosDelProducto(productos) {
  // Extraer información del producto seleccionado

  const datosDelProducto = {
    imagen: productos.querySelector('.size-imgs').src,
    nombre: productos.querySelector('.productName').textContent,
    valor: productos.querySelector('.price').textContent,
    id: productos.querySelector('button').getAttribute('data-id'),
    cantidad: 1
  }

  // Sumar cantidad de productos que selecciona el usuario

  const existe = arrayCarrito.some(productos => productos.id === datosDelProducto.id)

  if (existe) {
    const producto = arrayCarrito.map(productos => {
      if (productos.id === datosDelProducto.id) {
        productos.cantidad++;
        productos.valor = `$${Number(datosDelProducto.valor.slice(1)) * productos.cantidad}`;
        return productos;
      } else {
        return productos;
      }
    })
    arrayCarrito = [...producto];
  } else {
    arrayCarrito.push(datosDelProducto)
  }

  // Agregar el producto al carrito

  // arrayCarrito = [...arrayCarrito, productoAgregado];
  // arrayCarrito.push(datosDelProducto)

  insertarProducto();

  // console.log(arrayCarrito);
}

// Insertar producto en el HTML

function insertarProducto() {

  borrarHTML();

  arrayCarrito.forEach(producto => {
    // Destructuring sobre el objeto producto
    const { nombre, imagen, valor, cantidad, id } = producto;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${imagen}" width=100>
      </td>
      <td>
        ${nombre}
      </td>
      <td>
        ${valor}
      </td>
      <td>
        ${cantidad}
      </td>
      <td>
        <a href="#" class="borrar-producto" data-id="${id}"><i class="fas fa-trash"></i></a>
      </td>  
    `
    contenedorCarrito.appendChild(row);
  });
  guardarStorage()
}

function guardarStorage() {
  localStorage.setItem('carrito', JSON.stringify(arrayCarrito));
}

function borrarHTML() {
  // contenedorCarrito.innerHTML = '';
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}

// arrayCarrito.push(motherboard, monitor, placadevideo, auriculares, microprocesador, microprocesador1)

$(function () {
  $.ajax({
    url: 'https://my-json-server.typicode.com/Genebson/geneb/db',
    success: function (data) {
      // console.log(data)
    },
    error: function (xhr, status, error) {
      // console.log(xhr)
      // console.log(status)
      // console.log(error)
    }
  })
})

$continuarCompra.onclick = function () {
  location.href = "C:/Users/Mauri/Desktop/Coderhouse/geneb/pages/mi-compra.html"
}

