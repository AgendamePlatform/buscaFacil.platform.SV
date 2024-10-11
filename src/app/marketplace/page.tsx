'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import TaskMarketPlace from '@/components/TaskMarketPlace';
import Combobox from '@/components/Combobox';

const products = [
    {
        id: 1,
        title: "MacBook Pro 2021",
        department: "San Salvador",
        publicationDate: "14 de Septiembre, 2024",
        details: "MacBook Pro con chip M1, 16GB RAM, 512GB SSD, en excelentes condiciones.",
        isNew: false,
        images: ["https://imageio.forbes.com/specials-images/imageserve/6176a01efc8d0ea845836895/03FE1ED7-197F-4272-9831-990FC45461D4-1-105-c/960x0.jpg?format=jpg&width=960"],
        category: "Electrónica",
        transport: "Entrega personal",
        userName: "Juan Perez",
        userImage: "/path/to/user1.jpg",
        price: 1200,
        previousPrice: 1500,
    },
    {
        id: 2,
        title: "iPhone 13 Pro",
        department: "La Libertad",
        publicationDate: "20 de Septiembre, 2024",
        details: "iPhone 13 Pro, 256GB, color grafito. Usado, pero en excelente estado.",
        isNew: false,
        images: ["data:image/jpeg;base64,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"],
        category: "Telefonía",
        transport: "Envío por mensajería",
        userName: "Maria Lopez",
        userImage: "/path/to/user2.jpg",
        price: 900,
        previousPrice: 1500,
    },
    {
        id: 3,
        title: "Samsung Galaxy S22",
        department: "San Miguel",
        publicationDate: "10 de Octubre, 2024",
        details: "Samsung Galaxy S22, 128GB, con pantalla AMOLED, nuevo en caja.",
        isNew: true,
        images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7IqLlWOsciUXyykZjIY34Ge9_GW9hGabqSg&s"],
        category: "Telefonía",
        transport: "Entrega personal",
        userName: "Carlos Gomez",
        userImage: "/path/to/user3.jpg",
        price: 900,
        previousPrice: 1500,
    },
    {
        id: 4,
        title: "Bicicleta de Montaña",
        department: "Santa Ana",
        publicationDate: "25 de Agosto, 2024",
        details: "Bicicleta de montaña, marco de aluminio, frenos de disco, 21 velocidades.",
        isNew: true,
        images: ["https://www.sumitate.com.ar/img/articulos/2023/05/bicicleta_montana_merida_ninety_six_rc_9000_thumb1.jpg"],
        category: "Deportes",
        transport: "Recoger en tienda",
        userName: "Pedro Martinez",
        userImage: "/path/to/user4.jpg",
        price: 1200,
        previousPrice: 1500,
    },
    {
        id: 5,
        title: "Televisor LG 55\" 4K",
        department: "San Vicente",
        publicationDate: "5 de Julio, 2024",
        details: "Televisor LG de 55 pulgadas con resolución 4K y sistema operativo webOS.",
        isNew: false,
        images: ["data:image/jpeg;base64,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"],
        category: "Electrónica",
        transport: "Entrega a domicilio",
        userName: "Ana Hernandez",
        userImage: "/path/to/user5.jpg",
        price: 1200,
        previousPrice: 1500,
    },
    {
        id: 6,
        title: "Cámara Canon EOS R5",
        department: "Ahuachapán",
        publicationDate: "12 de Noviembre, 2024",
        details: "Cámara Canon EOS R5, 45MP, video 8K, incluye lente 24-105mm.",
        isNew: true,
        images: ["data:image/jpeg;base64,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"],
        category: "Fotografía",
        transport: "Entrega personal",
        userName: "Sofia Reyes",
        userImage: "/path/to/user6.jpg",
        price: 1200,
        previousPrice: 1500,
    }
];
// Definir la interfaz para los props de FilterSection
interface FilterSectionProps {
    selectedDepartment: string;
    setSelectedDepartment: (value: string) => void;
    selectedState: string;
    setSelectedState: (value: string) => void;
    showFilters: boolean;
    setShowFilters: (value: boolean) => void;
}

// Componente para la sección de filtros y anuncios
const FilterSection: React.FC<FilterSectionProps> = ({
    selectedDepartment,
    setSelectedDepartment,
    selectedState,
    setSelectedState,
    showFilters,
    setShowFilters,
}) => {
    return (
        <div className={`w-full bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg mb-6 md:sticky top-4 h-auto ${showFilters ? 'block' : 'hidden'} md:block`}>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-200">Filtros</h2>
            <div className="mb-4">
                <Combobox
                    options={['Todos', 'San Salvador', 'La Libertad', 'San Miguel', 'Santa Ana']}
                    label="Departamento"
                    onChange={(selected: string) => setSelectedDepartment(selected)}
                />
            </div>
            <div className="mb-4">
                <Combobox
                    options={['Todos', 'Nuevo', 'Usado']}
                    label="Estado"
                    onChange={(selected: string) => setSelectedState(selected)}
                />
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-200">Anuncios</h2>
                <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-300">
                    Espacio para Google Ads
                </div>
            </div>
            {/* Botón para cerrar filtros en modo móvil */}
            <div className="md:hidden mt-4">
                <button
                    onClick={() => setShowFilters(false)}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    Cerrar Filtros
                </button>
            </div>
        </div>
    );
};

export default function Page() {
    const [isClient, setIsClient] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<string>('Todos');
    const [selectedState, setSelectedState] = useState<string>('Todos');
    const [showFilters, setShowFilters] = useState<boolean>(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    const filteredProducts = products.filter((product) => {
        return (
            (selectedDepartment === 'Todos' || product.department === selectedDepartment) &&
            (selectedState === 'Todos' || (selectedState === 'Nuevo' && product.isNew) || (selectedState === 'Usado' && !product.isNew))
        );
    });

    return (
        <div className="container mx-auto px-1 py-6 bg-gray-50 dark:bg-bgdark h-screen overflow-hidden">
            {/* Encabezado de resultados */}
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100">Resultados</h1>
                <Link href="/marketplace/create">
                    <button className="px-3 py-2 sm:px-4 sm:py-2 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                        Vender Producto
                    </button>
                </Link>
            </div>

            {/* Botón para mostrar filtros en móviles */}
            <div className="md:hidden mb-4">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-3 py-2 sm:px-4 sm:py-2 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    {showFilters ? 'Ocultar Filtros' : 'Ver Filtros'}
                </button>
            </div>

            {/* Contenedor general con filtros y productos */}
            <div className="flex h-[calc(100vh-10rem)]">
                {/* Sección de filtros - permanece fija en pantallas grandes */}
                <div className={`w-full md:w-1/4 pr-1 overflow-y-hidden ${showFilters ? 'block' : 'hidden'} md:block`}>
                    <FilterSection
                        selectedDepartment={selectedDepartment}
                        setSelectedDepartment={setSelectedDepartment}
                        selectedState={selectedState}
                        setSelectedState={setSelectedState}
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                    />
                </div>

                {/* Sección de productos - es la única que puede hacer scroll */}
                <div className="w-full md:w-3/4 overflow-y-auto h-full">
                    {filteredProducts.map((product) => (
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
                                    price={product.price}
                                    discountPrice={product.previousPrice}
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
