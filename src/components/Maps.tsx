'use client';

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { feature } from 'topojson-client'; // Importar la función de conversión de topojson-client

export default function LeafletMap() {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<L.Map | null>(null); // Referencia para almacenar la instancia del mapa
    const [isClient, setIsClient] = useState(false);
    const departmentLayers = useRef<{ [key: string]: L.LayerGroup }>({}); // Referencia para manejar grupos de capas de cada departamento
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null); // Estado para almacenar el departamento seleccionado
    const markerRef = useRef<L.Marker | null>(null); // Referencia para el marcador

    // Colores del círculo cromático (primarios, secundarios y terciarios)
    const colors = [
        '#FF0000', '#FF7F00', '#FFFF00', '#7FFF00', '#00FF00', '#00FF7F',
        '#0000FF', '#7F00FF', '#FF00FF', '#FF007F', '#FFA500', '#ADFF2F',
        '#FFD700', '#40E0D0'
    ];

    // Crear un ícono personalizado para el marcador (de color negro)
    const blackIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', // Ícono de marcador negro estándar
        iconSize: [25, 41], // Tamaño del icono
        iconAnchor: [12, 41], // Punto del icono que se anclará al mapa
        popupAnchor: [1, -34], // Punto relativo al icono para abrir el popup
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        shadowSize: [41, 41], // Tamaño de la sombra
    });

    // Mapa para asignar colores únicos a cada departamento
    const departmentColors: { [key: string]: string } = {};
    let colorIndex = 0;

    useEffect(() => {
        setIsClient(true); // Asegura que solo se ejecute en el cliente
    }, []);

    useEffect(() => {
        if (isClient && mapRef.current) {
            const lat = 13.698744628074294;
            const lng = -89.79988832735656;

            // Verificar si el mapa ya ha sido inicializado
            if (!mapInstance.current) {
                // Inicializar el mapa solo si no ha sido creado previamente
                mapInstance.current = L.map(mapRef.current).setView([lat, lng], 10);

                // Cargar la capa de mosaicos de OpenStreetMap
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                }).addTo(mapInstance.current);

                // Crear un marcador y agregarlo al mapa, inicialmente oculto
                markerRef.current = L.marker([lat, lng], { icon: blackIcon }).addTo(mapInstance.current);
                markerRef.current.setOpacity(0); // Hacer el marcador invisible al inicio

                // Cargar el archivo TopoJSON y convertirlo a GeoJSON
                fetch('/data/topo.json') // Cambia la ruta según la ubicación de tu archivo TopoJSON
                    .then(response => response.json())
                    .then(topoJsonData => {
                        // Convertir TopoJSON a GeoJSON
                        const geoJsonData = feature(topoJsonData, topoJsonData.objects.collection);

                        // Recorrer las características GeoJSON y agrupar por departamento
                        L.geoJSON(geoJsonData, {
                            style: (feature) => {
                                const department = feature?.properties?.D;

                                // Asignar un color único a cada departamento
                                if (!departmentColors[department]) {
                                    departmentColors[department] = colors[colorIndex % colors.length];
                                    colorIndex++;
                                }

                                return {
                                    color: '#202124', // Color del contorno negro
                                    weight: 0.2,
                                    fillColor: departmentColors[department], // Asignar el color al departamento
                                    fillOpacity: 0.2, // Opacidad inicial
                                };
                            },
                            onEachFeature: (feature, layer) => {
                                const department = feature?.properties?.D;

                                // Agrupar las capas de cada departamento
                                if (department) {
                                    if (!departmentLayers.current[department]) {
                                        departmentLayers.current[department] = L.layerGroup().addTo(mapInstance.current);
                                    }
                                    departmentLayers.current[department].addLayer(layer);
                                }

                                // Añadir evento de clic para resaltar el departamento
                                layer.on('click', () => {
                                    if (selectedDepartment === department) {
                                        // Deseleccionar si el mismo departamento ya está seleccionado
                                        setSelectedDepartment(null);
                                        resetAllLayersStyle();
                                        // Reajustar el zoom para mostrar todo el mapa
                                        mapInstance.current?.setView([lat, lng], 10); // <--- Zoom al nivel general

                                        // Ocultar el marcador
                                        markerRef.current?.setOpacity(0);
                                    } else {
                                        // Restablecer los estilos de todas las capas antes de resaltar el nuevo departamento
                                        resetAllLayersStyle(department);

                                        // Resaltar todas las capas del departamento seleccionado
                                        if (department && departmentLayers.current[department]) {
                                            departmentLayers.current[department].eachLayer((deptLayer) => {
                                                const highlightColor = departmentColors[department];
                                                (deptLayer as L.Path).setStyle({
                                                    weight: 1,
                                                    color: highlightColor, // Contorno del mismo color que el relleno
                                                    fillColor: highlightColor, // Aplicar color al seleccionar
                                                    fillOpacity: 0.3, // Opacidad al seleccionar
                                                });
                                            });
                                            setSelectedDepartment(department);
                                            // Obtener el centro del departamento seleccionado
                                            const center = layer.getBounds().getCenter();

                                            // Mover el marcador al centro y hacerlo visible
                                            markerRef.current?.setLatLng(center);
                                            markerRef.current?.setOpacity(1);

                                            // Mostrar el popup del departamento seleccionado
                                            L.popup()
                                                .setLatLng(center)
                                                .setContent(`<strong>Departamento seleccionado:</strong> <br>${department}`)
                                                .openOn(mapInstance.current);

                                            // Ajustar el zoom al área del departamento seleccionado
                                            mapInstance.current?.setView(center, 10); // <--- Aquí controlas el zoom manualmente
                                        }
                                    }
                                });
                            },
                        });
                    });
            }
        }
    }, [isClient, selectedDepartment]);

    // Función para restablecer los estilos de todas las capas
    const resetAllLayersStyle = (selectedDept = null) => {
        Object.keys(departmentLayers.current).forEach((department) => {
            departmentLayers.current[department].eachLayer((layer) => {
                const color = departmentColors[department];
                (layer as L.Path).setStyle({
                    color: '#202124', // Color del contorno negro
                    weight: 0.8,
                    fillColor: department === selectedDept ? color : 'transparent', // Solo aplicar color al seleccionado
                    fillOpacity: department === selectedDept ? 0.3 : 0, // Opacidad solo para el seleccionado
                });
            });
        });
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center w-full h-screen">
            <div className="w-full h-full" ref={mapRef}>
                {/* El mapa será renderizado dentro de este div */}
            </div>
        </div>
    );
}
