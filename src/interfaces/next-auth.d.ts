// src/interfaces/next-auth.d.ts
import NextAuth from 'next-auth';
import { User } from '@/interfaces/Dependientes'; // Ruta donde has definido la interfaz

declare module 'next-auth' {
    interface Session {
        jwt?: string;
        user: User & { authProvider?: string }; // Extiende el usuario para incluir authProvider
    }
}

// Extender el Tipo Session: Vamos a utilizar la capacidad
//  de TypeScript de declarar módulos para extender la
//  interfaz de Session y agregarle la propiedad jwt.