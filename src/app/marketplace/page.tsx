"use client";
import React, { useEffect, useState } from 'react';
import { getRoles } from '@/utils/Roles';
import { Role } from '@/interfaces/Independientes';
import Loader from '@/components/Loader';
import ErrorPage from '@/components/ErrorPage';
import Maps from '@/components/Maps';

export default function Page() {
    // Estados para roles, carga, error y si estamos en el cliente
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false); // Para verificar si estamos en el cliente

    useEffect(() => {
        // Esto asegura que solo se ejecuta en el cliente
        setIsClient(true);
    }, []);

    useEffect(() => {
        const fetchRoles = async () => {
            if (!isClient) return; // Solo ejecutamos si estamos en el cliente

            try {
                const rolesData = await getRoles(); // Llamamos a la función de utils
                setRoles(rolesData);
                setLoading(false);
            } catch (error) {
                console.error('Error en la solicitud:', error);
                setError('Error al obtener los roles');
                setLoading(false);
            }
        };

        fetchRoles();
    }, [isClient]); // Dependemos de isClient para asegurarnos de que la llamada solo ocurra en el cliente

    // if (!isClient) return null; // Evitamos renderizar hasta estar seguros de que estamos en el cliente
    // if (loading) return <Loader />;
    // if (error) return <ErrorPage />;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Roles registrados</h1>
            {/* <div className="bg-white shadow-md rounded-lg p-6">
                {roles.length > 0 ? (
                    <ul className="space-y-4">
                        {roles.map((role) => (
                            <li
                                key={role.id}
                                className="bg-gray-100 p-4 rounded-lg flex items-center justify-between shadow-sm"
                            >
                                <div>
                                    <p className="text-xl font-semibold">{role.name}</p>
                                    <p className="text-sm text-gray-600">
                                        {role.isActive ? 'Activo' : 'Inactivo'}
                                    </p>
                                </div>
                                <span
                                    className={`inline-block px-3 py-1 text-sm font-semibold ${role.isActive
                                        ? 'text-green-700 bg-green-100'
                                        : 'text-red-700 bg-red-100'
                                        } rounded-full`}
                                >
                                    {role.isActive ? 'Activo' : 'Inactivo'}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No se encontraron roles.</p>
                )}
            </div> */}
            <Maps />
        </div>
    );
}
