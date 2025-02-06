const API_URL = "https://apivet-f3bdad4c157d.herokuapp.com";

fetch('https://apivet-f3bdad4c157d.herokuapp.com/animales/Luna', {
    method: 'GET',
    mode: 'no-cors' // Esto desactiva la política de CORS
})
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok');
    })
    .then(data => console.log(data))
    .catch(error => console.error('There was a problem with the fetch operation:', error));




// Obtener todos los animales
function getAllAnimals() {
    fetch(`${API_URL}/animales`)  // Verifica que la URL esté correcta
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
    fetch(`${API_URL}/animales/${name}`)  // Cambié el endpoint a /animales/{nombre}
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById("animal-list");
            list.innerHTML = "<h2>Resultado de la búsqueda</h2>";
            data.forEach(animal => {
                list.innerHTML += `<p>${animal.nombre} - ${animal.tipo} - ${animal.color} - ${animal.raza}</p>`;
            });
        })
        .catch(error => console.error("Error:", error));
}

// Mostrar formulario de añadir animal
function showAddAnimalForm() {
    document.getElementById("add-animal-form").style.display = "block";
}

// Ocultar formulario de añadir animal
function hideAddAnimalForm() {
    document.getElementById("add-animal-form").style.display = "none";
}

// Añadir un nuevo animal
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
            alert("Animal añadido con éxito");
            hideAddAnimalForm();
            getAllAnimals(); // Recargar la lista
        })
        .catch(error => console.error("Error:", error));
}
