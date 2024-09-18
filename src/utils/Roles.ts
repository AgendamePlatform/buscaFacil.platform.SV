import axios from 'axios';
import { Role } from '@/interfaces/Independientes';

// Función asíncrona para obtener los roles desde la API
export const getRoles = async (): Promise<Role[]> => {
    try {
        // Realiza una solicitud HTTP GET a la API para obtener los roles.
        // 'await' se usa para esperar a que la solicitud se complete.
        const response = await axios.get('http://localhost:4000/roles');

        // Verifica que la respuesta contenga datos y que 'response.data.role' sea un arreglo.
        // La primera condición (response.data) verifica que 'response.data' no sea null o undefined.
        // La segunda condición (Array.isArray(response.data.role)) comprueba que 'role' sea un arreglo.
        if (response.data && Array.isArray(response.data.role)) {
            // Si ambas condiciones se cumplen, devuelve el arreglo de roles.
            return response.data.role;
        } else {
            // Si la estructura de los datos no es la esperada, lanza un error.
            throw new Error('Estructura de datos no esperada');
        }
    } catch (error) {
        // Captura cualquier error que ocurra durante la solicitud o en el bloque try.
        console.error('Error en la solicitud:', error); // Imprime el error en la consola para depuración.
        throw error; // Lanza el error para que quien llame a 'getRoles' pueda manejarlo si es necesario.
    }
};
