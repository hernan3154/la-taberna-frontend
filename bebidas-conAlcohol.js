const contenedorTarjetas = document.getElementById("productos-container");

// Función para cargar los productos desde la API
async function cargarBebidasAlcolicas() {
    try {
        const response = await fetch('https://api-rest-amber-tau.vercel.app/conAlcohol');
        //const productos = await response.json();
        const bebidasAcoli = await response.json();

        // Llamar a la función que crea las tarjetas de productos con los datos obtenidos de la API
        crearTarjetasBebidasAlcolicas(bebidasAcoli);
    } catch (error) {
        console.error('Error al obtener los productos de la API:', error);
    }
}

/** Crea las tarjetas de productos teniendo en cuenta los datos obtenidos de la API */
function crearTarjetasBebidasAlcolicas(bebidasAcoli) {
    contenedorTarjetas.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevas tarjetas

    bebidasAcoli.forEach(producto => {
        const nuevaTarjeta = document.createElement("div");
        nuevaTarjeta.classList.add("card", "mb-4"); // Clases de Bootstrap para tarjetas
        nuevaTarjeta.style.width = '18rem'; // Ajustar el ancho de la tarjeta si es necesario
        nuevaTarjeta.innerHTML = `
        <img src="${producto.imagen_url}" class="card-img-top espacio-imagen" alt="${producto.nombre}">
        <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text"> Precio: $${producto.precio}</p>
        <p class="card-text"> Descripcion: ${producto.descripcion}</p>
        <p class="card-text">IBU: ${producto.graduacion_alcoholica}</p>
        <button class="btn btn-primary" data-id="${producto.id}">Agregar al carrito</button>
        </div>
    `;
        contenedorTarjetas.appendChild(nuevaTarjeta);

        // Añadir el producto al carrito cuando se haga clic en el botón
        nuevaTarjeta.querySelector("button").addEventListener("click", () => {
            console.log(`Agregando al carrito: ${producto.nombre}`); // Depuración
            agregarAlCarrito(producto);
        });
    });
}
// Función para agregar productos al carrito (puedes ajustarla según tu lógica actual)
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const index = carrito.findIndex(item => item.id === producto.id);

    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarNumeroCarrito();  // Actualiza el número en el carrito
}

// Función para actualizar el número de productos en el carrito
function actualizarNumeroCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const cantidad = carrito.reduce((total, item) => total + item.cantidad, 0);
    document.getElementById("cuenta-carrito").textContent = cantidad;
}

// Llamar a la función que carga los productos desde la API al cargar la página
cargarBebidasAlcolicas();
