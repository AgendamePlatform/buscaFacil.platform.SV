import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { MarketplaceItem } from '@/interfaces/marketplaceService';

// Ruta del archivo JSON
const filePath = path.join(process.cwd(), 'public', 'data', 'marketplace.json');

// Leer el archivo JSON
const readJSONFile = (): MarketplaceItem[] => {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data) as MarketplaceItem[];
};

// Guardar los datos en el archivo JSON
const writeJSONFile = (data: MarketplaceItem[]): void => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            // Obtener todos los productos
            const items = readJSONFile();
            res.status(200).json(items);
            break;

        case 'POST':
            // Crear un nuevo producto
            const newItem: MarketplaceItem = req.body;
            const allItems = readJSONFile();
            newItem.id = allItems.length ? Math.max(...allItems.map(item => item.id)) + 1 : 1;
            allItems.push(newItem);
            writeJSONFile(allItems);
            res.status(201).json(newItem);
            break;

        case 'PUT':
            // Actualizar un producto
            const { id, ...updatedData } = req.body;
            const itemsToUpdate = readJSONFile();
            const index = itemsToUpdate.findIndex(item => item.id === id);
            if (index !== -1) {
                const updatedItem = { ...itemsToUpdate[index], ...updatedData };
                itemsToUpdate[index] = updatedItem;
                writeJSONFile(itemsToUpdate);
                res.status(200).json(updatedItem);
            } else {
                res.status(404).json({ message: 'Item not found' });
            }
            break;

        case 'DELETE':
            // Eliminar un producto
            const itemId = parseInt(req.query.id as string);
            const remainingItems = readJSONFile().filter(item => item.id !== itemId);
            writeJSONFile(remainingItems);
            res.status(200).json({ message: 'Item deleted' });
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
