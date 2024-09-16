'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        fechaNacimiento: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Redirigimos si el usuario ya está autenticado
    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/'); // Redirigir a la página principal
        }
    }, [status, router]);

    // Si el usuario está autenticándose, mostramos un mensaje de carga
    if (status === 'loading') {
        return <div className="text-white text-center mt-5">Cargando...</div>;
    }

    // Maneja los cambios en los campos del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Limpiar errores previos
        setSuccess(''); // Limpiar mensajes previos

        try {
            // Enviar los datos al backend para registrar al usuario
            const response = await fetch('http://localhost:4000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al registrar el usuario');
            }
            setSuccess('Usuario registrado con éxito. Ahora puedes iniciar sesión.');
            alert("usuario creado" + data)
        } catch (error) {
            // setError();
            alert("usuario no creado " + error)
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Iniciar Sesión</h1>

                {/* Mensajes de éxito y error */}
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}

                {/* Formulario de registro manual */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="firstName" className="block text-left text-gray-600 mb-1">Nombre</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Tu nombre"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-left text-gray-600 mb-1">Apellido</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Tu apellido"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-left text-gray-600 mb-1">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="correo@ejemplo.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-left text-gray-600 mb-1">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Contraseña"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-left text-gray-600 mb-1">Número de Teléfono</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="123-456-7890"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="fechaNacimiento" className="block text-left text-gray-600 mb-1">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            id="fechaNacimiento"
                            name="fechaNacimiento"
                            value={formData.fechaNacimiento}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Registrarse
                    </button>
                </form>

                <div className="mt-6 border-t border-gray-300 pt-6 text-center">
                    <h2 className="text-gray-600 mb-4">O inicia sesión con</h2>
                    <button
                        onClick={() => signIn('google')}
                        className="bg-red-500 text-white w-full py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Iniciar sesión con Google
                    </button>
                </div>
            </div>
        </div>
    );
}
