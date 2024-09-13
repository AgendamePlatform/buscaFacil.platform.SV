"use client"

import React from 'react';
import Table from '@/components/Table'

const citas = [
  { Cita: 'Extensión de uñas', Tiempo: '1h - 4h', Precio: '$30.00' },
  { Cita: 'Manicura', Tiempo: '1h', Precio: '$20.00' },
  { Cita: 'Pedicura', Tiempo: '1h 30m', Precio: '$25.00' },
  { Cita: 'Corte de cabello', Tiempo: '45m - 1h', Precio: '$15.00' },
];

const headers = ['Cita', 'Tiempo', 'Precio'];

export default function Page() {
  return (
    <div className="w-full h-[85vh] flex justify-center items-center bg-bgligth dark:bg-bgdark">
      {/* Contenedor de la grid */}
      <div className="grid grid-cols-4 gap-4 w-full h-[85%] px-[4%]">
        {/* Bloques superiores */}
        <div className="bg-bgligth rounded-3xl border border-border"></div>
        <div className="bg-bgligth rounded-3xl border border-border"></div>
        <div className="bg-bgligth rounded-3xl border border-border"></div>
        <div className="bg-bgligth rounded-3xl border border-border"></div>

        {/* Bloque inferior grande con la tabla */}
        <div className="col-span-4 bg-bgligth rounded-3xl border border-border p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">Citas</h2>
          <Table headers={headers} data={citas} rowsPerPage={3} />
        </div>
      </div>
    </div>
  );
}
