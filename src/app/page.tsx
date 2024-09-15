"use client"
import React from 'react';
import Table from '@/components/Table';

const citas = [
  { Cita: 'Extensión de uñas', Tiempo: '1h - 4h', Precio: '$30.00' },
  { Cita: 'Manicura', Tiempo: '1h', Precio: '$20.00' },
  { Cita: 'Pedicura', Tiempo: '1h 30m', Precio: '$25.00' },
  { Cita: 'Corte de cabello', Tiempo: '45m - 1h', Precio: '$15.00' },
  { Cita: 'Pedicura', Tiempo: '1h 30m', Precio: '$25.00' },
  { Cita: 'Pedicura', Tiempo: '1h 30m', Precio: '$25.00' },
  { Cita: 'Pedicura', Tiempo: '1h 30m', Precio: '$25.00' },
  { Cita: 'Pedicura', Tiempo: '1h 30m', Precio: '$25.00' },
  { Cita: 'Pedicura', Tiempo: '1h 30m', Precio: '$25.00' },
  { Cita: 'Pedicura', Tiempo: '1h 30m', Precio: '$25.00' },
  { Cita: 'Extensión de uñas', Tiempo: '1h - 4h', Precio: '$30.00' },
  { Cita: 'Manicura', Tiempo: '1h', Precio: '$20.00' },
  { Cita: 'Pedicura', Tiempo: '1h 30m', Precio: '$25.00' },
  { Cita: 'Corte de cabello', Tiempo: '45m - 1h', Precio: '$15.00' },
  { Cita: 'Pedicura', Tiempo: '1h 30m', Precio: '$25.00' },
  { Cita: 'Pedicura', Tiempo: '1h 30m', Precio: '$25.00' },
  { Cita: 'Pedicura', Tiempo: '1h 30m', Precio: '$25.00' },
  { Cita: 'Pedicura', Tiempo: '1h 30m', Precio: '$25.00' },
  { Cita: 'Pedicura', Tiempo: '1h 30m', Precio: '$25.00' },
  { Cita: 'Pedicura', Tiempo: '1h 30m', Precio: '$25.00' },
];

const headers = ['Cita', 'Tiempo', 'Precio'];

export default function Page() {
  return (
    <div className="w-full h-[85vh] flex justify-center items-center bg-bgprimaryLigth dark:bg-bgDarkOscuro select-none">
      {/* Contenedor dividido en dos secciones, cada una ocupa el 50% del alto */}
      <div className="w-full h-full flex flex-col gap-4">

        {/* Div para las tarjetas */}
        <div className="w-full h-1/2 grid grid-cols-4 gap-4 px-[4%]">
          <div className="bg-bgligth rounded-3xl border border-border"></div>
          <div className="bg-bgligth rounded-3xl border border-border"></div>
          <div className="bg-bgligth rounded-3xl border border-border"></div>
          <div className="bg-bgligth rounded-3xl border border-border"></div>
        </div>

        {/* Div para la tabla */}
        <div className="w-[90%] mx-auto h-1/2 bg-bgprimaryLigth dark:bg-bgDarkOscuro rounded-3xl border border-border p-[2%]">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">Citas</h2>
          {/* Aseguramos que la tabla ocupe el 100% del espacio restante */}
          <div className="h-full overflow-auto">
            <Table headers={headers} data={citas} rowsPerPage={3} />
          </div>
        </div>

      </div>
    </div>
  );
}
