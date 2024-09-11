import axios from 'axios';
import { Role } from '@/interfaces/Independientes';

// Función para obtener los roles desde la API
export const getRoles = async (): Promise<Role[]> => {
    try {
        const response = await axios.get('http://localhost:4000/roles');
        if (response.data && Array.isArray(response.data.role)) {
            return response.data.role;
        } else {
            throw new Error('Estructura de datos no esperada');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};
