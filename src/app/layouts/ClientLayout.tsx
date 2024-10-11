'use client'; // Esto indica que es un Client Component

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Hook para obtener la ruta actual
import localFont from "next/font/local";
import "../globals.css";
import Header from "@/components/Header";
import { FiHome, FiPieChart, FiSettings, FiBarChart, FiMap, FiHelpCircle, FiChevronLeft, FiChevronRight, FiMenu, FiX } from 'react-icons/fi';

// Importación de las fuentes locales
const geistSans = localFont({
    src: "../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false); // Estado para el sidebar (expandido o colapsado)
    const [isMobileSidebarVisible, setIsMobileSidebarVisible] = useState(false); // Estado para mostrar el sidebar en móviles
    const pathname = usePathname(); // Hook para obtener la ruta actual

    // Mostrar/ocultar el sidebar en móviles
    const toggleMobileSidebar = () => {
        setIsMobileSidebarVisible(!isMobileSidebarVisible);
    };

    const closeMobileSidebar = () => {
        setIsMobileSidebarVisible(false);
    };

    const toggleSidebarSize = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };

    const isActive = (path: string) => pathname === path;

    return (
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex`}>
            {/* Botón de menú hamburguesa para móviles */}
            <div className="md:hidden absolute top-4 left-4 z-50">
                <button onClick={toggleMobileSidebar} className="p-2 bg-purple-600 text-white rounded-md shadow-lg">
                    {isMobileSidebarVisible ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* Sidebar - en pantallas grandes y móviles */}
            <aside className={`fixed md:relative top-0 left-0 h-full z-40 bg-azulito p-4 shadow-lg border-r border-border dark:border-gray-950
                transition-all duration-300 ease-in-out
                ${isMobileSidebarVisible ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
                ${isSidebarExpanded ? 'w-[70%] md:w-[13%]' : 'w-[4%]'} 
            `}>
                {/* Botón para expandir/colapsar en pantallas grandes */}
                <button
                    onClick={toggleSidebarSize}
                    className="absolute top-4 right-[-10px] p-2 bg-purple-600 text-white rounded-full shadow-lg hidden md:block"
                >
                    {isSidebarExpanded ? <FiChevronLeft size={24} /> : <FiChevronRight size={24} />}
                </button>

                {/* Contenido del Sidebar */}
                <div className="flex flex-col space-y-6">
                    <h2 className={`${isSidebarExpanded ? 'block' : 'hidden'} text-gray-200 text-sm uppercase tracking-wider`}>Main Menu</h2>

                    <Link href="/" onClick={closeMobileSidebar} className={`group flex items-center ${isSidebarExpanded ? 'space-x-4' : 'justify-center'} rounded-lg p-2 transition duration-300 ${isActive('/') ? 'bg-purple-800 text-white' : 'hover:bg-purple-600 text-gray-200'}`}>
                        <FiHome size={24} className={`${isActive('/') ? 'text-white' : 'text-gray-200 group-hover:text-white'}`} />
                        {isSidebarExpanded && <span className="font-medium">Dashboard</span>}
                    </Link>

                    <Link href="/marketplace" onClick={closeMobileSidebar} className={`group flex items-center ${isSidebarExpanded ? 'space-x-4' : 'justify-center'} rounded-lg p-2 transition duration-300 ${isActive('/marketplace') ? 'bg-purple-800 text-white' : 'hover:bg-purple-600 text-gray-200'}`}>
                        <FiPieChart size={24} className={`${isActive('/marketplace') ? 'text-white' : 'text-gray-200 group-hover:text-white'}`} />
                        {isSidebarExpanded && <span className="font-medium">Marketplace</span>}
                    </Link>

                    <Link href="/reports" onClick={closeMobileSidebar} className={`group flex items-center ${isSidebarExpanded ? 'space-x-4' : 'justify-center'} rounded-lg p-2 transition duration-300 ${isActive('/reports') ? 'bg-purple-800 text-white' : 'hover:bg-purple-600 text-gray-200'}`}>
                        <FiBarChart size={24} className={`${isActive('/reports') ? 'text-white' : 'text-gray-200 group-hover:text-white'}`} />
                        {isSidebarExpanded && <span className="font-medium">Reports</span>}
                    </Link>

                    <Link href="/cotizaciones" onClick={closeMobileSidebar} className={`group flex items-center ${isSidebarExpanded ? 'space-x-4' : 'justify-center'} rounded-lg p-2 transition duration-300 ${isActive('/cotizaciones') ? 'bg-purple-800 text-white' : 'hover:bg-purple-600 text-gray-200'}`}>
                        <FiBarChart size={24} className={`${isActive('/cotizaciones') ? 'text-white' : 'text-gray-200 group-hover:text-white'}`} />
                        {isSidebarExpanded && <span className="font-medium">Cotizaciones</span>}
                    </Link>

                    <Link href="/maps" onClick={closeMobileSidebar} className={`group flex items-center ${isSidebarExpanded ? 'space-x-4' : 'justify-center'} rounded-lg p-2 transition duration-300 ${isActive('/maps') ? 'bg-purple-800 text-white' : 'hover:bg-purple-600 text-gray-200'}`}>
                        <FiMap size={24} className={`${isActive('/maps') ? 'text-white' : 'text-gray-200 group-hover:text-white'}`} />
                        {isSidebarExpanded && <span className="font-medium">Mapa</span>}
                    </Link>
                </div>

                {/* Otros elementos */}
                <div className="flex flex-col space-y-6">
                    <h2 className={`${isSidebarExpanded ? 'block' : 'hidden'} text-gray-200 text-sm uppercase tracking-wider`}>Others</h2>

                    <Link href="/settings" onClick={closeMobileSidebar} className={`group flex items-center ${isSidebarExpanded ? 'space-x-4' : 'justify-center'} rounded-lg p-2 transition duration-300 ${isActive('/settings') ? 'bg-purple-800 text-white' : 'hover:bg-purple-600 text-gray-200'}`}>
                        <FiSettings size={24} className={`${isActive('/settings') ? 'text-white' : 'text-gray-200 group-hover:text-white'}`} />
                        {isSidebarExpanded && <span className="font-medium">Settings</span>}
                    </Link>

                    <Link href="/help" onClick={closeMobileSidebar} className={`group flex items-center ${isSidebarExpanded ? 'space-x-4' : 'justify-center'} rounded-lg p-2 transition duration-300 ${isActive('/help') ? 'bg-purple-800 text-white' : 'hover:bg-purple-600 text-gray-200'}`}>
                        <FiHelpCircle size={24} className={`${isActive('/help') ? 'text-white' : 'text-gray-200 group-hover:text-white'}`} />
                        {isSidebarExpanded && <span className="font-medium">Help Center</span>}
                    </Link>
                </div>
            </aside>

            {/* Overlay para cerrar el sidebar al hacer clic fuera en móviles */}
            {isMobileSidebarVisible && (
                <div className="fixed inset-0 z-30 bg-black opacity-50" onClick={closeMobileSidebar}></div>
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col h-full">
                <Header isSidebarExpanded={isSidebarExpanded} toggleSidebarSize={toggleSidebarSize} toggleSidebarVisibility={toggleMobileSidebar} />
                <main className="flex-1 flex-grow overflow-hidden p-4">
                    <section className="h-full">
                        {children}
                    </section>
                </main>
            </div>
        </div>
    );
}
