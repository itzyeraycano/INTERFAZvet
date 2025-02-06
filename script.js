const API_URL = "https://apivet-f3bdad4c157d.herokuapp.com";

// Obtener todos los animales
function getAllAnimals() {
    fetch(`${API_URL}/animales`)
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById("animal-list");
            list.innerHTML = "<h2>Lista de Animales</h2>";
            data.forEach(animal => {
                list.innerHTML += `<p>${animal.nombre} - ${animal.tipo} - ${animal.color} - ${animal.raza}</p>`;
            });
        })
        .catch(error => console.error("Error:", error));
}

// Buscar animal por nombre
function searchByName() {
    const name = document.getElementById("searchName").value;
    fetch(`${API_URL}/animales/${name}`)  // Cambi� el endpoint a /animales/{nombre}
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById("animal-list");
            list.innerHTML = "<h2>Resultado de la b�squeda</h2>";
            data.forEach(animal => {
                list.innerHTML += `<p>${animal.nombre} - ${animal.tipo} - ${animal.color} - ${animal.raza}</p>`;
            });
        })
        .catch(error => console.error("Error:", error));
}

// Mostrar formulario de a�adir animal
function showAddAnimalForm() {
    document.getElementById("add-animal-form").style.display = "block";
}

// Ocultar formulario de a�adir animal
function hideAddAnimalForm() {
    document.getElementById("add-animal-form").style.display = "none";
}

// A�adir un nuevo animal
function addAnimal() {
    const nombre = document.getElementById("new-name").value;
    const tipo = document.getElementById("new-type").value;
    const color = document.getElementById("new-color").value;
    const raza = document.getElementById("new-breed").value;

    fetch(`${API_URL}/animales`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, tipo, color, raza })
    })
        .then(response => response.json())
        .then(() => {
            alert("Animal a�adido con �xito");
            hideAddAnimalForm();
            getAllAnimals(); // Recargar la lista
        })
        .catch(error => console.error("Error:", error));
}
