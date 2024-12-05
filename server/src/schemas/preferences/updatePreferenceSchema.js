import Joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

// ------------------------------------------
// Esquema de validación para actualizar una preferencia
const updatePreferenceSchema = Joi.object({
    threshold: Joi.number().precision(2).allow(null, '').optional(),
}).messages(joiErrorMessages);

export default updatePreferenceSchema;
