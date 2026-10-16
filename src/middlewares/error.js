module.exports = function (err, req, res, next) {
    console.error(err)

    let statusCode = err.code || 500
    if (typeof statusCode !== 'number' || statusCode < 100 || statusCode > 599) {
        statusCode = 500
    }

    const operationOutcome = {
        resourceType: "OperationOutcome",
        issue: [{
            severity: statusCode >= 500 ? "fatal" : "error",
            code: statusCode === 404 ? "not-found" : "exception",
            diagnostics: err.message || 'Error interno del servidor'
        }]
    }

    res.status(statusCode).json(operationOutcome)
}