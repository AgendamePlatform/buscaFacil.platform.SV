import { signIn } from 'next-auth/react';

export default function page() {
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
