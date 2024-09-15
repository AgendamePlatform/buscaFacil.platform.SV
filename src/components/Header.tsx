'use client';

import React, { useState, useEffect } from 'react';
import { FiSearch, FiBell, FiLogOut, FiSun, FiMoon, FiMenu } from 'react-icons/fi';
import { signIn, useSession, signOut } from 'next-auth/react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

interface HeaderProps {
    isSidebarExpanded: boolean;
    toggleSidebarSize: () => void;
    toggleSidebarVisibility: () => void; // Nuevo prop para controlar la visibilidad del sidebar en móvil
}

export default function Header({ isSidebarExpanded, toggleSidebarSize, toggleSidebarVisibility }: HeaderProps) {
    const { data: session } = useSession();
    const [darkMode, setDarkMode] = useState(false);

    // Manejar el cambio del tema claro/oscuro
    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark'); // Guardar preferencia en localStorage
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    // Efecto para sincronizar el tema con la preferencia del usuario
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    return (
        <header className="w-full h-24 bg-bgprymariLigth dark:bg-bgdark flex justify-between items-center p-6">
            {/* Botón para abrir/cerrar el sidebar en modo móvil */}
            <button
                className="p-3 bg-azulito rounded-lg mr-4 sm:hidden hover:bg-purple-900 transition duration-300 shadow-lg"
                onClick={toggleSidebarVisibility}
            >
                <FiMenu className='text-white' size={24} />
            </button>

            {/* Botón para cambiar el tamaño del sidebar en pantallas grandes */}
            <button
                className="p-3 bg-azulito rounded-lg mr-[2%] hidden sm:block hover:bg-purple-900 transition duration-300 shadow-lg"
                onClick={toggleSidebarSize}
            >
                {isSidebarExpanded ? <FaArrowAltCircleLeft className='text-white' size={24} /> : <FaArrowAltCircleRight className='text-white' size={24} />}
            </button>

            {/* Filtro y barra de búsqueda */}
            <div className="flex items-center w-full justify-between">

                {/* Input con icono de lupa */}
                <div className="relative flex items-center w-[65%]">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="bg-bgligth dark:bg-gray-700 dark:text-white border text-gray-600 dark:border-gray-600 rounded-lg p-4 w-full pl-12 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-300 h-14 transition duration-300"
                    />
                    <FiSearch className="absolute left-4 text-gray-400 dark:text-white" size={22} />
                </div>

                {/* Iconos y autenticación */}
                <div className="flex items-center space-x-4 ml-4">
                    <button className="relative hover:text-orange-500 transition duration-300">
                        <FiBell size={35} className="text-azulito dark:text-white hover:text-purple-700" />
                        <span className="absolute top-0 right-0 text-xs text-white bg-orange-400 rounded-full h-5 w-5 flex justify-center items-center">3</span>
                    </button>

                    {/* Botón para cambiar entre modo claro y oscuro */}
                    <button
                        onClick={toggleDarkMode}
                        className="hover:text-blue-500 dark:hover:text-yellow-400 transition duration-300"
                    >
                        {darkMode ? <FiSun size={28} className='text-azulito dark:text-white hover:text-purple-700' /> : <FiMoon size={28} className='text-azulito hover:text-purple-700  ' />}
                    </button>

                    {session?.user ? (
                        <div className="flex items-center space-x-4">
                            {/* Imagen del usuario */}
                            {session.user.image && (
                                <img
                                    src={session.user.image}
                                    alt="User image"
                                    className="w-10 h-10 rounded-full border-2 border-azulito dark:border-gray-600 "
                                />
                            )}
                            {/* Nombre del usuario */}
                            <span className="font-medium text-gray-800 dark:text-white">
                                {session.user.name}
                            </span>

                            {/* Botón de Logout con icono */}
                            <button
                                onClick={async () => {
                                    await signOut({
                                        callbackUrl: "/login",
                                    });
                                }}
                                className="hover:text-blue-700 transition duration-300"
                            >
                                <FiLogOut size={28} className='text-azulito dark:text-white hover:text-purple-700 ' />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => signIn('google')}
                            className="bg-sky-400 dark:bg-sky-600 px-3 py-2 rounded"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
