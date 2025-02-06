const API_URL = "https://apivet-f3bdad4c157d.herokuapp.com/animales"; // Asegúrate de que esta es la URL correcta

document.addEventListener("DOMContentLoaded", () => {
    const buscarBtn = document.getElementById("buscarBtn");
    const buscarInput = document.getElementById("buscarNombre");

    if (!buscarBtn || !buscarInput) {
        console.error("No se encontraron los elementos del buscador.");
        return;
    }

    // Cargar todos los animales al inicio
    cargarAnimales();

    // Evento para buscar animales por nombre
    buscarBtn.addEventListener("click", buscarAnimal);
});

// Función para obtener los animales y convertir la respuesta en un array
async function obtenerAnimales() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status}`);
        }

        const data = await response.json();
        console.log("Respuesta de la API:", data);

        // Convertimos el objeto en un array de animales
        return Object.entries(data).map(([nombre, detalles]) => ({
            nombre,
            ...detalles
        }));
    } catch (error) {
        console.error("Error al obtener los animales:", error);
        return [];
    }
}

// Función para cargar todos los animales en la interfaz
async function cargarAnimales() {
    const animales = await obtenerAnimales();
    const lista = document.getElementById("contenedorAnimales"); // Se usa el ID correcto
    lista.innerHTML = ""; // Limpiar lista antes de cargar

    if (animales.length === 0) {
        lista.innerHTML = "<p>No hay animales registrados.</p>";
        return;
    }

    animales.forEach(animal => {
        const div = document.createElement("div");
        div.classList.add("animal");
        div.innerHTML = `
            <h3>${animal.nombre}</h3>
            <p><strong>Tipo:</strong> ${animal.tipo}</p>
            <p><strong>Color:</strong> ${animal.color}</p>
            <p><strong>Raza:</strong> ${animal.raza}</p>
            <div class="actions">
                <button class="btn-ver" onclick="verDetalles('${animal.nombre}')">Ver detalles</button>
                <button class="btn-eliminar" onclick="confirmarEliminar('${animal.nombre}')">Eliminar</button>
            </div>
        `;
        lista.appendChild(div);
    });
}

// Función para buscar un animal por nombre
async function buscarAnimal() {
    const nombreBuscado = document.getElementById("buscarNombre").value.trim().toLowerCase();
    if (nombreBuscado === "") {
        cargarAnimales(); // Si el input está vacío, mostramos todos los animales
        return;
    }

    const animales = await obtenerAnimales();
    const lista = document.getElementById("contenedorAnimales");
    lista.innerHTML = ""; // Limpiar lista antes de mostrar resultados

    const animalEncontrado = animales.find(animal => animal.nombre.toLowerCase() === nombreBuscado);

    if (!animalEncontrado) {
        lista.innerHTML = `<p>No se encontró ningún animal llamado "${nombreBuscado}".</p>`;
        return;
    }

    // Mostrar solo el animal encontrado
    const div = document.createElement("div");
    div.classList.add("animal");
    div.innerHTML = `
        <h3>${animalEncontrado.nombre}</h3>
        <p><strong>Tipo:</strong> ${animalEncontrado.tipo}</p>
        <p><strong>Color:</strong> ${animalEncontrado.color}</p>
        <p><strong>Raza:</strong> ${animalEncontrado.raza}</p>
        <div class="actions">
            <button class="btn-ver" onclick="verDetalles('${animalEncontrado.nombre}')">Ver detalles</button>
            <button class="btn-eliminar" onclick="confirmarEliminar('${animalEncontrado.nombre}')">Eliminar</button>
        </div>
    `;
    lista.appendChild(div);
}

// Función para confirmar la eliminación de un animal
function confirmarEliminar(nombre) {
    const confirmacion = confirm(`¿Seguro que deseas eliminar a ${nombre}?`);
    if (confirmacion) {
        eliminarAnimal(nombre);
    }
}

// Función para eliminar un animal
async function eliminarAnimal(nombre) {
    try {
        const response = await fetch(`${API_URL}/${nombre}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar ${nombre}: ${response.status}`);
        }

        alert(`El animal ${nombre} ha sido eliminado.`);
        cargarAnimales(); // Recargar la lista después de eliminar
    } catch (error) {
        console.error("Error al eliminar el animal:", error);
        alert("No se pudo eliminar el animal. Inténtalo de nuevo.");
    }
}

// Función futura para ver detalles del animal
function verDetalles(nombre) {
    alert(`Aquí se mostrarán los detalles de ${nombre} en el futuro.`);
}
