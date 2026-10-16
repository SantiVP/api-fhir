const { Router } = require('express')
const fhirRoutes = require('./fhir.routes')

const init_routes = () => {
    const router = Router()
    // Montamos las rutas FHIR en la raíz
    router.use('/', fhirRoutes)
    return router
}

module.exports = { init_routes }