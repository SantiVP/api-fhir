const router = require('express').Router()
const controller = require('../controllers/fhir.controller')

// Rutas genéricas que atrapan cualquier tipo de recurso
router.get('/:type', controller.search)
router.post('/:type', controller.create)
router.get('/:type/:id', controller.getById)

module.exports = router