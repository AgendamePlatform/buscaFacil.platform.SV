import { Role, Genero, ProveedorAutenticacion } from '@/interfaces/Independientes'

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    phone: number;
    email: string;
    password?: string; // Opcional porque podría no estar presente para usuarios autenticados con Google/Facebook
    fechaNacimiento: Date;
    isActive: boolean;
    role: Role;
    genero: Genero;
    proveedorAutenticacion: ProveedorAutenticacion;
}