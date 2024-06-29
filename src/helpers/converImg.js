import fs from 'fs';
import path from 'path';

// Función para convertir imagen a base64
export function convertImageToBase64(buffer) {
    const base64Data = buffer.toString('base64');
    const base64Image = `data:image/jpeg;base64,${base64Data}`; // Ajusta el tipo de imagen según corresponda
    return base64Image;
}
