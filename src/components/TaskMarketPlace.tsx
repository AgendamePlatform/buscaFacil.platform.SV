import React from 'react';
import { FaCheckCircle, FaRecycle } from 'react-icons/fa'; // Iconos para nuevo y segunda mano
import { GiAutoRepair } from 'react-icons/gi'; // Icono para categoría
import { MdOutlineLocalShipping } from 'react-icons/md'; // Icono para transporte

interface PublicationCardProps {
    title: string;
    department: string;
    publicationDate: string;
    details: string;
    isNew: boolean;
    images: string[];
    category: string;
    transport: string;
    userName: string;
    userImage: string;
    price: number;
    discountPrice?: number; // Opcional para mostrar un precio con descuento
}

const TaskMarketPlace: React.FC<PublicationCardProps> = ({
    title,
    department,
    publicationDate,
    details,
    isNew,
    images,
    category,
    transport,
    userName,
    userImage,
    price,
    discountPrice,
}) => {
    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg border border-gray-100 shadow-sm p-6 flex space-x-6 mb-6 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.01] relative">
            {/* Información del usuario en la esquina superior derecha */}
            <div className="absolute top-4 right-4 flex items-center space-x-2">
                <img src={userImage} alt={userName} className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 shadow-md" />
                <p className="text-gray-800 dark:text-white font-medium">{userName}</p>
            </div>

            {/* Imagen principal */}
            <div className="w-1/3 rounded-lg overflow-hidden flex items-center justify-center bg-gray-200 border ">
                {images.length > 0 ? (
                    <img src={images[0]} alt={title} className="object-cover h-full w-full" />
                ) : (
                    <div className="text-gray-400">Sin imagen</div>
                )}
            </div>

            {/* Detalles de la publicación */}
            <div className="w-2/3 flex flex-col justify-between">
                {/* Título y detalles */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-300">{department} - {publicationDate}</p>
                    <p className="mt-4 text-gray-700 dark:text-gray-300 line-clamp-3">{details}</p>

                    {/* Mostrar el precio */}
                    <div className="mt-4">
                        {discountPrice ? (
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl font-bold text-red-600">${discountPrice}</span>
                                <span className="text-sm text-gray-500 line-through">${price}</span>
                            </div>
                        ) : (
                            <span className="text-2xl font-bold text-gray-800 dark:text-white">${price}</span>
                        )}
                    </div>

                    {/* Información adicional */}
                    <div className="flex items-center mt-4 space-x-4">
                        {/* Icono para nuevo o segunda mano */}
                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-white font-semibold ${isNew ? 'bg-purple-600' : 'bg-green-500'}`}>
                            {isNew ? <FaCheckCircle size={25} /> : <FaRecycle size={25} />}
                            <span>{isNew ? 'Nuevo' : 'Segunda'}</span>
                        </div>

                        {/* Iconos adicionales */}
                        <div className="flex items-center space-x-2">
                            <GiAutoRepair size={25} className="text-azulito dark:text-gray-400" />
                            <p className="text-sm text-gray-600 dark:text-gray-400">Categoría: <span className="font-medium">{category}</span></p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <MdOutlineLocalShipping size={25} className="text-gray-600 dark:text-gray-400" />
                            <p className="text-sm text-azulito dark:text-gray-400">Transporte: <span className="font-medium">{transport}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskMarketPlace;
