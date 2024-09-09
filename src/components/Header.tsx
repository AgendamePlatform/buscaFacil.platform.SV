import React from 'react';
import { FiSearch, FiBell, FiUser } from 'react-icons/fi';

interface HeaderProps {
    sidebarWidth: string;
    toggleSidebarSize: () => void;
}

export default function Header({ sidebarWidth, toggleSidebarSize }: HeaderProps) {
    return (
        <header className="w-full h-24 bg-white flex justify-between items-center p-6 ">
            {/* Botón para cambiar el tamaño del sidebar */}
            <button
                className="p-3 bg-gray-300 rounded-lg mr-[2%] hover:bg-gray-400 transition duration-300 shadow-lg"
                onClick={toggleSidebarSize}
            >
                {sidebarWidth === "w-[15%]" ? "⬅️" : "➡️"}
            </button>

            {/* Filtro y barra de búsqueda */}
            <div className="flex items-center w-full space-x-4">
                {/* Combobox para "Filtrar por" */}
                <div className="relative mr-[2%]">
                    <select className="bg-black text-white p-3 rounded-lg appearance-none cursor-pointer hover:bg-gray-900 transition duration-300 shadow-md">
                        <option value="">Filtrar por</option>
                        <option value="opcion1">Opción 1</option>
                        <option value="opcion2">Opción 2</option>
                        <option value="opcion3">Opción 3</option>
                    </select>
                </div>

                {/* Input con icono de lupa */}
                <div className="relative flex items-center w-[80%]">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="bg-gray-100 border text-gray-600  border-gray-300 rounded-lg p-4 w-full pl-12 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-300 h-14 transition duration-300"
                    />
                    <FiSearch className="absolute left-4 text-gray-400" size={22} />
                </div>
            </div>

            {/* Iconos de la derecha */}
            <div className="flex items-center space-x-6">
                <button className="relative hover:text-orange-500 transition duration-300">
                    <FiBell size={35} className='text-bgdark hover:text-red-500' />
                    <span className="absolute top-0 right-0 text-xs text-white bg-orange-400 rounded-full h-5 w-5 flex justify-center items-center">3</span>
                </button>
                <button className=" transition duration-300">
                    <FiUser size={35} className='text-bgdark hover:text-red-500' />
                </button>
            </div>
        </header>
    );
}
