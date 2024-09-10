import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
            // Si es la primera vez que el usuario inicia sesión, guardamos el accessToken
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            // Pasamos el token de acceso a la sesión
            session.accessToken = token.accessToken;

            // Guardamos el token en el localStorage del cliente
            if (typeof window !== 'undefined') {
                localStorage.setItem('accessToken', session.accessToken as string);
            }

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
