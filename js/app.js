// const $motherboard = document.querySelector('#1');
// const $monitor = document.querySelector('#2');
// const $placadevideo = document.querySelector('#3');
// const $auriculares = document.querySelector('#4');
// const $microprocesador = document.querySelector('#5');
// const microprocesador1 = document.querySelector('#6');

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaProductos = document.querySelector('#lista-productos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let arrayCarrito = [];

// const $detalleMotherboard = document.querySelector('#1');
// const $detalleMonitor = document.querySelector('#2');
// const $detallePlacaDeVideo = document.querySelector('#3');
// const $detalleAuriculares = document.querySelector('#4');
// const $detalleMicroprocesador = document.querySelector('#5');
// const $detalleMicroprocesador1 = document.querySelector('#6');

listaProductos.addEventListener('click', agregarProductos);

function agregarProductos(e) {
  e.preventDefault();
  if (e.target.classList.contains("btn-shop")) {
    // Selecciono el card del producto sobre el que se hizo click
    const productoSeleccionado = (e.target.parentElement)
    // console.log(productoSeleccionado);
    obtenerDatosDelProducto(productoSeleccionado);
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
        productos.valor = Number(datosDelProducto.valor.slice(1)) * productos.cantidad;
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
        <a href="#" class="borrar-producto" data-id="${id}">X</a>
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

let motherboard = {
  nombre: 'Mother ASUS PRIME Z390-A (8va/9na Gen) S1151',
  id: 1,
  marca: 'ASUS',
  valor: 31999
}

let monitor = {
  nombre: 'Monitor Gamer ASUS VP249QGR 24 144Hz IPS Parlantes HDMI/DP',
  id: 2,
  marca: 'ASUS',
  valor: 49999
}

let placadevideo = {
  nombre: 'Placa de Video MSI Radeon RX5700 Gaming X 8Gb GDDR6',
  id: 3,
  marca: 'MSI',
  valor: 49999
}

let auriculares = {
  nombre: 'Auriculares MSI DS501 Gaming Headset 3.5 PC',
  id: 4,
  marca: 'Logitech',
  valor: 10799
}

let microprocesador = {
  nombre: 'Micro Intel Core I7 9700F OctaCore HT 9va Gen S1151',
  id: 5,
  marca: 'Intel',
  valor: 35999
}

let microprocesador1 = {
  nombre: 'Micro AMD Ryzen 9 3900XT',
  id: 6,
  marca: 'AMD',
  valor: 58999
}

// arrayCarrito.push(motherboard, monitor, placadevideo, auriculares, microprocesador, microprocesador1)