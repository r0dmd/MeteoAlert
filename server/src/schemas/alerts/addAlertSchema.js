import Joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

// ------------------------------------------
// Esquema de validación para añadir una alerta
const addAlertSchema = Joi.object({
    type: Joi.string()
        .valid('precipitación', 'temperatura', 'viento')
        .required(),
    value: Joi.number().precision(2).allow(null, '').optional(),
}).messages(joiErrorMessages);

export default addAlertSchema;
