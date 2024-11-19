import Joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

// ------------------------------------------
// Esquema de validación para añadir una preferencia
const addPreferenceSchema = Joi.object({
    type: Joi.string()
        .valid(
            'lluvia',
            'tormenta',
            'inundación',
            'nieve',
            'granizo',
            'hielo',
            'deslizamiento',
            'terremoto',
            'viento',
            'polen',
            'radiación',
            'incendio',
            'niebla',
            'oleaje',
            'frío extremo',
            'calor extremo',
        )
        .required(),
    threshold: Joi.number().precision(2).allow(null, '').optional(),
}).messages(joiErrorMessages);

export default addPreferenceSchema;
