'use client';
import React from 'react';

// Datos de ejemplo
const products = [
    {
        id: '1',
        title: 'MacBook Pro 2021',
        department: 'San Salvador',
        publicationDate: '14 de Septiembre, 2024',
        details: 'MacBook Pro con chip M1, 16GB RAM, 512GB SSD, en excelentes condiciones.',
        isNew: true,
        images: ['/path/to/image.jpg'],
        category: 'Electrónica',
        transport: 'Entrega personal',
        userName: 'Juan Pérez',
        userImage: '/path/to/user.jpg',
    },
    // Puedes agregar más productos aquí...
];

const ProductDetails = ({ params }: { params: { id: string } }) => {
    // Obtén el id de la URL desde los parámetros
    const { id } = params;

    // Encuentra el producto usando el id
    const product = products.find((product) => product.id === id);

    if (!product) {
        return <p>Producto no encontrado</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-bgprimaryLigth dark:bg-primaryDark">
            <h1 className="text-3xl font-bold mb-6">{product.title}</h1>
            <p>{product.details}</p>
            {/* Agrega más detalles y estilos */}
        </div>
    );
};

export default ProductDetails;
