const API_URL = "https://apivet-f3bdad4c157d.herokuapp.com/animales"; // Asegúrate de que esta es la URL correcta

// Función para obtener los animales y convertir la respuesta en un array
async function obtenerAnimales() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status}`);
        }

        const data = await response.json(); // Obtener datos de la API
        console.log("Respuesta de la API:", data);

        // Convertimos el objeto en un array de animales
        return Object.entries(data).map(([nombre, detalles]) => ({
            nombre,
            ...detalles
        }));
    } catch (error) {
        console.error("Error al obtener los animales:", error);
        return []; // Devolvemos un array vacío si hay error
    }
}

// Función para cargar todos los animales en la interfaz
async function cargarAnimales() {
    const animales = await obtenerAnimales();
    const lista = document.getElementById("animal-list");
    lista.innerHTML = ""; // Limpiar lista antes de cargar

    if (animales.length === 0) {
        lista.innerHTML = "<p>No hay animales registrados.</p>";
        return;
    }

    animales.forEach(animal => {
        const div = document.createElement("div");
        div.classList.add("animal-card");
        div.innerHTML = `
            <h3>${animal.nombre}</h3>
            <p><strong>Tipo:</strong> ${animal.tipo}</p>
            <p><strong>Color:</strong> ${animal.color}</p>
            <p><strong>Raza:</strong> ${animal.raza}</p>
            <div class="actions">
                <button onclick="verDetalles('${animal.nombre}')">Ver detalles</button>
                <button class="delete-btn" onclick="confirmarEliminar('${animal.nombre}')">Eliminar</button>
            </div>
        `;
        lista.appendChild(div);
    });
}

// Función para buscar un animal por nombre
async function buscarAnimal() {
    const nombreBuscado = document.getElementById("buscar-input").value.trim().toLowerCase();
    if (nombreBuscado === "") {
        cargarAnimales(); // Si el input está vacío, mostramos todos los animales
        return;
    }

    const animales = await obtenerAnimales();
    const lista = document.getElementById("animal-list");
    lista.innerHTML = ""; // Limpiar lista antes de mostrar resultados

    // Filtramos los animales cuyo nombre coincida
    const animalesFiltrados = animales.filter(animal => animal.nombre.toLowerCase().includes(nombreBuscado));

    if (animalesFiltrados.length === 0) {
        lista.innerHTML = `<p>No se encontraron animales con el nombre "${nombreBuscado}".</p>`;
        return;
    }

    animalesFiltrados.forEach(animal => {
        const div = document.createElement("div");
        div.classList.add("animal-card");
        div.innerHTML = `
            <h3>${animal.nombre}</h3>
            <p><strong>Tipo:</strong> ${animal.tipo}</p>
            <p><strong>Color:</strong> ${animal.color}</p>
            <p><strong>Raza:</strong> ${animal.raza}</p>
            <div class="actions">
                <button onclick="verDetalles('${animal.nombre}')">Ver detalles</button>
                <button class="delete-btn" onclick="confirmarEliminar('${animal.nombre}')">Eliminar</button>
            </div>
        `;
        lista.appendChild(div);
    });
}

// Función para confirmar la eliminación de un animal
function confirmarEliminar(nombre) {
    const confirmacion = confirm(`¿Estás seguro de que quieres eliminar a ${nombre}?`);
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

// Llamar a la función al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    cargarAnimales();
    document.getElementById("buscar-btn").addEventListener("click", buscarAnimal);
});

