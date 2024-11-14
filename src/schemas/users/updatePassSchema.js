import Joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

// ------------------------------------------
// Esquema de cambio de contraseña
const updatePassSchema = Joi.object()
    .keys({
        oldPass: Joi.string().min(7).max(30).required(),
        newPass: Joi.string().min(7).max(30).required(),
    })
    .messages(joiErrorMessages);

export default updatePassSchema;
