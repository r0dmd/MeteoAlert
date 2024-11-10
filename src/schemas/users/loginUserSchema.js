import Joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

// ------------------------------------------
// Esquema para inicar sesión, solo mail y contraseña
const loginUserSchema = Joi.object({
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(7).max(30).required(),
}).messages(joiErrorMessages);

export default loginUserSchema;
