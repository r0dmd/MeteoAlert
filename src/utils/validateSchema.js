// No importamos generateErrorUtil; aprovechamos el error que lanza el catch, que ya debería tener nuestros mensajes personalizados.

// ------------------------------------------
// Función que valida datos comparándolos con un esquema. Recibe el esquema con el que comparar, y los datos a comparar con él. No devuelve nada. Lanza una excepción si los datos no se ajustan al esquema
const validateSchema = async (schema, data) => {
    try {
        await schema.validateAsync(data);
    } catch (err) {
        err.httpStatus = 400; // Establece el código de estado HTTP en 400
        throw err; // Lanza el error para que sea capturado por el manejador de errores
    }
};

export default validateSchema;
