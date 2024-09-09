import type { Metadata } from "next";
import ClientLayout from "./layouts/ClientLayout";

// Metadatos de la página
export const metadata: Metadata = {
  title: "Agendame SV",
  description: "Plataforma para poder conectar con servidores de servicios y productos con los clientes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        {/* Aquí renderizamos el ClientLayout */}
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
