// JSON con los posibles mensajes de error de Joi, para ponerlos en español. Los que no se definan aquí saltarán en inglés

// ------------------------------------------
const joiErrorMessages = {
    'any.required': 'Este campo ({#label}) es obligatorio.',
    'string.base': 'Este campo ({#label}) debe ser un texto.',
    'string.empty': 'Este campo ({#label}) no puede estar vacío.',
    'string.min':
        'Este campo ({#label}) debe tener al menos {#limit} caracteres.',
    'string.max':
        'Este campo ({#label}) debe tener como máximo {#limit} caracteres.',
    'string.email':
        'Este campo ({#label}) debe ser un correo electrónico válido.',
    'any.only':
        'Este campo ({#label}) solo acepta uno de los siguientes valores: {#valids}.',
    'string.alphanum':
        'Este campo ({#label}) solo puede contener caracteres alfanuméricos.',
    'number.base': 'El valor de "{#label}" debe ser un número',
    'date.base': 'El valor de "{#label}" debe ser una fecha válida',
    'object.base': 'El valor de "{#label}" debe ser un objeto',
    'object.unknown': 'No se permiten campos adicionales en este objeto',
};

export default joiErrorMessages;
