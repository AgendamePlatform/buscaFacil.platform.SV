"use client"; // Marcamos este componente como un Client Component

import React, { useState } from "react";
import localFont from "next/font/local";
import "../globals.css"; // Asegúrate de que la ruta esté correcta según tu estructura de proyecto
import Header from "@/components/Header"; // Importamos el Header

// Importamos iconos de react-icons
import { FiHome, FiPieChart, FiSettings } from 'react-icons/fi';

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
    // Estado para controlar si el sidebar está expandido o contraído
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    // Función para cambiar el tamaño del sidebar
    const toggleSidebarSize = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };

    return (
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex overflow-hidden`}>
            {/* Sidebar izquierdo con bordes redondeados arriba y abajo */}
            <aside className={`${isSidebarExpanded ? 'w-40' : 'w-20'} bg-bgdark flex flex-col justify-between p-4 text-white rounded-r-3xl shadow-lg transition-all duration-300`}>
                <div className="flex flex-col space-y-8">
                    {/* Iconos del sidebar */}
                    <button className="group py-2 rounded-full flex items-center space-x-4 transition duration-300 shadow-lg">
                        <FiHome size={36} className="min-w-[36px] group-hover:bg-green-600 rounded-full p-2 transition duration-300" />
                        {isSidebarExpanded && <span className="text-sm">Home</span>}
                    </button>
                    <button className="group py-2 rounded-full flex items-center space-x-4 transition duration-300 shadow-lg">
                        <FiPieChart size={36} className="min-w-[36px] group-hover:bg-green-600 rounded-full p-2 transition duration-300" />
                        {isSidebarExpanded && <span className="text-sm">Ventas</span>}
                    </button>
                    <button className="group py-2 rounded-full flex items-center space-x-4 transition duration-300 shadow-lg">
                        <FiSettings size={36} className="min-w-[36px] group-hover:bg-green-600 rounded-full p-2 transition duration-300" />
                        {isSidebarExpanded && <span className="text-sm">Informes</span>}
                    </button>
                </div>
            </aside>




            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Usamos el componente Header */}
                <Header isSidebarExpanded={isSidebarExpanded} toggleSidebarSize={toggleSidebarSize} />

                {/* Contenido Principal */}
                <main className="flex-1 rounded-tl-3xl rounded-bl-3xl shadow-lg overflow-auto">
                    <section className="p-[0.5%]">
                        {children}
                    </section>
                </main>
            </div>
        </div>
    );
}
