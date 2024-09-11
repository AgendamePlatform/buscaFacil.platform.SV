import React from 'react';

const ErrorPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-full bg-gradient-to-r px-6 ">
            {/* Imagen SVG */}
            <div className="w-full flex justify-center">
                <img
                    src="/svg/errorServer.svg"
                    alt="Error de servidor"
                    className="w-80 h-80 transform hover:scale-105 transition-transform duration-500 ease-in-out"
                />
            </div>

            {/* Texto y botón */}
            <div className="text-center">
                <h1 className="text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
                    Oops! <br /> Something went wrong.
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Ocurrió un problema en el servidor. Estamos trabajando en solucionarlo. Por favor, inténtalo nuevamente más tarde.
                </p>
                {/* Botón de recarga */}
                <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg rounded-full shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform duration-300 ease-in-out transform hover:scale-105"
                >
                    Refrescar
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
