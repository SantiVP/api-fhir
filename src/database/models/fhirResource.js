module.exports = (sequelize, DataTypes) => {
    let FhirResource = sequelize.define('fhirResource', {
        id: {
            type: DataTypes.STRING(64),
            primaryKey: true,
            allowNull: false,
            field: 'id'             
        },
        resourceType: {
            type: DataTypes.STRING(64),
            allowNull: false,
            field: 'resource_type'
        },
        content: {
            type: DataTypes.JSONB,
            allowNull: false,
            field: 'content'
        }
    }, {
        tableName: 'fhir_resources',
        timestamps: true,
        createdAt: 'last_updated',
        updatedAt: false,
        indexes: [
            { fields: ['resource_type'] },
            { fields: ['content'], using: 'gin' }
        ]
    })

    return FhirResource
}