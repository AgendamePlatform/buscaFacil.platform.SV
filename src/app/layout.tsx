import type { Metadata } from "next";
import ClientLayout from "./layouts/ClientLayout";
import { Providers } from '@/app/Providers'

// Metadatos de la página
export const metadata: Metadata = {
  title: "Busca Facil",
  description: "Plataforma para poder conectar con servidores de servicios y productos con los clientes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white">
        {/* Aquí renderizamos el ClientLayout */}
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
