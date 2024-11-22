import Joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

// ------------------------------------------
// Esquema de nueva ubicación
const addLocationSchema = Joi.object()
    .keys({
        location: Joi.string()
            .max(100)
            .required()
            .description('Nombre de la ubicación'),
        latitude: Joi.number()
            .min(-90)
            .max(90)
            .precision(7)
            .allow(null, '') // Permitimos strings vacíos y valores null, porque 'number' no admite string vacío
            .optional()
            .description('Coordenadas de latitud'),
        longitude: Joi.number()
            .min(-180)
            .max(180)
            .precision(7)
            .allow(null, '') // Permitimos strings vacíos y valores null, porque 'number' no admite string vacío
            .optional()
            .description('Coordenadas de longitud'),
        description: Joi.string()
            .max(255)
            .allow(null, '')
            .optional()
            .description('Descripción de la ubicación'),
    })
    .messages(joiErrorMessages);

export default addLocationSchema;
