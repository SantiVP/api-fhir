const { fhirResource: FhirResource } = require('../database/models')
const errors = require('../const/errors')
const crypto = require('crypto')

function throwNotFound(type, id) {
    const err = new Error(`No se encontró el recurso ${type}/${id}`)
    err.code = errors.NotFound.code
    throw err
}

async function create(type, body) {
    const id = body.id || crypto.randomUUID()
    body.id = id

    await FhirResource.create({
        id: id,
        resourceType: type,
        content: body
    })

    return body
}

async function getById(type, id) {
    const resource = await FhirResource.findOne({
        where: { id: id, resourceType: type }
    })
    
    if (!resource) throwNotFound(type, id)
    return resource.content
}

// Búsqueda base. Luego se puede expandir para parsear params de FHIR adentro del JSONB
async function search(type, queryParams) {
    const resources = await FhirResource.findAll({
        where: { resourceType: type },
        limit: queryParams._count || 20 // _count es el estándar de paginación FHIR
    })
    return resources.map(r => r.content)
}

module.exports = { create, getById, search }