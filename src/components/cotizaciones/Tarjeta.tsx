import React from 'react';
import { FaStar, FaShoppingCart, FaPlus } from 'react-icons/fa'; // Importando los iconos

type TarjetaProps = {
    productImage?: string;
    price: number;
    name: string;
    rating: number;
    sold: number;
    companyLogo?: string;
};

export default function Tarjeta({
    productImage = "https://via.placeholder.com/150",
    price,
    name,
    rating,
    sold,
    companyLogo = "https://via.placeholder.com/50"
}: TarjetaProps) {
    return (
        <div className="border rounded-lg shadow-sm p-4 flex flex-col items-center space-y-3 w-64 bg-white dark:bg-gray-800 transition-all duration-300 hover:scale-[1.05] cursor-pointer">
            {/* Imagen del producto - Más grande */}
            <img
                src={productImage}
                alt="Producto"
                className="w-40 h-40 object-cover rounded-lg shadow-md"
            />

            {/* Precio del producto */}
            <div className="text-2xl font-bold text-green-500 dark:text-green-400">${price}</div>

            {/* Nombre del producto */}
            <div className="text-sm text-gray-700 dark:text-gray-300 text-center px-2">
                {name}
            </div>

            {/* Detalles de rating y ventas */}
            <div className="flex items-center justify-between w-full text-gray-500 dark:text-gray-400 text-sm px-2">
                <span className="flex items-center space-x-1">
                    {/* Rating con estrella */}
                    <FaStar className="text-yellow-400" />
                    <span className="text-xs bg-gray-200 text-black dark:bg-gray-700 py-1 px-2 rounded-md">
                        {rating}
                    </span>
                </span>

                {/* Ventas */}
                <span className="flex items-center space-x-1">
                    <FaShoppingCart />
                    <span className="text-xs">Vendido {sold}</span>
                </span>
            </div>

            {/* Botón de más opciones */}
            <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-md mt-2">
                <FaPlus className="text-lg" />
            </button>

            {/* Logo de la empresa proveedora */}
            <img
                src={companyLogo}
                alt="Empresa"
                className="w-12 h-12 object-cover rounded-full border-2 border-gray-200 dark:border-gray-600 mt-3"
            />
        </div>
    );
}
