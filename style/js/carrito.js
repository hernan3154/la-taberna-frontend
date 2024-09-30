const cuentaCarritoElement = document.getElementById("cuenta-carrito");

/** Toma un objeto producto o un objeto con al menos un ID y lo agrega al carrito */
function agregarAlCarrito(producto) {
  // Revisar si el producto está en el carrito.
  let memoria = JSON.parse(localStorage.getItem("productos")) || [];
  let cantidadProductoFinal;
  
  // Si no hay localstorage lo creo
  if (memoria.length === 0) {
    const nuevoProducto = getNuevoProductoParaMemoria(producto);
    memoria.push(nuevoProducto);
    cantidadProductoFinal = 1;
  } else {
    // Si hay localstorage, verificar si el artículo ya está ahí
    const indiceProducto = memoria.findIndex(item => item.id === producto.id);
    
    // Si el producto no está en el carrito, lo agrego
    if (indiceProducto === -1) {
      const nuevoProducto = getNuevoProductoParaMemoria(producto);
      memoria.push(nuevoProducto);
      cantidadProductoFinal = 1;
    } else {
      // Si el producto está en el carrito, le agrego 1 a la cantidad.
      memoria[indiceProducto].cantidad++;
      cantidadProductoFinal = memoria[indiceProducto].cantidad;
    }
  }
  
  localStorage.setItem("productos", JSON.stringify(memoria));
  actualizarNumeroCarrito();
  return cantidadProductoFinal;
}

/** Resta una unidad de un producto del carrito */
function restarAlCarrito(producto) {
  let memoria = JSON.parse(localStorage.getItem("productos")) || [];
  const indiceProducto = memoria.findIndex(item => item.id === producto.id);
  
  if (indiceProducto !== -1) {
    memoria[indiceProducto].cantidad--;
    if (memoria[indiceProducto].cantidad === 0) {
      memoria.splice(indiceProducto, 1);
    }
    localStorage.setItem("productos", JSON.stringify(memoria));
    actualizarNumeroCarrito();
  }
}

/** Agrega cantidad a un objeto producto */
function getNuevoProductoParaMemoria(producto) {
  const nuevoProducto = { ...producto, cantidad: 1 }; // Clonar el objeto producto y agregar cantidad
  return nuevoProducto;
}

/** Actualiza el número del carrito del header */
function actualizarNumeroCarrito() {
  let cuenta = 0;
  const memoria = JSON.parse(localStorage.getItem("productos"));
  
  if (memoria) {
    cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
    cuentaCarritoElement.innerText = cuenta;
  } else {
    cuentaCarritoElement.innerText = 0;
  }
}

/** Reinicia el carrito */
function reiniciarCarrito() {
  localStorage.removeItem("productos");
  actualizarNumeroCarrito();
}

// FUNCION PARA MANEJAR LA CONFIRMACION DEL PEDIDO


actualizarNumeroCarrito();
