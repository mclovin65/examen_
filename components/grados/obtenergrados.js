export async function obtenergrados() {
    try {
        const response = await fetch('http://localhost:5000/grados');
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error en obtenergrados():', error);
        throw error; // Propaga el error para manejarlo en grados.js
    }
}