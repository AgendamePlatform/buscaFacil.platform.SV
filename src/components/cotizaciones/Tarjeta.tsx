import React from 'react';

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
        <div className="border rounded-lg shadow-lg p-4 flex flex-col items-center space-y-3 w-72">
            {/* Imagen del producto */}
            <img src={productImage} alt="Producto" className="w-32 h-32 object-cover" />

            {/* Precio del producto */}
            <div className="text-xl font-semibold text-gray-800">${price}</div>

            {/* Nombre del producto */}
            <div className="text-sm text-gray-600 text-center">
                {name}
            </div>

            {/* Detalles de rating y ventas */}
            <div className="flex items-center justify-between w-full text-gray-500 text-sm">
                <span className="flex items-center space-x-1">
                    <span className="bg-gray-200 text-black py-1 px-2 rounded-md text-xs">{rating}</span>
                    <span>Sold {sold}</span>
                </span>
                {/* Botón de más opciones */}
                <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full">
                    <span className="text-lg font-semibold">+</span>
                </button>
            </div>

            {/* Logo de la empresa proveedora */}
            <img src={companyLogo} alt="Empresa" className="w-12 h-12 object-cover rounded-full mt-3" />
        </div>
    );
}
