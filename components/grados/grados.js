import { obtenergrados } from './obtenergrados.js'; // Asegúrate de que la ruta sea correcta

export async function grados() {
    const contenedor = document.createElement("section");
    contenedor.className = "seccion-grados";

    try {
        const listaGrados = await obtenergrados();
        console.log("Datos en grados():", listaGrados); // Verificación

        if (!listaGrados?.length) {
            contenedor.textContent = "No hay grados disponibles.";
            return contenedor;
        }

        listaGrados.forEach(grado => {
            const divGrado = document.createElement("div");
            divGrado.className = "grado";
            
            divGrado.innerHTML = `
                <h3>${grado.grado_nombre}</h3>
                <p>Profesor: ${grado.profesor_nombre || "No asignado"}</p>
                <button class="ver-alumnos-btn">Ver Alumnos</button>
            `;
            
            contenedor.appendChild(divGrado);
        });

    } catch (error) {
        console.error("Error en grados():", error);
        contenedor.textContent = "Error al cargar grados. Ver consola.";
    }

    return contenedor;
}