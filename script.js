let allAnimals = [];
let animalToDelete = null;

// Funci�n para obtener todos los animales
function getAllAnimals() {
    fetch('https://apivet-f3bdad4c157d.herokuapp.com/animals')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                allAnimals = data;
                displayAnimals(allAnimals); // Mostrar todos los animales
            } else {
                console.error('La respuesta no es un array', data);
            }
        })
        .catch(error => {
            console.error('Hubo un problema con la operaci�n fetch:', error);
        });
}

// Funci�n para mostrar los animales
function displayAnimals(animals) {
    const animalList = document.getElementById('animal-list');
    animalList.innerHTML = '';  // Limpiar el contenedor antes de agregar los nuevos animales

    animals.forEach(animal => {
        const animalDiv = document.createElement('div');
        animalDiv.classList.add('animal');

        // Aqu� creas el contenido para el rect�ngulo
        animalDiv.innerHTML = `
      <h3>${animal.name}</h3>
      <p>Tipo: ${animal.type}</p>
      <p>Color: ${animal.color}</p>
      <p>Raza: ${animal.breed}</p>
      <button onclick="viewDetails('${animal.id}')">Ver Detalles</button>
      <button onclick="askDelete('${animal.id}')">Eliminar</button>
    `;

        // Agregar el div al contenedor
        animalList.appendChild(animalDiv);
    });
}

// Funci�n para buscar animales por nombre
function searchAnimal() {
    const searchQuery = document.getElementById('search').value.toLowerCase();

    // Filtramos los animales que coinciden con el nombre
    const filteredAnimals = allAnimals.filter(animal =>
        animal.name.toLowerCase().includes(searchQuery)
    );

    displayAnimals(filteredAnimals);  // Mostrar los animales filtrados
}

// Funci�n para a�adir un nuevo animal
function addAnimal() {
    const name = document.getElementById('animal-name').value;
    const type = document.getElementById('animal-type').value;
    const color = document.getElementById('animal-color').value;
    const breed = document.getElementById('animal-breed').value;

    const animalData = {
        name,
        type,
        color,
        breed
    };

    fetch('https://apivet-f3bdad4c157d.herokuapp.com/animals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(animalData),
    })
        .then(response => response.json())
        .then(data => {
            // Agregar el nuevo animal a la lista
            allAnimals.push(data);
            displayAnimals(allAnimals);  // Actualizar la vista
        })
        .catch(error => console.error('Error al a�adir el animal:', error));
}

// Funci�n para ver detalles de un animal
function viewDetails(id) {
    window.location.href = `animal-details.html?id=${id}`;
}

// Funci�n para mostrar el modal de confirmaci�n de eliminaci�n
function askDelete(id) {
    animalToDelete = id;
    document.getElementById('confirmModal').style.display = 'flex';
}

// Funci�n para confirmar la eliminaci�n
function confirmDelete() {
    fetch(`https://apivet-f3bdad4c157d.herokuapp.com/animals/${animalToDelete}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                // Eliminar el animal de la lista local
                allAnimals = allAnimals.filter(animal => animal.id !== animalToDelete);
                displayAnimals(allAnimals);  // Actualizar la vista
                closeModal();  // Cerrar el modal
            } else {
                console.error('Error al eliminar el animal');
            }
        })
        .catch(error => console.error('Error al eliminar el animal:', error));
}

// Funci�n para cerrar el modal de confirmaci�n
function closeModal() {
    document.getElementById('confirmModal').style.display = 'none';
}

// Cargar todos los animales cuando se carga la p�gina
getAllAnimals();
