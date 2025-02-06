document.addEventListener("DOMContentLoaded", function () {
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
        console.error("Error al obtener los datos de la API:", error);
    }
}

function mostrarAnimales(animales) {
    const container = document.getElementById("animales-container");
    container.innerHTML = ""; // Limpiar antes de mostrar

    Object.keys(animales).forEach(nombre => {
        const animal = animales[nombre];
        const animalDiv = document.createElement("div");
        animalDiv.classList.add("animal");

        animalDiv.innerHTML = `
            <h3>${nombre}</h3>
            <p><strong>Tipo:</strong> ${animal.tipo}</p>
            <p><strong>Color:</strong> ${animal.color}</p>
            <p><strong>Raza:</strong> ${animal.raza}</p>
            <button class="btn-ver">Ver detalles</button>
            <button class="btn-eliminar" onclick="eliminarAnimal('${nombre}')">Eliminar</button>
        `;

        container.appendChild(animalDiv);
    });
}

async function buscarAnimalPorNombre(nombre) {
    try {
        const response = await fetch(`https://apivet-f3bdad4c157d.herokuapp.com/`);
        const animales = await response.json();

        if (!animales || typeof animales !== "object") {
            console.error("La API no devolvió un objeto válido:", animales);
            return;
        }

        if (animales[nombre]) {
            mostrarAnimales({ [nombre]: animales[nombre] }); // Mostrar solo el animal encontrado
        } else {
            alert("No se encontró el animal con ese nombre.");
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
