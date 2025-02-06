const API_URL = "https://apivet-f3bdad4c157d.herokuapp.com/animales";

async function cargarAnimales() {
    const response = await fetch(API_URL);
    const animales = await response.json();

    const lista = document.getElementById("animal-list");
    lista.innerHTML = ""; // Limpiar lista antes de cargar

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

function buscarAnimal() {
    const nombre = document.getElementById("search").value.toLowerCase();
    const tarjetas = document.querySelectorAll(".animal-card");

    tarjetas.forEach(card => {
        const nombreAnimal = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = nombreAnimal.includes(nombre) ? "block" : "none";
    });
}

function confirmarEliminar(id) {
    if (confirm("¿Seguro que quieres eliminar este animal?")) {
        eliminarAnimal(id);
    }
}

async function eliminarAnimal(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    cargarAnimales(); // Recargar lista después de eliminar
}

// Cargar animales al cargar la página
document.addEventListener("DOMContentLoaded", cargarAnimales);
