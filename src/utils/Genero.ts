import axios from 'axios';
import { Genero } from '@/interfaces/Independientes';


const url = 'http://localhost:3000/Generos';

// Obtener los datos de los encargados desde una API
export const getEncargados = async (): Promise<Genero[]> => {
    try {
        const response = await axios.get(url);
        if (response.data && Array.isArray(response.data.genero)) {
            return response.data.genero;
        } else {
            throw new Error('Estructura de datos no esperada');
        }
    } catch (error) {
        console.error('Error al obtener los datos de Generos:', error);
        throw error;
    }
};
