// Definimos una interfaz para el rol
export interface Role {
    id: number;
    name: string;
    isActive: boolean;
}

export interface Role {
    id: number;
    name: string;
    isActive: boolean;
}

export interface Genero {
    id: number;
    name: string;
    isActive: boolean;
}

export interface ProveedorAutenticacion {
    id: number;
    name: string; // Ejemplo: 'google', 'facebook', 'usuario'
    isActive: boolean;
}