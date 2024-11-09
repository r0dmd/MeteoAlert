import Joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

// ------------------------------------------
// Esquema de usuario que se ajusta a la tabla 'users' de la BD
const userSchema = Joi.object({
    username: Joi.string().alphanum().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
}).messages(joiErrorMessages);

export default userSchema;

// @@@ Cuando se termine el testing, cambiar la contraseña a mínimo 6 o 7
