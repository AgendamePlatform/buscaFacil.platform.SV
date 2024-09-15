import React, { useState, useEffect } from 'react';

interface TableProps {
    headers: string[]; // Los encabezados de la tabla
    data: any[]; // Los datos de la tabla
    rowsPerPage: number; // Número de filas por página
}

const Table: React.FC<TableProps> = ({ headers, data, rowsPerPage }) => {
    const [filteredData, setFilteredData] = useState(data); // Datos filtrados
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Orden de los datos
    const [searchQuery, setSearchQuery] = useState(''); // Búsqueda por nombre

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    useEffect(() => {
        // Filtrar datos cuando cambie el campo de búsqueda
        const filtered = data.filter((row) =>
            headers.some((key) =>
                row[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setFilteredData(filtered);
        setCurrentPage(1); // Reinicia a la primera página cuando se filtra
    }, [searchQuery, data, headers]);

    const handleSort = (header: string) => {
        const sortedData = [...filteredData].sort((a, b) => {
            const valueA = a[header];
            const valueB = b[header];
            if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setFilteredData(sortedData);
    };

    const handlePagination = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

    return (
        <div className="w-full flex flex-col h-full">
            {/* Input para buscar */}
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-bgligth dark:bg-gray-700 dark:text-white border text-gray-600 dark:border-gray-600 rounded-lg p-4  pl-12 focus:outline-none  focus:ring-2 focus:ring-gray-300  focus:border-azulito h-12 transition duration-300"
                />
            </div>

            {/* Contenedor para hacer scroll en la tabla */}
            <div className="flex-1 overflow-auto transition-all">
                <table className="min-w-full bg-white table-fixed transition-all rounded-3xl">
                    <thead className='bg-azulito'>
                        <tr className="bg-azulito text-white">
                            {headers.map((header) => (
                                <th
                                    key={header}
                                    className="p-3 text-left cursor-pointer text-white"
                                    onClick={() => handleSort(header)}
                                    style={{ minWidth: '150px' }}  // Ancho mínimo
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length === 0 ? (
                            <tr>
                                <td className="text-center p-3" colSpan={headers.length}>
                                    No hay resultados.
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((row, index) => (
                                <tr
                                    key={index}
                                    className="border-b hover:bg-purple-200 cursor-pointer transition-all"
                                >
                                    {headers.map((header) => (
                                        <td key={header} className="p-3" style={{ minWidth: '150px' }}>
                                            {row[header]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Botones de paginación fijos */}
            <div className="flex justify-center items-center py-4 sticky bottom-0 bg-white dark:bg-gray-800 gap-4">
                <button
                    onClick={() => handlePagination(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 bg-morado text-white rounded-lg disabled:opacity-50 bg-azulito transition hover:bg-blue-600"
                >
                    Anterior
                </button>
                <span className="text-sm dark:text-white">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    onClick={() => handlePagination(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 bg-morado text-white rounded-lg disabled:opacity-50 bg-azulito transition hover:bg-blue-600"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default Table;
