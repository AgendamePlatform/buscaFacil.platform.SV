'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Redirigimos si el usuario ya está autenticado
    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/'); // Redirigir a la página principal
        }
    }, [status, router]);

    // Si el usuario está autenticándose, mostramos un mensaje de carga
    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl mb-4">Inicia sesión con Google</h1>
                <button
                    onClick={() => signIn('google')}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}
