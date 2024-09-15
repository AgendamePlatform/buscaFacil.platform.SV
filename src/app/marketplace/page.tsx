'use client';
import React, { useEffect, useState } from 'react';
import { getRoles } from '@/utils/Roles';
import { Role } from '@/interfaces/Independientes';
import Loader from '@/components/Loader';
import ErrorPage from '@/components/ErrorPage';
import Maps from '@/components/Maps';
import TaskMarketPlace from '@/components/TaskMarketPlace';
import Link from 'next/link';

// Datos de ejemplo para productos
const products = [
    {
        id: 1,
        title: "MacBook Pro 2021",
        department: "San Salvador",
        publicationDate: "14 de Septiembre, 2024",
        details: "MacBook Pro con chip M1, 16GB RAM, 512GB SSD, en excelentes condiciones.",
        isNew: false,
        images: ["/path/to/macbook.jpg"],
        category: "Electrónica",
        transport: "Entrega personal",
        userName: "Juan Perez",
        userImage: "/path/to/user1.jpg"
    },
    {
        id: 2,
        title: "iPhone 13 Pro",
        department: "La Libertad",
        publicationDate: "20 de Septiembre, 2024",
        details: "iPhone 13 Pro, 256GB, color grafito. Usado, pero en excelente estado.",
        isNew: false,
        images: ["/path/to/iphone.jpg"],
        category: "Telefonía",
        transport: "Envío por mensajería",
        userName: "Maria Lopez",
        userImage: "/path/to/user2.jpg"
    },
    {
        id: 3,
        title: "Samsung Galaxy S22",
        department: "San Miguel",
        publicationDate: "10 de Octubre, 2024",
        details: "Samsung Galaxy S22, 128GB, con pantalla AMOLED, nuevo en caja.",
        isNew: true,
        images: ["/path/to/samsung.jpg"],
        category: "Telefonía",
        transport: "Entrega personal",
        userName: "Carlos Gomez",
        userImage: "/path/to/user3.jpg"
    },
    {
        id: 4,
        title: "Bicicleta de Montaña",
        department: "Santa Ana",
        publicationDate: "25 de Agosto, 2024",
        details: "Bicicleta de montaña, marco de aluminio, frenos de disco, 21 velocidades.",
        isNew: true,
        images: ["/path/to/bike.jpg"],
        category: "Deportes",
        transport: "Recoger en tienda",
        userName: "Pedro Martinez",
        userImage: "/path/to/user4.jpg"
    },
    {
        id: 5,
        title: "Televisor LG 55\" 4K",
        department: "San Vicente",
        publicationDate: "5 de Julio, 2024",
        details: "Televisor LG de 55 pulgadas con resolución 4K y sistema operativo webOS.",
        isNew: false,
        images: ["/path/to/tv.jpg"],
        category: "Electrónica",
        transport: "Entrega a domicilio",
        userName: "Ana Hernandez",
        userImage: "/path/to/user5.jpg"
    },
    {
        id: 6,
        title: "Cámara Canon EOS R5",
        department: "Ahuachapán",
        publicationDate: "12 de Noviembre, 2024",
        details: "Cámara Canon EOS R5, 45MP, video 8K, incluye lente 24-105mm.",
        isNew: true,
        images: ["/path/to/camera.jpg"],
        category: "Fotografía",
        transport: "Entrega personal",
        userName: "Sofia Reyes",
        userImage: "/path/to/user6.jpg"
    }
];

export default function Page() {
    const [isClient, setIsClient] = useState(false); // Para verificar si estamos en el cliente

    useEffect(() => {
        // Esto asegura que solo se ejecuta en el cliente
        setIsClient(true);
    }, []);

    if (!isClient) return null; // Evitamos renderizar hasta estar seguros de que estamos en el cliente

    return (
        <div className="container mx-auto px-4 py-8 bg-bgprimaryLigth dark:bg-bgDarkOscuro">
            <h1 className="text-3xl font-bold mb-6">Resultados</h1>
            {products.map((product) => (
                <Link href={`/marketplace/${product.id}`} key={product.id}>
                    <div>
                        <TaskMarketPlace
                            title={product.title}
                            department={product.department}
                            publicationDate={product.publicationDate}
                            details={product.details}
                            isNew={product.isNew}
                            images={product.images}
                            category={product.category}
                            transport={product.transport}
                            userName={product.userName}
                            userImage={product.userImage}
                        />
                    </div>
                </Link>

            ))}
        </div>
    );
}
