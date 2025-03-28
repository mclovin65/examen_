export async function obtenerAlumnosPorGrado(gradoId) {
    try {
        const response = await fetch(`http://localhost:5000/alumnos/${gradoId}`);
        if (!response.ok) throw new Error('Error al obtener alumnos');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function crearAlumno(alumnoData) {
    try {
        const response = await fetch('http://localhost:5000/alumnos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(alumnoData)
        });
        if (!response.ok) throw new Error('Error al crear alumno');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}