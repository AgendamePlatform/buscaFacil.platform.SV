'use client'; // Esto indica que es un Client Component

import React, { useState } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Importamos el hook usePathname
import localFont from "next/font/local";
import "../globals.css";
import Header from "@/components/Header";
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
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const pathname = usePathname(); // Hook usePathname para obtener la ruta actual

    const toggleSidebarSize = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };

    // Función para determinar si la ruta actual está activa
    const isActive = (path: string) => pathname === path;

    return (
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex overflow-hidden`}>
            {/* Sidebar */}
            <aside className={`${isSidebarExpanded ? 'w-60' : 'w-20'} flex flex-col justify-between p-4 text-black rounded-r-3xl shadow-lg transition-all duration-300`}>
                {/* Menu principal */}
                <div className="flex flex-col space-y-6">
                    <h2 className={`${isSidebarExpanded ? 'block' : 'hidden'} text-gray-500 text-sm uppercase tracking-wider`}>Main Menu</h2>

                    <Link href="/" className={`group flex items-center space-x-4 rounded-lg p-2 transition duration-300 ${isActive('/') ? 'bg-blue-200 text-blue-600' : 'hover:bg-blue-100'}`}>
                        <FiHome size={24} className={`${isActive('/') ? 'text-blue-600' : 'text-blue-500 group-hover:text-blue-600'}`} />
                        {isSidebarExpanded && <span className="text-gray-800 font-medium">Dashboard</span>}
                    </Link>

                    <Link href="/marketplace" className={`group flex items-center space-x-4 rounded-lg p-2 transition duration-300 ${isActive('/marketplace') ? 'bg-blue-200 text-blue-600' : 'hover:bg-blue-100'}`}>
                        <FiPieChart size={24} className={`${isActive('/marketplace') ? 'text-blue-600' : 'text-blue-500 group-hover:text-blue-600'}`} />
                        {isSidebarExpanded && <span className="text-gray-800 font-medium">Marketplace</span>}
                    </Link>

                    <Link href="/reports" className={`group flex items-center space-x-4 rounded-lg p-2 transition duration-300 ${isActive('/reports') ? 'bg-blue-200 text-blue-600' : 'hover:bg-blue-100'}`}>
                        <FiSettings size={24} className={`${isActive('/reports') ? 'text-blue-600' : 'text-blue-500 group-hover:text-blue-600'}`} />
                        {isSidebarExpanded && <span className="text-gray-800 font-medium">Reports</span>}
                    </Link>
                </div>

                {/* Menu de otros */}
                <div className="flex flex-col space-y-6">
                    <h2 className={`${isSidebarExpanded ? 'block' : 'hidden'} text-gray-500 text-sm uppercase tracking-wider`}>Others</h2>

                    <Link href="/settings" className={`group flex items-center space-x-4 rounded-lg p-2 transition duration-300 ${isActive('/settings') ? 'bg-blue-200 text-blue-600' : 'hover:bg-blue-100'}`}>
                        <FiSettings size={24} className={`${isActive('/settings') ? 'text-blue-600' : 'text-blue-500 group-hover:text-blue-600'}`} />
                        {isSidebarExpanded && <span className="text-gray-800 font-medium">Settings</span>}
                    </Link>

                    <Link href="/help" className={`group flex items-center space-x-4 rounded-lg p-2 transition duration-300 ${isActive('/help') ? 'bg-blue-200 text-blue-600' : 'hover:bg-blue-100'}`}>
                        <FiSettings size={24} className={`${isActive('/help') ? 'text-blue-600' : 'text-blue-500 group-hover:text-blue-600'}`} />
                        {isSidebarExpanded && <span className="text-gray-800 font-medium">Help Center</span>}
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <Header isSidebarExpanded={isSidebarExpanded} toggleSidebarSize={toggleSidebarSize} />
                <main className="flex-1 rounded-tl-3xl rounded-bl-3xl overflow-auto bg-white shadow-lg">
                    <section className="p-6">{children}</section>
                </main>
            </div>
        </div>
    );
}
