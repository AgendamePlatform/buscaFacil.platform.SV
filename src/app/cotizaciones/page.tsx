'use client'

import React, { useEffect, useState } from 'react';
import Tarjeta from '@/components/cotizaciones/Tarjeta';

type TarjetaProps = {
    productImage?: string;
    price: number;
    name: string;
    rating: number;
    sold: number;
    companyLogo?: string;
};

export default function Page() {
    // Define el tipo de estado 'productos' como un array de 'TarjetaProps'
    const [productos, setProductos] = useState<TarjetaProps[]>([]);

    // Cargar productos desde un JSON local
    useEffect(() => {
        fetch('/data/productos.json') // Ruta relativa desde la carpeta 'public'
            .then((response) => response.json())
            .then((data) => setProductos(data))
            .catch((error) => console.error('Error cargando productos:', error));
    }, []);

    return (
        <div className="flex p-4">
            {/* Barra lateral de filtros */}
            <aside className="w-1/4 p-4 bg-gray-100 rounded-lg shadow-md fixed ">
                <h2 className="text-lg font-semibold mb-4">Filtros</h2>
                {/* Tipos de proveedores */}
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Tipos de proveedores</h3>
                    <label className="block">
                        <input type="checkbox" className="mr-2" />
                        Proveedores verificados
                    </label>
                    <label className="block">
                        <input type="checkbox" className="mr-2" />
                        Garantía de transacción
                    </label>
                </div>

                {/* Tipos de productos */}
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Tipos de productos</h3>
                    <label className="block">
                        <input type="checkbox" className="mr-2" />
                        Listo para enviar
                    </label>
                    <label className="block">
                        <input type="checkbox" className="mr-2" />
                        Muestras pagadas
                    </label>
                </div>

                {/* Condición */}
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Condición</h3>
                    <label className="block">
                        <input type="checkbox" className="mr-2" />
                        Nuevo
                    </label>
                    <label className="block">
                        <input type="checkbox" className="mr-2" />
                        Segunda mano
                    </label>
                </div>

                {/* Filtro por cantidad mínima */}
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Pedido mínimo</h3>
                    <input type="range" min="10" max="1000" className="w-full" />
                    <div className="text-sm text-gray-500">Min Order: $500</div>
                </div>

                {/* Filtro por precio */}
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Precio</h3>
                    <div className="flex space-x-2">
                        <input type="number" placeholder="Min" className="w-1/2 border rounded-md p-1" />
                        <input type="number" placeholder="Max" className="w-1/2 border rounded-md p-1" />
                    </div>
                </div>
            </aside>

            {/* Área de productos */}
            <main className="w-3/4 p-4">
                <div className="flex justify-between mb-4">
                    <h2 className="text-lg font-semibold">1 - 16 sobre 7,000 resultados para "Asus"</h2>
                    <div className="flex space-x-4">
                        <button className="bg-gray-200 py-1 px-4 rounded-md">Precio mínimo</button>
                        <button className="bg-gray-200 py-1 px-4 rounded-md">Precio máximo</button>
                        <button className="bg-gray-200 py-1 px-4 rounded-md">Pedido mínimo</button>
                        <button className="text-red-500 underline">Limpiar todos los filtros</button>
                    </div>
                </div>

                {/* Grid de tarjetas de productos */}
                <div className="grid grid-cols-4 gap-4">
                    {productos.map((producto, index) => (
                        <Tarjeta
                            key={index}
                            productImage={producto.productImage}
                            price={producto.price}
                            name={producto.name}
                            rating={producto.rating}
                            sold={producto.sold}
                            companyLogo={producto.companyLogo}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
