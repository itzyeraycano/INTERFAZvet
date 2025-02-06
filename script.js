ddocument.addEventListener("DOMContentLoaded", function () {
    cargarAnimales();

    document.getElementById("buscarBtn").addEventListener("click", function () {
        const nombre = document.getElementById("buscarNombre").value.trim();
        if (nombre) {
            buscarAnimalPorNombre(nombre);
        } else {
            cargarAnimales(); // Si el campo está vacío, mostrar todos los animales
        }
    });
});

async function cargarAnimales() {
    try {
        const response = await fetch("https://apivet-f3bdad4c157d.herokuapp.com/");
        const animales = await response.json();

        if (!animales || typeof animales !== "object") {
            console.error("La API no devolvió un objeto válido:", animales);
            return;
        }

        mostrarAnimales(animales);
    } catch (error) {
        console.error("Error al cargar animales:", error);
    }
}

function mostrarAnimales(animales) {
    const container = document.getElementById("animales-container");

    if (!container) {
        console.error("No se encontró el contenedor #animales-container.");
        return;
    }

    container.innerHTML = ""; // Limpiar antes de mostrar

    const nombres = Object.keys(animales);

    if (nombres.length === 0) {
        container.innerHTML = "<p>No hay animales registrados.</p>";
        return;
    }

    nombres.forEach(nombre => {
        const animal = animales[nombre];
        const animalDiv = document.createElement("div");
        animalDiv.classList.add("animal");

        animalDiv.innerHTML = `
            <h3>${nombre}</h3>
            <p><strong>Tipo:</strong> ${animal.tipo}</p>
            <p><strong>Color:</strong> ${animal.color}</p>
            <p><strong>Raza:</strong> ${animal.raza}</p>
            <div class="botones">
                <button onclick="verDetalles('${nombre}')">Ver detalles</button>
                <button onclick="eliminarAnimal('${nombre}')">Eliminar</button>
            </div>
        `;

        container.appendChild(animalDiv);
    });
}

async function buscarAnimalPorNombre(nombre) {
    try {
        const response = await fetch("https://apivet-f3bdad4c157d.herokuapp.com/");
        const animales = await response.json();

        if (!animales || typeof animales !== "object") {
            console.error("La API no devolvió un objeto válido:", animales);
            return;
        }

        if (animales[nombre]) {
            mostrarAnimales({ [nombre]: animales[nombre] }); // Mostrar solo el animal encontrado
        } else {
            alert("No se encontraron animales con ese nombre.");
            cargarAnimales(); // Si no existe, vuelve a mostrar todos
        }
    } catch (error) {
        console.error("Error al buscar el animal:", error);
    }
}

function eliminarAnimal(nombre) {
    const confirmacion = confirm(`¿Seguro que deseas eliminar a ${nombre}?`);
    if (confirmacion) {
        fetch(`https://apivet-f3bdad4c157d.herokuapp.com/${nombre}`, {
            method: "DELETE",
        })
            .then(response => {
                if (response.ok) {
                    alert(`El animal ${nombre} ha sido eliminado.`);
                    cargarAnimales();
                } else {
                    alert("Error al eliminar el animal.");
                }
            })
            .catch(error => console.error("Error al eliminar el animal:", error));
    }
}

function verDetalles(nombre) {
    alert(`Aquí se mostrarán los detalles de ${nombre} en el futuro.`);
}
