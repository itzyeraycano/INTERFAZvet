document.addEventListener("DOMContentLoaded", function () {
    cargarAnimales(); // Cargar todos los animales al cargar la página

    // Escuchar el evento de clic en el botón de buscar
    document.getElementById("buscarBtn").addEventListener("click", function () {
        const nombre = document.getElementById("buscarNombre").value.trim();
        if (nombre) {
            buscarAnimalPorNombre(nombre); // Buscar por nombre
        } else {
            cargarAnimales(); // Si el campo está vacío, mostrar todos los animales
        }
    });
});

// Función para cargar todos los animales
function cargarAnimales() {
    fetch("https://apivet-f3bdad4c157d.herokuapp.com/animales")
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                mostrarAnimales(data); // Si los datos son un array, mostramos todos
            } else {
                console.error("La API no devolvió un array:", data);
                mostrarAnimales([]); // Si no es un array, mostramos nada
            }
        })
        .catch(error => console.error("Error al cargar animales:", error));
}

// Función para buscar un animal por nombre
function buscarAnimalPorNombre(nombre) {
    fetch(`https://apivet-f3bdad4c157d.herokuapp.com/animales?nombre=${nombre}`)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                mostrarAnimales(data); // Mostrar solo el animal que coincide
            } else {
                console.log("No se encontraron animales con ese nombre.");
                mostrarAnimales([]); // Mostrar nada si no se encuentra
            }
        })
        .catch(error => console.error("Error al buscar el animal:", error));
}

// Función para mostrar los animales
function mostrarAnimales(animales) {
    const contenedor = document.getElementById("contenedorAnimales");
    contenedor.innerHTML = ''; // Limpiar antes de añadir nuevos animales

    if (animales.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron animales.</p>';
    }

    animales.forEach(animal => {
        const div = document.createElement("div");
        div.classList.add("animal");
        div.innerHTML = `
            <h3>${animal.nombre}</h3>
            <p>Tipo: ${animal.tipo}</p>
            <p>Color: ${animal.color}</p>
            <p>Raza: ${animal.raza}</p>
            <button class="verDetallesBtn">Ver detalles</button>
            <button class="eliminarBtn" onclick="eliminarAnimal('${animal.nombre}')">Eliminar</button>
        `;
        contenedor.appendChild(div);
    });
}

// Función para eliminar un animal
function eliminarAnimal(nombre) {
    const confirmarEliminacion = confirm(`¿Seguro que quieres eliminar al animal ${nombre}?`);
    if (confirmarEliminacion) {
        fetch(`https://apivet-f3bdad4c157d.herokuapp.com/animales/${nombre}`, {
            method: "DELETE",
        })
            .then(response => {
                if (response.ok) {
                    alert(`Animal ${nombre} eliminado.`);
                    cargarAnimales(); // Recargar la lista de animales
                } else {
                    alert(`Error al eliminar el animal ${nombre}.`);
                }
            })
            .catch(error => console.error("Error al eliminar animal:", error));
    }
}

