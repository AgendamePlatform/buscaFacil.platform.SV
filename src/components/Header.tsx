'use client';

import React from 'react';
import { FiSearch, FiBell, FiLogOut } from 'react-icons/fi';
import { signIn, useSession, signOut } from 'next-auth/react';

interface HeaderProps {
    isSidebarExpanded: boolean;
    toggleSidebarSize: () => void;
}

export default function Header({ isSidebarExpanded, toggleSidebarSize }: HeaderProps) {
    const { data: session } = useSession(); // Usamos el hook de sesión de NextAuth



    return (
        <header className="w-full h-24 bg-white flex justify-between items-center p-6">
            {/* Botón para cambiar el tamaño del sidebar */}
            <button
                className="p-3 bg-gray-300 rounded-lg mr-[2%] hover:bg-gray-400 transition duration-300 shadow-lg"
                onClick={toggleSidebarSize}
            >
                {isSidebarExpanded ? "⬅️" : "➡️"}
            </button>

            {/* Filtro y barra de búsqueda */}
            <div className="flex items-center w-full space-x-4">
                {/* Combobox para "Filtrar por" */}
                <div className="relative mr-[2%]">
                    <select className="bg-azulito text-white p-3 rounded-lg appearance-none cursor-pointer hover:bg-gray-900 transition duration-300 shadow-md">
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
                        className="bg-gray-100 border text-gray-600 border-gray-300 rounded-lg p-4 w-full pl-12 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-300 h-14 transition duration-300"
                    />
                    <FiSearch className="absolute left-4 text-gray-400" size={22} />
                </div>
            </div>

            {/* Iconos y autenticación */}
            <div className="flex items-center space-x-6">
                <button className="relative hover:text-orange-500 transition duration-300">
                    <FiBell size={35} className='text-bgdark hover:text-red-500' />
                    <span className="absolute top-0 right-0 text-xs text-white bg-orange-400 rounded-full h-5 w-5 flex justify-center items-center">3</span>
                </button>

                {session?.user ? (
                    <div className="flex items-center space-x-4">
                        {/* Imagen del usuario */}
                        {session.user.image && (
                            <img
                                src={session.user.image}
                                alt="User image"
                                className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-md"
                            />
                        )}
                        {/* Nombre del usuario */}
                        <span className="font-medium text-gray-800">
                            {session.user.name}
                        </span>

                        {/* Botón de Logout con icono */}
                        <button
                            onClick={async () => {
                                await signOut({
                                    callbackUrl: "/login",
                                });
                            }}
                            className="hover:text-red-500 transition duration-300"
                        >
                            <FiLogOut size={28} />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => signIn('google')}
                        className="bg-sky-400 px-3 py-2 rounded"
                    >
                        Sign In
                    </button>
                )}
            </div>
        </header>
    );
}
