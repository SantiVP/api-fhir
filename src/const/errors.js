module.exports = {
    ValidationError: {
        code: 422,
        message: 'Error de validación',
    },
    MissingFields: {
        code: 400,
        message: 'Faltan campos obligatorios',
    },
    NotFound: {
        code: 404,
        message: 'Recurso no encontrado',
    },
    Unauthorized: {
        code: 401,
        message: 'No autorizado',
    },
    Forbidden: {
        code: 403,
        message: 'Sin permisos para acceder al recurso',
    },
    Conflict: {
        code: 409,
        message: 'El recurso ya existe',
    },
    InternalError: {
        code: 500,
        message: 'Error interno del servidor',
    },
}