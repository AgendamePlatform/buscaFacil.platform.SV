import React from 'react'

export default function Page() {
  return (
    <div className='w-full h-[85vh] flex justify-center items-center'>
      {/* Contenedor de la grid */}
      <div className="grid grid-cols-4 gap-4 w-full h-[85%] px-[4%]">
        {/* Bloques superiores */}
        <div className="bg-bgligth rounded-3xl border border-border"></div>
        <div className="bg-bgligth rounded-3xl border border-border"></div>
        <div className="bg-bgligth rounded-3xl border border-border"></div>
        <div className="bg-bgligth rounded-3xl border border-border"></div>

        {/* Bloque inferior grande */}
        <div className="col-span-4 bg-bgligth rounded-3xl border border-border"></div>
      </div>
    </div>
  )
}
