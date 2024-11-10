import Joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

// ------------------------------------------
// Esquema de usuario que se ajusta a la tabla 'users' de la BD
// En este caso, todos los campos son opcionales
const updateUserSchema = Joi.object({
    username: Joi.string().alphanum().min(2).max(30).optional(),
    email: Joi.string().email().max(100).optional(),
    password: Joi.string().min(7).max(30).optional(),
}).messages(joiErrorMessages);

export default updateUserSchema;
