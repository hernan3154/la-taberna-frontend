document.addEventListener('DOMContentLoaded', () => {
  const contenedorTarjetas = document.getElementById("cart-container");
  const cantidadElement = document.getElementById("cantidad");
  const precioElement = document.getElementById("precio");
  const carritoVacioElement = document.getElementById("carrito-vacio");
  const totalesContainer = document.getElementById("totales");
  const reiniciarBtn = document.getElementById("reiniciar");
  const comprarBtn = document.querySelector('#totales button');

  // Cargar productos desde localStorage
  function cargarProductosDesdeLocalStorage() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
  }

  // Crear tarjetas de productos en el carrito
  function crearTarjetasProductosCarrito() {
    contenedorTarjetas.innerHTML = "";
    const productos = cargarProductosDesdeLocalStorage();

    if (productos.length === 0) {
      carritoVacioElement.style.display = 'block';
      totalesContainer.style.display = 'none';
      return;
    }

    carritoVacioElement.style.display = 'none';
    totalesContainer.style.display = 'block';

    productos.forEach(producto => {
      const nuevaTarjeta = document.createElement("div");
      nuevaTarjeta.classList.add("tarjeta-producto");
      nuevaTarjeta.innerHTML = `
        <img src="${producto.imagen_url}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <span>$${producto.precio}</span>
        <div>
          <button class="restar">-</button>
          <span class="cantidad">${producto.cantidad}</span>
          <button class="sumar">+</button>
        </div>
      `;
      contenedorTarjetas.appendChild(nuevaTarjeta);

      // Evento para disminuir cantidad
      nuevaTarjeta.querySelector('.restar').addEventListener('click', () => {
        if (producto.cantidad > 1) {
          producto.cantidad--;
          actualizarCarritoLocalStorage(producto);
          crearTarjetasProductosCarrito();
          actualizarTotales();
        }
      });

      // Evento para aumentar cantidad
      nuevaTarjeta.querySelector('.sumar').addEventListener('click', () => {
        producto.cantidad++;
        actualizarCarritoLocalStorage(producto);
        crearTarjetasProductosCarrito();
        actualizarTotales();
      });
    });

    actualizarTotales();
  }

  // Actualizar datos en localStorage
  function actualizarCarritoLocalStorage(productoActualizado) {
    let productos = cargarProductosDesdeLocalStorage();
    const index = productos.findIndex(p => p.id === productoActualizado.id);
    if (index !== -1) {
      productos[index] = productoActualizado;
      localStorage.setItem('carrito', JSON.stringify(productos));
    }
  }

  // Actualizar el total de unidades y precios
  function actualizarTotales() {
    const productos = cargarProductosDesdeLocalStorage();
    let cantidad = 0;
    let precio = 0;

    productos.forEach(producto => {
      cantidad += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    });

    cantidadElement.innerText = cantidad;
    precioElement.innerText = `$${precio.toFixed(2)}`;

    comprarBtn.disabled = cantidad === 0;
  }

  // Reiniciar el carrito
  function reiniciarCarrito() {
    localStorage.removeItem('carrito');
    crearTarjetasProductosCarrito();
    actualizarTotales();
  }

  // Muestra u oculta el mensaje de carrito vacío
  function revisarMensajeVacio() {
    const productos = cargarProductosDesdeLocalStorage();
    carritoVacioElement.style.display = productos.length > 0 ? 'none' : 'block';
    totalesContainer.style.display = productos.length > 0 ? 'block' : 'none';
  }

  // Inicializar la página
  crearTarjetasProductosCarrito();
  reiniciarBtn.addEventListener('click', reiniciarCarrito);
});
