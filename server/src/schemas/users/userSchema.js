import Joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

// ------------------------------------------
// Esquema de usuario que se ajusta a la tabla 'users' de la BD
const userSchema = Joi.object({
    username: Joi.string().alphanum().min(2).max(30).required(),
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(7).max(30).required(),
}).messages(joiErrorMessages);

export default userSchema;
