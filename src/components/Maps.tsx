'use client'; // Asegura que esto se ejecute en el cliente

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Importa el CSS de Leaflet

export default function LeafletMap() {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mapRef.current) {
            const latEmpresa = 13.68731618691775; // Coordenadas de la empresa
            const lngEmpresa = -89.81834427603658;
            const radioPermitido = 200; // Radio en metros

            // Inicializar el mapa
            const map = L.map(mapRef.current).setView([latEmpresa, lngEmpresa], 17);

            // Cargar la capa de mapas
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            // Agregar marcador de la empresa
            L.marker([latEmpresa, lngEmpresa])
                .addTo(map)
                .bindPopup('<b>QR CHECK ✔</b><br>Ubicación principal.')
                .openPopup();

            // Dibujar círculo que representa el rango permitido
            L.circle([latEmpresa, lngEmpresa], {
                color: 'green',
                fillColor: '#57ef57a3',
                fillOpacity: 0.3,
                radius: radioPermitido,
            }).addTo(map);

            // Array de trabajadores ficticios
            const trabajadores = [
                { nombre: 'Juan Pérez', lat: 13.68731618691775, lng: -89.81805008686588 },
                { nombre: 'Ana López', lat: 13.6918, lng: -89.8184 },
                { nombre: 'Carlos Martínez', lat: 13.6917, lng: -89.8185 },
                { nombre: 'María Rodríguez', lat: 13.6919, lng: -89.8183 },
                { nombre: 'Luis Gómez', lat: 13.692, lng: -89.8186 },
            ];

            // Función para calcular la distancia entre dos puntos (coordenadas en grados)
            const calcularDistancia = (latitud1: number, longitud1: number, latitud2: number, longitud2: number) => {
                const radioTierra = 6371e3; // Radio de la Tierra en metros
                const latitudRadianes1 = (latitud1 * Math.PI) / 180;
                const latitudRadianes2 = (latitud2 * Math.PI) / 180;
                const diferenciaLatitud = ((latitud2 - latitud1) * Math.PI) / 180;
                const diferenciaLongitud = ((longitud2 - longitud1) * Math.PI) / 180;

                const a =
                    Math.sin(diferenciaLatitud / 2) * Math.sin(diferenciaLatitud / 2) +
                    Math.cos(latitudRadianes1) * Math.cos(latitudRadianes2) *
                    Math.sin(diferenciaLongitud / 2) * Math.sin(diferenciaLongitud / 2);

                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

                return radioTierra * c;
            }

            // Procesar cada trabajador y agregarlo al mapa
            trabajadores.forEach((trabajador) => {
                const distancia = calcularDistancia(latEmpresa, lngEmpresa, trabajador.lat, trabajador.lng);

                // Crear el marcador en el mapa para el trabajador
                const marker = L.marker([trabajador.lat, trabajador.lng], {
                    icon: L.divIcon({ className: 'custom-marker' }),
                })
                    .addTo(map)
                    .bindPopup(`<b>${trabajador.nombre}</b><br>Distancia a la empresa: ${distancia.toFixed(2)} metros`);

                // Aquí podrías agregar más lógica para manejar los trabajadores
            });
        }
    }, []);

    return (
        <div style={{ width: '100%', height: '500px' }} ref={mapRef}>
            {/* El mapa será renderizado dentro de este div */}
        </div>
    );
}
