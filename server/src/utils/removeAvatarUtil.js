import path from 'path';
import fs from 'fs/promises';
import { generateErrorUtil } from './index.js';

const { UPLOADS_DIR } = process.env;

// ------------------------------------------
// Función que elimina una imagen en la carpeta uploads
const removeAvatarUtil = async (fileName) => {
    try {
        // Generamos la ruta absoluta del archivo a eliminar
        const avatarPath = path.join(process.cwd(), UPLOADS_DIR, fileName);

        // Intentamos acceder al archivo, y lo eliminamos
        try {
            await fs.access(avatarPath);
            await fs.unlink(avatarPath);
        } catch {
            // Si hubo error en el acceso porque no exsite la imagen, finalizamos la función
            return;
        }
    } catch (err) {
        console.error(err);
        generateErrorUtil('Error al eliminar archivo del disco', 500);
    }
};

export default removeAvatarUtil;
