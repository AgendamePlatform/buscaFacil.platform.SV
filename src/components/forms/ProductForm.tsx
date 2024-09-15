"use client";

import React, { useState, useEffect } from 'react';
import MarkdownForm from '@/components/MarkdownForm';
import Combobox from '@/components/Combobox';

interface ProductFormProps {
    userId: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ userId }) => {
    const [product, setProduct] = useState({
        title: '',
        category: '',
        description: '',
        price: '',
        userId: userId,
        condition: 'Nuevo',
        deliveryMethod: 'Entrega personal', // Nuevo campo para medio de entrega
        paymentMethod: 'Contra entrega', // Nuevo campo para método de pago
        date: '', // Almacenará la fecha y hora actuales
    });
    const [images, setImages] = useState<string[]>([]);

    const categories = ['Electronics', 'Books', 'Clothing', 'Sports'];
    const departamentos = ['San Salvador', 'La Libertad', 'Santa Ana', 'San Miguel'];

    // Captura la fecha y hora actuales automáticamente al cargar el componente
    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString(); // Formato: "dd/mm/yyyy, hh:mm:ss AM/PM"
        setProduct((prevProduct) => ({ ...prevProduct, date: formattedDate }));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const handleDescriptionChange = (value: string) => {
        setProduct({
            ...product,
            description: value,
        });
    };

    const handleCategoryChange = (selected: string) => {
        setProduct({
            ...product,
            category: selected,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).slice(0, 10);
            const newImages: string[] = [];

            filesArray.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (reader.result) {
                        newImages.push(reader.result as string);
                        if (newImages.length === filesArray.length) {
                            setImages((prevImages) => [...prevImages, ...newImages].slice(0, 10));
                        }
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Producto registrado:', product);
        console.log('Imágenes:', images);
    };

    return (
        <div className="w-full p-1 select-none">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Grid para organizar los campos en dos columnas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <Combobox
                            options={categories}
                            label="Categoría"
                            onChange={handleCategoryChange}
                        />
                    </div>

                    <div>
                        <Combobox
                            options={departamentos}
                            label="Departamentos"
                            onChange={handleCategoryChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condición</label>
                        <select
                            name="condition"
                            id="condition"
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        >
                            <option value="Nuevo">Nuevo</option>
                            <option value="Segunda Mano">Segunda Mano</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="deliveryMethod" className="block text-sm font-medium text-gray-700">Medio de entrega</label>
                        <select
                            name="deliveryMethod"
                            id="deliveryMethod"
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        >
                            <option value="Entrega personal">Entrega personal</option>
                            <option value="Envío">Envío</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Método de pago</label>
                        <select
                            name="paymentMethod"
                            id="paymentMethod"
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        >
                            <option value="Contra entrega">Contra entrega</option>
                            <option value="Depósito">Depósito</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="images" className="block text-sm font-medium text-gray-700">Imágenes</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-800 cursor-pointer file:text-white hover:file:bg-purple-700"
                        />
                    </div>
                </div>

                {images.length > 0 && (
                    <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700">Vista previa de las imágenes:</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-2">
                            {images.map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={image}
                                        alt={`Vista previa ${index + 1}`}
                                        className="h-40 w-full object-cover rounded-md shadow-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        &#x2716;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    <MarkdownForm onChange={handleDescriptionChange} />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-6 border border-transparent shadow-md text-sm font-medium rounded-md text-white bg-purple-800 cursor-pointer hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        Registrar Producto
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
