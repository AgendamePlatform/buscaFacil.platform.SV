import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import { User } from "@/interfaces/user.interface"; // Asegúrate de ajustar la ruta según la estructura de tu proyecto
import { User } from "@/interfaces/Dependientes"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    pages: {
        signIn: '/login',  // Ruta personalizada para el login
    },
    callbacks: {
        async jwt({ token, account }) {
            // Si es la primera vez que el usuario inicia sesión, guardamos el accessToken de Google
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            try {
                // Enviamos el token de Google al backend para validarlo y obtener un JWT personalizado
                const response = await fetch('http://localhost:3000/auth/google-login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ accessToken: token.accessToken }),
                });

                if (!response.ok) {
                    throw new Error('Error al validar el token con el backend');
                }

                const data = await response.json();

                // Guardar el JWT devuelto por el backend
                session.jwt = data.jwt;

                // Almacenar datos adicionales del usuario en la sesión
                session.user = {
                    ...session.user, // Mantiene las propiedades existentes como name, email, etc.
                    id: data.user.id, // Asume que el backend envía un campo 'id'
                    role: data.user.role, // Asume que el backend envía un campo 'role'
                    genero: data.user.genero, // Asume que el backend envía un campo 'genero'
                    authProvider: 'google', // Tipo de autenticación
                } as User & { authProvider: string }; // Forzar el tipo de `session.user` a `User` para incluir campos adicionales

            } catch (error) {
                console.error('Error al validar el token con el backend:', error);
                // Aquí puedes manejar el error mostrando un mensaje al usuario o redirigiendo
            }

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
