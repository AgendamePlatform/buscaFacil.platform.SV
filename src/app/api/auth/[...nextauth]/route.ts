// importo tod
import NextAuth from "next-auth";
// importo de Google
import Google from "next-auth/providers/google";

//esto es para la atenticacion con google, recivire peticiones get y post
const handler = NextAuth({
    providers: [
        Google({
            // le dgo qe si o si sera unn tipo string, por el error de lo de vacio
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    pages: {
        signIn: '/Login',  // Ruta personalizada para el login
    },
})

export { handler as GET, handler as POST }