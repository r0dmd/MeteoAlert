import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';

import { generateErrorUtil } from './index.js';

const { UPLOADS_DIR } = process.env;

// ------------------------------------------
// Función que guarda una foto en la carpeta uploads. Recibe la imagen y un ancho en píxeles
const saveAvatarUtil = async (avatar, width) => {
    try {
        // Generamos la ruta absoluta al directorio de subida de archivos
        const uploadsPath = path.join(process.cwd(), UPLOADS_DIR);

        // Comprobamos que el directorio existe
        try {
            await fs.access(uploadsPath);
        } catch {
            // Si el acceso lanza error, significa que no existe, así que lo generamos
            // NOTA: No hace falta pasarle 'err' a este catch
            await fs.mkdir(uploadsPath);
        }

        // Generamos imagen con Sharp a partir del avatar proporcionado, y finalmente la guardamos en la carpeta de subida de archivos
        const sharpAvatar = sharp(avatar.data);
        sharpAvatar.resize(width);

        const avatarName = `${crypto.randomUUID()}.jpg`;

        const avatarPath = path.join(uploadsPath, avatarName);

        await sharpAvatar.toFile(avatarPath);

        // Retornamos el nombre con el que lo guardamos
        return avatarName;
    } catch (err) {
        console.error(err);
        generateErrorUtil('Error al guardar la imagen en disco', 500);
    }
};

export default saveAvatarUtil;
