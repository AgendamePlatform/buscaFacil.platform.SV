import fs from 'fs';
import path from 'path';
// import { MarketplaceItem } from './marketplace';
import { MarketplaceItem } from '@/interfaces/marketplaceService'

// Ruta del archivo JSON
const filePath = path.join('C:\\Users\\Jeffrey Mardoqueo\\Documents\\buscaFacil-platform\\public\\data\\marketplace.json');

// Leer el archivo JSON
const readJSONFile = (): MarketplaceItem[] => {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data) as MarketplaceItem[];
};

// Guardar los datos en el archivo JSON
const writeJSONFile = (data: MarketplaceItem[]): void => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// Crear un nuevo item
export const createItem = (newItem: MarketplaceItem): MarketplaceItem => {
    const items = readJSONFile();
    newItem.id = items.length ? Math.max(...items.map(item => item.id)) + 1 : 1;
    items.push(newItem);
    writeJSONFile(items);
    return newItem;
};

// Leer todos los items
export const getAllItems = (): MarketplaceItem[] => {
    return readJSONFile();
};

// Leer un item por su ID
export const getItemById = (id: number): MarketplaceItem | null => {
    const items = readJSONFile();
    const item = items.find(item => item.id === id);
    return item || null;
};

// Actualizar un item por su ID
export const updateItem = (id: number, updatedItem: Partial<MarketplaceItem>): MarketplaceItem | null => {
    const items = readJSONFile();
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        const currentItem = items[index];
        items[index] = { ...currentItem, ...updatedItem };
        writeJSONFile(items);
        return items[index];
    }
    return null;
};

// Eliminar un item por su ID
export const deleteItem = (id: number): boolean => {
    const items = readJSONFile();
    const newItems = items.filter(item => item.id !== id);
    if (newItems.length !== items.length) {
        writeJSONFile(newItems);
        return true;
    }
    return false;
};
