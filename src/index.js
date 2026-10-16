const express = require('express')
const routerConfig = require('./routes/index.routes.js')
const globalConstants = require('./const/globalConstants.js')
const db = require('./database/models/index.js')
const errorHandler = require('./middlewares/error.js')

const apiConfigurations = (app) => {
  app.use(express.json({ type: ['application/json', 'application/fhir+json'] }))
  app.use(express.urlencoded({ extended: true }))
}

const routerConfigurations = (app) => {
  app.use('/', routerConfig.init_routes())
  app.use(errorHandler)
}

// Función con reintentos para la base de datos
const connectWithRetry = async (retries = 5, delay = 3000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await db.sequelize.authenticate()
      console.log('Conexión a la base de datos establecida con éxito.')
      await db.sequelize.sync({ alter: true })
      console.log('Base de datos sincronizada.')
      return
    } catch (err) {
      console.log(`Intento ${i + 1} de ${retries}: Base de datos no disponible, reintentando en ${delay / 1000}s...`)
      if (i === retries - 1) throw err
      await new Promise(res => setTimeout(res, delay))
    }
  }
}

const init = async () => {
  try {
    await connectWithRetry()

    const app = express()
    apiConfigurations(app)
    routerConfigurations(app)
    
    app.listen(globalConstants.PORT, () => {
        console.log(`Servidor FHIR iniciado en el puerto ${globalConstants.PORT}`)
    })
  } catch (err) {
    console.error('Error fatal al iniciar la API:', err)
    process.exit(1)
  }
}

init()