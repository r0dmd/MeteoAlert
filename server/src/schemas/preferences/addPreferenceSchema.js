import Joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

// ------------------------------------------
// Esquema de validación para añadir una preferencia
const addPreferenceSchema = Joi.object({
    type: Joi.string()
        .valid('precipitación', 'temperatura', 'viento')
        .required(),
    threshold: Joi.number().precision(2).allow(null, '').optional(),
}).messages(joiErrorMessages);

export default addPreferenceSchema;
