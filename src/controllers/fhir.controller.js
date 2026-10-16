const service = require('../services/fhir.service')

module.exports = {
    create: async (req, res, next) => {
        try {
            const type = req.params.type
            
            if (req.body.resourceType !== type) {
                return res.status(400).json({
                    resourceType: "OperationOutcome",
                    issue: [{ severity: "error", code: "invalid", diagnostics: "El resourceType no coincide con la URL" }]
                })
            }

            const data = await service.create(type, req.body)

            res.status(201)
               .set('Location', `/${type}/${data.id}`)
               .json(data)
        } catch (error) {
            next(error)
        }
    },

    getById: async (req, res, next) => {
        try {
            const data = await service.getById(req.params.type, req.params.id)
            res.json(data)
        } catch (error) {
            next(error)
        }
    },

    search: async (req, res, next) => {
        try {
            const data = await service.search(req.params.type, req.query)
            
            // FHIR requiere que las búsquedas devuelvan un recurso tipo 'Bundle'
            const bundle = {
                resourceType: "Bundle",
                type: "searchset",
                total: data.length,
                entry: data.map(item => ({ resource: item }))
            }
            res.json(bundle)
        } catch (error) {
            next(error)
        }
    }
}