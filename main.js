import { grados } from "./components/grados/grados.js"; // Importa el formulario de grados
import { obtenergrados } from "./components/grados/obtenergrados.js"; // Importar la función obtenergrados
import { crearHeader } from "./components/header/header.js"; // Importar el header

// Función para cargar el contenido principal
async function cargarContenidoPrincipal() {
    let DOM = document.getElementById("root");
    DOM.innerHTML = ""; // Limpiar contenido actual

    console.log('Cargando header...');
    DOM.appendChild(crearHeader()); // Crear y agregar el header

    console.log('Cargando formulario de grados...');
    const gradosElement = await grados(); // Crear y agregar el formulario de grados
    DOM.appendChild(gradosElement);

    console.log('Obteniendo grados...');
    const gradosData = await obtenergrados(); // Obtener los grados desde la API
    console.log('Grados obtenidos:', gradosData);
}

// Función que maneja la carga inicial
function cargarDOM() {
    let DOM = document.getElementById("root");
    console.log('Cargando contenido principal...');
    
    // Llamamos a cargarContenidoPrincipal para cargar todo el contenido
    cargarContenidoPrincipal();
}

// Ejecutar la carga inicial
cargarDOM();
