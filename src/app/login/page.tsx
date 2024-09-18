'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isRegistering, setIsRegistering] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        fechaNacimiento: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <div className="text-white text-center mt-5">Cargando...</div>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const endpoint = isRegistering ? 'register' : 'login';
            const bodyData = isRegistering ? formData : { email: formData.email, password: formData.password };

            const response = await fetch(`http://localhost:4000/auth/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Error al ${isRegistering ? 'registrar' : 'iniciar sesión'}`);
            }

            if (isRegistering) {
                setSuccess('Usuario registrado con éxito. Ahora puedes iniciar sesión.');
            } else {
                // Guardar token y usuario en localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                setSuccess('Inicio de sesión exitoso.');
                router.push('/');
            }
        } catch (error: any) {
            setError(error.message || 'Error desconocido');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Sección de Imagen */}
                <div className="hidden md:flex md:w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(/svg/login.svg)' }}>
                </div>

                {/* Sección del Formulario */}
                <div className="w-full md:w-1/2 p-8">
                    <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
                        {isRegistering ? 'Registrar Cuenta' : 'Iniciar Sesión'}
                    </h1>

                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {success && <p className="text-green-500 mb-4">{success}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {isRegistering && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-left text-gray-600 mb-1">Nombre</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                                        placeholder="Tu apellido"
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
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                                        required
                                    />
                                </div>
                            </div>
                        )}
                        <div>
                            <label htmlFor="email" className="block text-left text-gray-600 mb-1">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                                placeholder="Contraseña"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                        >
                            {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <h2 className="text-gray-600 mb-4">O inicia sesión con</h2>
                        <button
                            onClick={() => signIn('google')}
                            className="bg-red-500 text-white w-full py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Iniciar sesión con Google
                        </button>
                        <button
                            onClick={() => setIsRegistering(!isRegistering)}
                            className="text-purple-600 mt-4"
                        >
                            {isRegistering ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes una cuenta? Regístrate'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
