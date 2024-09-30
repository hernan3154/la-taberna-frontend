const url = "https://api-rest-amber-tau.vercel.app/platos";
const contenedor = document.querySelector('tbody');
let resultado = '';

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'));
const formArticulo = document.querySelector('form');
const nombre = document.getElementById('nombre');
const descripcion = document.getElementById('descripcion');
const categoria = document.getElementById('categoria');
const precio = document.getElementById('precio');
const stock = document.getElementById('stock');
const imagen_url = document.getElementById('imagen_url');
const disponible = document.getElementById('disponible');
let opcion = '';

// Selecciona el botón btnCrear
const btnCrear = document.getElementById('btnCrear');

// Abre el modal
btnCrear.addEventListener('click', () => {
    nombre.value = '';
    descripcion.value = '';
    categoria.value = '';
    precio.value = '';
    stock.value = '';
    imagen_url.value = '';
    disponible.checked = false;

    modalArticulo.show();
    opcion = 'crear';
});

// Función para mostrar los resultados
const mostrar = (articulos) => {
    resultado = ''; // Limpiar resultado antes de agregar nuevos datos
    articulos.forEach(articulo => {
        resultado += `
            <tr>
                <td>${articulo.id}</td>
                <td>${articulo.nombre}</td>
                <td>${articulo.descripcion}</td>
                <td>${articulo.precio}</td>
                <td>${articulo.categoria}</td>
                <td>${articulo.stock}</td>
                <td><img src="${articulo.imagen_url}" alt="${articulo.nombre}" style="width: 100px; height: auto;"></td>
                <td>${articulo.disponible}</td>
                <td class='text-center'>
                    <a class='btnEditar btn btn-primary'>Editar</a>
                    <a class='btnBorrar btn btn-danger'>Borrar</a>
                </td>
            </tr>
        `;
    });
    contenedor.innerHTML = resultado;
}

// Procedimiento para mostrar los registros  
fetch(url)
    .then(response => response.json())
    .then(datos => mostrar(datos))
    .catch(error => console.log('Error al obtener los datos:', error));

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
}

on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.closest('tr'); // Usa closest para asegurar que capturas la fila correcta
    const id = fila.querySelector('td').textContent.trim(); // Asegúrate de capturar el ID correctamente

    alertify.confirm(
        "¿Desea eliminar el producto?",
        function () {
            fetch(`${url}/${id}`, {
                method: 'DELETE'
            })
            .then(res => {
                console.log('Respuesta del servidor:', res); // Verifica la respuesta del servidor
                if (!res.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return res.json(); // Asegúra de que la respuesta es JSON
            })
            .then(data => {
                console.log('Producto eliminado:', data); // Verifica los datos devueltos
                location.reload(); // Recarga la página para actualizar la lista
                alertify.success('Producto eliminado correctamente');
            })
            .catch(error => {
                console.error('Error al eliminar el producto:', error);
                alertify.error('No se pudo eliminar el producto');
            });
        },
        function () {
            alertify.error('Cancelado');
        }
    );
});




//Procedimiento Editar
let idForm = 0
on(document, 'click', '.btnEditar', e => {    
    const fila = e.target.closest('tr'); // Usa closest para capturar la fila correcta
    idForm = fila.children[0].textContent.trim(); // Asegúra de capturar el ID correctamente
    const nombreForm = fila.children[1].textContent.trim();
    const descripcionForm = fila.children[2].textContent.trim();
    const precioForm = fila.children[3].textContent.trim();
    const categoriaForm = fila.children[4].textContent.trim();
    const stockForm = fila.children[5].textContent.trim();
    const imagen_urlForm = fila.children[6].querySelector('img').src; // Obtén la URL de la imagen del atributo src
    const disponibleForm = fila.children[7].textContent.trim() === 'Sí'; // Convierte el texto a booleano
    
    nombre.value = nombreForm;
    descripcion.value = descripcionForm;
    precio.value = precioForm;
    stock.value = stockForm;
    categoria.value = categoriaForm;
    imagen_url.value = imagen_urlForm;
    disponible.checked = disponibleForm; // Usa el estado checked para el checkbox
    opcion = 'editar';
    modalArticulo.show();
});


// prosedimiento para Editar y Crear
formArticulo.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion=='crear'){        
        //console.log('OPCION CREAR')
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                nombre:nombre.value,
                descripcion:descripcion.value,
                precio:precio.value,
                stock:stock.value,
                categoria:categoria.value,
                imagen_url:imagen_url.value,
                disponible:disponible.value,


            })
        })
        .then( response => response.json() )
        .then( data => {
            const nuevoArticulo = []
            nuevoArticulo.push(data)
            mostrar(nuevoArticulo)
        })
    }
    if(opcion=='editar'){    
        //console.log('OPCION EDITAR')
        fetch(`${url}/${idForm}`,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                nombre:nombre.value,
                descripcion:descripcion.value,
                precio:precio.value,
                stock:stock.value,
                categoria:categoria.value,
                imagen_url:imagen_url.value,
                disponible:disponible.value,
            })
            
        })
        .then( response => response.json() )
        .then( response => location.reload() )
    }
   
    modalArticulo.hide()
})
