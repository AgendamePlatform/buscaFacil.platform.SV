'use client';

import React, { useEffect, useState } from 'react';
import Tarjeta from '@/components/cotizaciones/Tarjeta';

type TarjetaProps = {
    productImage?: string;
    price: number;
    name: string;
    rating: number;
    sold: number;
    companyLogo?: string;
    condition: string;
};

export default function Page() {
    const [productos, setProductos] = useState<TarjetaProps[]>([]);
    const [productosFiltrados, setProductosFiltrados] = useState<TarjetaProps[]>([]);

    // Filtros
    const [proveedoresVerificados, setProveedoresVerificados] = useState(false);
    const [garantiaTransaccion, setGarantiaTransaccion] = useState(false);
    const [condicionNuevo, setCondicionNuevo] = useState(false);
    const [condicionSegundaMano, setCondicionSegundaMano] = useState(false);
    const [minPrecio, setMinPrecio] = useState<number | string>('');
    const [maxPrecio, setMaxPrecio] = useState<number | string>('');

    // Cargar productos desde el JSON
    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const response = await fetch('/data/productos.json');
                if (!response.ok) {
                    throw new Error(`Error al cargar productos: ${response.statusText}`);
                }
                const data = await response.json();
                setProductos(data);
                setProductosFiltrados(data); // Inicialmente todos los productos
            } catch (error) {
                console.error('Error cargando productos:', error);
            }
        };

        cargarProductos();
    }, []);

    //FILTROS ===========================
    useEffect(() => {
        let productosFiltrados = productos;
        // Filtro por precio
        if (minPrecio !== '')
            productosFiltrados = productosFiltrados.filter(producto => producto.price >= Number(minPrecio));
        if (maxPrecio !== '')
            productosFiltrados = productosFiltrados.filter(producto => producto.price <= Number(maxPrecio));
        // Filtro por condición (nuevo o segunda mano)
        if (condicionNuevo)
            productosFiltrados = productosFiltrados.filter(producto => producto.condition === 'nuevo');
        if (condicionSegundaMano)
            productosFiltrados = productosFiltrados.filter(producto => producto.condition === 'segunda mano');

        setProductosFiltrados(productosFiltrados);
    }, [minPrecio, maxPrecio, condicionNuevo, condicionSegundaMano, proveedoresVerificados, garantiaTransaccion]);

    return (
        <div className="flex">
            {/* Sección izquierda: Filtros */}
            <aside className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-md h-screen sticky top-0">
                <h2 className="text-lg font-semibold mb-4">Filtros</h2>

                {/* Tipos de proveedores */}
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Tipos de proveedores</h3>
                    <label className="block">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={proveedoresVerificados}
                            onChange={() => setProveedoresVerificados(!proveedoresVerificados)}
                        />
                        Proveedores verificados
                    </label>
                    <label className="block">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={garantiaTransaccion}
                            onChange={() => setGarantiaTransaccion(!garantiaTransaccion)}
                        />
                        Garantía de transacción
                    </label>
                </div>

                {/* Tipos de productos */}
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Condición</h3>
                    <label className="block">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={condicionNuevo}
                            onChange={() => {
                                setCondicionNuevo(!condicionNuevo);
                                setCondicionSegundaMano(false); // Solo uno puede estar seleccionado
                            }}
                        />
                        Nuevo
                    </label>
                    <label className="block">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={condicionSegundaMano}
                            onChange={() => {
                                setCondicionSegundaMano(!condicionSegundaMano);
                                setCondicionNuevo(false); // Solo uno puede estar seleccionado
                            }}
                        />
                        Segunda mano
                    </label>
                </div>

                {/* Filtro por precio */}
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Precio</h3>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            placeholder="Mín"
                            value={minPrecio}
                            onChange={e => setMinPrecio(e.target.value)}
                            className="w-1/2 border rounded-md p-1"
                        />
                        <input
                            type="number"
                            placeholder="Máx"
                            value={maxPrecio}
                            onChange={e => setMaxPrecio(e.target.value)}
                            className="w-1/2 border rounded-md p-1"
                        />
                    </div>
                </div>

                {/* Espacio para anuncios */}
                <div className="mt-6 p-4 bg-gray-200 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Espacio para Google Ads</p>
                </div>
            </aside>

            {/* Sección derecha: Contenido */}
            <main className="w-3/4 p-6 ml-4">
                <div className="flex justify-between mb-4">
                    <h2 className="text-lg font-semibold">Resultados</h2>
                    <div className="flex space-x-4">
                        <button className="bg-gray-200 py-1 px-4 rounded-md">Precio mínimo</button>
                        <button className="bg-gray-200 py-1 px-4 rounded-md">Precio máximo</button>
                        <button className="bg-gray-200 py-1 px-4 rounded-md">Pedido mínimo</button>
                        <button className="text-red-500 underline">Limpiar todos los filtros</button>
                    </div>
                </div>

                {/* Grid de tarjetas filtradas */}
                <div className="grid grid-cols-4 gap-3">
                    {productosFiltrados.map((producto, index) => (
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
        </div >
    );
}
