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
    // Estado para controlar el tamaño del sidebar
    const [sidebarWidth, setSidebarWidth] = useState("w-[15%]");

    // Función para cambiar el tamaño del sidebar
    const toggleSidebarSize = () => {
        setSidebarWidth(sidebarWidth === "w-[15%]" ? "w-[5%]" : "w-[15%]");
    };

    return (
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}>
            {/* Contenedor Principal */}
            <div className="flex h-full w-screen bg-gray-100">
                {/* Sidebar izquierdo con bordes redondeados arriba y abajo */}
                <aside className={`${sidebarWidth} bg-bgdark flex flex-col justify-between p-4 text-white rounded-r-3xl overflow-hidden shadow-lg transition-all duration-300`}>
                    <div className="flex flex-col items-center space-y-8">
                        {/* Iconos del sidebar */}
                        <button className="hover:bg-gray-700 p-5 rounded-full transition duration-300 shadow-lg">
                            <FiHome size={28} />
                        </button>
                        <button className="hover:bg-gray-700 p-5 rounded-full transition duration-300 shadow-lg">
                            <FiPieChart size={28} />
                        </button>
                        <button className="hover:bg-gray-700 p-5 rounded-full transition duration-300 shadow-lg">
                            <FiSettings size={28} />
                        </button>
                    </div>
                </aside>

                {/* Contenido Principal */}
                <main className="flex-1 flex flex-col bg-white rounded-tl-3xl rounded-bl-3xl shadow-lg overflow-auto">
                    {/* Usamos el componente Header */}
                    <Header sidebarWidth={sidebarWidth} toggleSidebarSize={toggleSidebarSize} />

                    {/* Contenido con scroll */}
                    <section className="p-6 w-full overflow-auto">
                        {children}
                    </section>
                </main>
            </div>
        </div>
    );
}
