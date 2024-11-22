import { validateSchemaUtil, generateErrorUtil } from '../../utils/index.js';
import { addLocationSchema } from '../../schemas/locations/index.js';
import {
    addLocationModel,
    selectLocationByUserIdAndNameModel,
} from '../../models/locations/index.js';

// ------------------------------------------
// Función que le permite a un usuario añadir una ubicación para sus alertas
const addLocationController = async (req, res, next) => {
    try {
        await validateSchemaUtil(addLocationSchema, req.body);

        // Usamos let porque necesitamos convertir posibles strings vacíos de latitud y longitud a null ya que el campo de la BD, al ser número y decimal, admite null pero no admite strings vacíos
        let { location, latitude, longitude, description } = req.body;
        latitude = latitude === '' ? null : latitude;
        longitude = longitude === '' ? null : longitude;

        // Verificar si la ubicación ya existe, devuelve true o false
        const locationExists = await selectLocationByUserIdAndNameModel(
            req.user.id,
            location,
        );

        if (locationExists) {
            generateErrorUtil('Ya has añadido esta ubicación', 409);
        }

        // Pasamos los datos al modelo
        const locationId = await addLocationModel(
            req.user.id,
            location,
            latitude,
            longitude,
            description,
        );

        if (locationId < 1)
            generateErrorUtil(
                'Error al añadir ubicación en la base de datos',
                400,
            );

        res.status(201).send({
            status: 'ok',
            message: 'Ubicación añadida con éxito',
        });
    } catch (err) {
        next(err);
    }
};
export default addLocationController;
