import React from 'react'

export default function Page() {
  return (
    <div className='w-full h-[85vh] flex justify-center items-center'>
      {/* Contenedor de la grid */}
      <div className="grid grid-cols-4 gap-4 w-full h-[85%] px-[0.2%]">
        {/* Bloques superiores */}
        <div className="bg-blue-100 rounded-lg"></div>
        <div className="bg-purple-100 rounded-lg"></div>
        <div className="bg-green-100 rounded-lg"></div>
        <div className="bg-yellow-100 rounded-lg"></div>

        {/* Bloque inferior grande */}
        <div className="col-span-4 bg-yellow-200 rounded-lg"></div>
      </div>
    </div>
  )
}
