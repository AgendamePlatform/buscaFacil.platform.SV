'use client';

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { feature } from 'topojson-client'; // Importar la función de conversión de topojson-client

export default function LeafletMap() {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<L.Map | null>(null);
    const [isClient, setIsClient] = useState(false);
    const departmentLayers = useRef<{ [key: string]: L.LayerGroup }>({});
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
    const markerRef = useRef<L.Marker | null>(null);

    const colors = [
        '#FF0000', '#FF7F00', '#FFFF00', '#7FFF00', '#00FF00', '#00FF7F',
        '#0000FF', '#7F00FF', '#FF00FF', '#FF007F', '#FFA500', '#ADFF2F',
        '#FFD700', '#40E0D0'
    ];

    const blackIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        shadowSize: [41, 41],
    });

    const departmentColors: { [key: string]: string } = {};
    let colorIndex = 0;

    useEffect(() => {
        setIsClient(true); // Solo se ejecuta en el cliente
    }, []);

    useEffect(() => {
        if (isClient && mapRef.current) {
            const lat = 13.698744628074294;
            const lng = -89.79988832735656;

            if (!mapInstance.current) {
                mapInstance.current = L.map(mapRef.current).setView([lat, lng], 10);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                }).addTo(mapInstance.current);

                markerRef.current = L.marker([lat, lng], { icon: blackIcon }).addTo(mapInstance.current);
                markerRef.current.setOpacity(0);

                fetch('/data/topo.json')
                    .then(response => response.json())
                    .then(topoJsonData => {
                        const geoJsonData = feature(topoJsonData, topoJsonData.objects.collection);

                        L.geoJSON(geoJsonData, {
                            style: (feature) => {
                                const department = feature?.properties?.D;
                                if (!departmentColors[department]) {
                                    departmentColors[department] = colors[colorIndex % colors.length];
                                    colorIndex++;
                                }
                                return {
                                    color: '#202124',
                                    weight: 0.2,
                                    fillColor: departmentColors[department],
                                    fillOpacity: 0.2,
                                };
                            },
                            onEachFeature: (feature, layer) => {
                                const department = feature?.properties?.D;
                                if (department) {
                                    if (!departmentLayers.current[department]) {
                                        departmentLayers.current[department] = L.layerGroup().addTo(mapInstance.current!);
                                    }
                                    departmentLayers.current[department].addLayer(layer);
                                }

                                layer.on('click', () => {
                                    if (selectedDepartment === department) {
                                        setSelectedDepartment(null);
                                        resetAllLayersStyle();
                                        mapInstance.current?.setView([lat, lng], 10);
                                        markerRef.current?.setOpacity(0);
                                    } else {
                                        resetAllLayersStyle(department);
                                        if (departmentLayers.current[department]) {
                                            departmentLayers.current[department].eachLayer((deptLayer) => {
                                                const highlightColor = departmentColors[department];
                                                (deptLayer as L.Path).setStyle({
                                                    weight: 1,
                                                    color: highlightColor,
                                                    fillColor: highlightColor,
                                                    fillOpacity: 0.3,
                                                });
                                            });
                                            setSelectedDepartment(department);
                                            const center = (layer as L.GeoJSON).getBounds().getCenter();

                                            markerRef.current?.setLatLng(center);
                                            markerRef.current?.setOpacity(1);

                                            L.popup()
                                                .setLatLng(center)
                                                .setContent(`<strong>Departamento seleccionado:</strong> <br>${department}`)
                                                .openOn(mapInstance.current as L.Map);

                                            mapInstance.current?.setView(center, 10);
                                        }
                                    }
                                });
                            },
                        });
                    });
            }
        }
    }, [isClient, selectedDepartment]);

    const resetAllLayersStyle = (selectedDept: string | null = null) => {
        Object.keys(departmentLayers.current).forEach((department) => {
            departmentLayers.current[department].eachLayer((layer) => {
                const color = departmentColors[department];
                (layer as L.Path).setStyle({
                    color: '#202124',
                    weight: 0.8,
                    fillColor: department === selectedDept ? color : 'transparent',
                    fillOpacity: department === selectedDept ? 0.3 : 0,
                });
            });
        });
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center w-full h-screen">
            <div className="w-full h-full bg-white dark:bg-gray-900 shadow-lg rounded-lg" ref={mapRef} >
                {/* El mapa será renderizado dentro de este div */}
            </div>
        </div>
    );
}
