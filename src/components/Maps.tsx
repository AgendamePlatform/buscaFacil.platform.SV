'use client'; // Asegura que esto se ejecute en el cliente

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Importa el CSS de Leaflet

export default function LeafletMap() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false); // Estado para saber si estamos en el cliente
    const [selectedPosition, setSelectedPosition] = useState<{ lat: number, lng: number } | null>(null);

    useEffect(() => {
        setIsClient(true); // Asegura que solo se ejecute en el cliente
    }, []);

    useEffect(() => {
        if (isClient && mapRef.current) { // Solo ejecuta si estamos en el cliente y el mapa está disponible
            const lat = 13.698744628074294; // Coordenada de latitud
            const lng = -89.79988832735656; // Coordenada de longitud

            // Inicializar el mapa
            const map = L.map(mapRef.current).setView([lat, lng], 10);

            // Cargar la capa de mosaicos de OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            // Agregar un marcador en la ubicación especificada con una ventana emergente personalizada
            L.marker([lat, lng]).addTo(map)
                .bindPopup('<b>Mi ubicación</b><br>13.698744628074294, -89.79988832735656', { closeButton: false })
                .openPopup();

            // Cargar el contorno de El Salvador desde el archivo GeoJSON usando `fetch`
            fetch('/data/geoBoundaries-SLV-ADM0_simplified.geojson')
                .then((response) => response.json())
                .then((geoJsonData) => {
                    // Agregar el contorno de El Salvador al mapa
                    L.geoJSON(geoJsonData, {
                        style: {
                            color: 'blue', // Color del borde
                            weight: 2, // Grosor de la línea
                            opacity: 0.7, // Opacidad
                            fillColor: 'blue',
                            fillOpacity: 0.1, // Relleno del contorno
                        },
                    }).addTo(map);
                });

            // Agregar interacción para seleccionar nuevos puntos en el mapa
            map.on('click', function (e: L.LeafletMouseEvent) {
                const { lat, lng } = e.latlng;
                setSelectedPosition({ lat, lng });

                // Eliminar todos los marcadores anteriores
                map.eachLayer(function (layer) {
                    if (layer instanceof L.Marker) {
                        map.removeLayer(layer);
                    }
                });

                // Colocar un nuevo marcador en la ubicación seleccionada
                L.marker([lat, lng])
                    .addTo(map)
                    .bindPopup(`<b>Coordenadas seleccionadas</b><br>Latitud: ${lat}<br>Longitud: ${lng}`, { closeButton: false })
                    .openPopup();
            });
        }
    }, [isClient]);

    return (
        <div className="p-4 flex flex-col items-center justify-center h-screen">
            {/* Mapa en una tarjeta con estilo TailwindCSS */}
            <div className="w-full h-full rounded-lg shadow-lg border border-gray-300 overflow-hidden mb-4" ref={mapRef}>
                {/* El mapa será renderizado dentro de este div */}
            </div>
            {selectedPosition && (
                <div className="text-center bg-gray-50 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Coordenadas seleccionadas</h3>
                    <p><strong>Latitud:</strong> {selectedPosition.lat}</p>
                    <p><strong>Longitud:</strong> {selectedPosition.lng}</p>
                </div>
            )}
        </div>
    );
}
