'use client';

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
                            color: '#1a0f3a', // Color del borde
                            weight: 2, // Grosor de la línea
                            opacity: 0.7, // Opacidad
                            fillColor: '#1a0f3a',
                            fillOpacity: 0.05, // Relleno del contorno
                        },
                    }).addTo(map);
                });

            // Agregar interacción para seleccionar nuevos puntos en el mapa
            map.on('click', function (e: L.LeafletMouseEvent) {
                const { lat, lng } = e.latlng;
                setSelectedPosition({ lat, lng });

                // Eliminar todos los marcadores anteriores antes de añadir uno nuevo
                map.eachLayer(function (layer) {
                    // Asegurarse de que el layer tenga un popup antes de acceder a getContent()
                    if (layer instanceof L.Marker) {
                        const popup = layer.getPopup();
                        const content = popup?.getContent();

                        // Verificar si el contenido es de tipo string antes de usar .includes()
                        if (typeof content === 'string' && !content.includes('Mi ubicación')) {
                            map.removeLayer(layer);
                        }
                    }
                });

                // Colocar un nuevo marcador en la ubicación seleccionada con un efecto de vidrio borroso
                L.marker([lat, lng])
                    .addTo(map)
                    .bindPopup(
                        `<div class="custom-popup">
                            <b>Coordenadas seleccionadas</b><br>
                            Latitud: ${lat}<br>
                            Longitud: ${lng}
                        </div>`, { closeButton: false }
                    )
                    .openPopup();
            });
        }
    }, [isClient]);

    return (
        <div className="flex-1 flex flex-col items-center justify-center w-full h-screen">
            {/* Mapa que ocupa todo el espacio */}
            <div className="w-full h-full" ref={mapRef}>
                {/* El mapa será renderizado dentro de este div */}
            </div>
        </div>
    );
}
