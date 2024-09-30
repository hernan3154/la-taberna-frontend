document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://api-rest-amber-tau.vercel.app/platos'; // Asegúrate de que el apiUrl esté correcto
    //const container = document.getElementById('productos-container'); // Define el contenedor aquí
    const container = document.createElement('div')

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (container) {
                data.forEach(plato => {
                    const card = document.createElement('div'); // Crea un nuevo div para la tarjeta
                    card.className = 'col-md-4 mb-4'; // Clase Bootstrap para columnas

                    card.innerHTML = `
                        <div class="card h-100">
                            <img src="${plato.imagen_url}" class="card-img-top" alt="${plato.nombre}">
                            <div class="card-body text-center d-flex flex-column align-items-center">
                                <h2 class="card-title">${plato.nombre}</h2>
                                <p class="card-text">${plato.descripcion}</p>
                                <p>Categoría: ${plato.categoria}</p>
                                <p>Precio: $${plato.precio}</p>
                                <p>Disponible: ${plato.disponible > 0 ? 'Sí' : 'No'}</p>

                                <div class="counter">
                                    <button class="btn btn-secondary decrement">-</button>
                                    <input type="number" class="form-control quantity" value="1" min="1" readonly>
                                    <button class="btn btn-secondary increment">+</button>
                                </div>

                                <a href="#" class="btn btn-primary mt-auto pedir-btn">Pedir</a>
                            </div>
                        </div>
                    `;

                    container.appendChild(card); // Agrega la tarjeta al contenedor
                });
            }
        });
        
        //document.body.appendChild(container); // Agrega el contenedor al cuerpo del documento

});
