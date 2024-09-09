import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Importación de las fuentes locales
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadatos de la página
export const metadata: Metadata = {
  title: "Mi App",
  description: "App creada con Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Contenedor Principal */}
        <div className="flex h-screen w-screen">
          {/* Sidebar izquierdo */}
          <aside className="w-16 md:w-20 bg-negroNav flex flex-col justify-between p-4 text-white">
            {/* Contenedor de iconos */}
            <div className="flex flex-col space-y-6">
              <button className="hover:bg-gray-700 p-2 rounded">🏠</button>
              <button className="hover:bg-gray-700 p-2 rounded">📊</button>
              <button className="hover:bg-gray-700 p-2 rounded">⚙️</button>
            </div>
          </aside>

          {/* Contenido Principal */}
          <main className="flex-1 flex flex-col">
            {/* Header */}
            <header className="w-full h-16 bg-white shadow flex justify-between items-center p-4">
              {/* Filtro y barra de búsqueda */}
              <div className="flex items-center space-x-2">
                <button className="bg-negroNav text-white p-2 rounded-lg">Filtrar por</button>
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="bg-gray-100 border border-gray-300 rounded-lg p-2 w-64 focus:outline-none focus:border-gray-500"
                />
                <button className="p-2">🔍</button>
              </div>

              {/* Iconos de la derecha */}
              <div className="flex items-center space-x-4">
                <button className="relative">
                  🗒️
                  <span className="absolute top-0 right-0 text-xs text-white bg-orange-400 rounded-full h-5 w-5 flex justify-center items-center">3</span>
                </button>
                <button className="p-2">🌓</button>
                <button className="p-2">👤</button>
              </div>
            </header>

            {/* Contenido */}
            <section className="flex-1 p-4 bg-gray-50">
              {/* Aquí va el contenido principal */}
              {children}
            </section>
          </main>
        </div>
      </body>
    </html>
  );
}
