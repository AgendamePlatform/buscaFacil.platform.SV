"use client";
import React from 'react';
import ProductForm from '@/components/forms/ProductForm';

// Simulación de un hook para obtener el ID del usuario logueado
const useUser = () => {
    return { id: '12345', name: 'Usuario Logueado' }; // Simulación del ID del usuario
};

const Page: React.FC = () => {
    const user = useUser();

    return (
        <div className="w-full min-h-full p-8 bg-white">
            <h2 className="text-4xl mb-6 text-azulito font-bold ">Crear Publicacion</h2>
            <p className="mb-4 text-gray-600">Usuario ID: {user.id}</p> {/* Muestra el ID del usuario */}
            <section className='p-5 '>
                <ProductForm userId={user.id} /> {/* Pasamos el ID del usuario al componente */}
            </section>
        </div>
    );
};

export default Page;
