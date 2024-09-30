// Obtener los productos desde el servidor
async function obtenerProductos() {
    try {
        const response = await fetch('https://api-rest-amber-tau.vercel.app/platos');
        const productos = await response.json();
        mostrarProductos(productos);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

// Función para mostrar los productos en el DOM
function mostrarProductos(productos) {
    const productosContainer = document.getElementById('productos-container');
    productosContainer.innerHTML = '';

    productos.forEach(producto => {
        const productoElemento = document.createElement('div');
        productoElemento.classList.add('producto');
        productoElemento.innerHTML = `
            <img src="${producto.imagen_url}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p>${producto.descripcion}</p>
            <p><strong>Precio:</strong> $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio})">Pedir</button>
        `;
        productosContainer.appendChild(productoElemento);
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id, nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = carrito.find(item => item.id === id);

    if (producto) {
        producto.cantidad += 1;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${nombre} añadido al carrito`);
}

// Mostrar los productos del carrito
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.getElementById('carrito-container');
    carritoContainer.innerHTML = '';

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p>El carrito está vacío</p>';
    } else {
        carrito.forEach(item => {
            const itemElemento = document.createElement('div');
            itemElemento.classList.add('carrito-item');
            itemElemento.innerHTML = `
                <h3>${item.nombre}</h3>
                <p>Cantidad: ${item.cantidad}</p>
                <p>Precio: $${item.precio}</p>
                <p>Subtotal: $${(item.cantidad * item.precio).toFixed(2)}</p>
            `;
            carritoContainer.appendChild(itemElemento);
        });
    }
}

// Mostrar u ocultar la sección del carrito
document.getElementById('ver-carrito').addEventListener('click', () => {
    const carritoSection = document.getElementById('carrito-section');
    carritoSection.style.display = 'block'; // Mostrar la sección del carrito
    mostrarCarrito(); // Cargar los productos del carrito
});

// Vaciar el carrito
document.getElementById('vaciar-carrito').addEventListener('click', () => {
    localStorage.removeItem('carrito');
    mostrarCarrito(); // Refrescar la vista del carrito
});

// Cargar productos cuando la página está lista
document.addEventListener('DOMContentLoaded', obtenerProductos);
