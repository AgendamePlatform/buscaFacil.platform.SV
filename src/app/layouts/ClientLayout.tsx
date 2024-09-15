'use client'; // Esto indica que es un Client Component

import React, { useState } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Importamos el hook usePathname
import localFont from "next/font/local";
import "../globals.css";
import Header from "@/components/Header";
import { FiHome, FiPieChart, FiSettings, FiBarChart, FiMap, FiHelpCircle } from 'react-icons/fi';

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
            <aside className={`${isSidebarExpanded ? 'w-[13%]' : 'w-[4%]'} flex flex-col justify-between p-4 text-black rounded-r-3xl shadow-lg bg-azulito transition-all duration-300 border-r border-border dark:border-gray-950`}>
                {/* Menu principal */}
                <div className="flex flex-col space-y-6">
                    <h2 className={`${isSidebarExpanded ? 'block' : 'hidden'} text-gray-200 text-sm uppercase tracking-wider`}>Main Menu</h2>

                    <Link href="/" className={`group flex items-center space-x-4 rounded-lg p-2 transition duration-300 ${isActive('/') ? 'bg-purple-800 text-white' : 'hover:bg-purple-600 text-gray-200'}`}>
                        <FiHome size={24} className={`${isActive('/') ? 'text-white' : 'text-gray-200 group-hover:text-white'}`} />
                        {isSidebarExpanded && <span className="font-medium">Dashboard</span>}
                    </Link>

                    <Link href="/marketplace" className={`group flex items-center space-x-4 rounded-lg p-2 transition duration-300 ${isActive('/marketplace') ? 'bg-purple-800 text-white' : 'hover:bg-purple-600 text-gray-200'}`}>
                        <FiPieChart size={24} className={`${isActive('/marketplace') ? 'text-white' : 'text-gray-200 group-hover:text-white'}`} />
                        {isSidebarExpanded && <span className="font-medium">Marketplace</span>}
                    </Link>

                    <Link href="/reports" className={`group flex items-center space-x-4 rounded-lg p-2 transition duration-300 ${isActive('/reports') ? 'bg-purple-800 text-white' : 'hover:bg-purple-600 text-gray-200'}`}>
                        <FiBarChart size={24} className={`${isActive('/reports') ? 'text-white' : 'text-gray-200 group-hover:text-white'}`} />
                        {isSidebarExpanded && <span className="font-medium">Reports</span>}
                    </Link>

                    <Link href="/maps" className={`group flex items-center space-x-4 rounded-lg p-2 transition duration-300 ${isActive('/maps') ? 'bg-purple-800 text-white' : 'hover:bg-purple-600 text-gray-200'}`}>
                        <FiMap size={24} className={`${isActive('/maps') ? 'text-white' : 'text-gray-200 group-hover:text-white'}`} />
                        {isSidebarExpanded && <span className="font-medium">Mapa</span>}
                    </Link>
                </div>

                {/* Menu de otros */}
                <div className="flex flex-col space-y-6">
                    <h2 className={`${isSidebarExpanded ? 'block' : 'hidden'} text-gray-200 text-sm uppercase tracking-wider`}>Others</h2>

                    <Link href="/settings" className={`group flex items-center space-x-4 rounded-lg p-2 transition duration-300 ${isActive('/settings') ? 'bg-purple-800 text-white' : 'hover:bg-purple-600 text-gray-200'}`}>
                        <FiSettings size={24} className={`${isActive('/settings') ? 'text-white' : 'text-gray-200 group-hover:text-white'}`} />
                        {isSidebarExpanded && <span className="font-medium">Settings</span>}
                    </Link>

                    <Link href="/help" className={`group flex items-center space-x-4 rounded-lg p-2 transition duration-300 ${isActive('/help') ? 'bg-purple-800 text-white' : 'hover:bg-purple-600 text-gray-200'}`}>
                        <FiHelpCircle size={24} className={`${isActive('/help') ? 'text-white' : 'text-gray-200 group-hover:text-white'}`} />
                        {isSidebarExpanded && <span className="font-medium">Help Center</span>}
                    </Link>
                </div>
            </aside>


            {/* Main content */}
            <div className="flex-1 flex flex-col  h-full overflow-hidden bg-bgprimaryLigth dark:bg-bgDarkOscuro">
                <Header isSidebarExpanded={isSidebarExpanded} toggleSidebarSize={toggleSidebarSize} />
                <main className="flex-1 rounded-[2%] overflow-auto shadow-lg">
                    <section className="">{children}</section>
                </main>
            </div>
        </div>
    );
}
