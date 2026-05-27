// index.js
const express = require('express')
const cors    = require('cors')
require('dotenv').config()

const app  = express()
const PORT = process.env.PORT || 3000

// ── Middlewares globales ──────────────────────────────
app.use(cors())        // permite peticiones desde el frontend
app.use(express.json()) // permite leer el body de las peticiones en formato JSON

// ── Ruta de prueba ────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ mensaje: 'CargoLink API funcionando ✓' })
})

// ── Rutas de la aplicación (se agregan semana 2) ──────
// app.use('/auth',        require('./src/routes/auth.routes'))
// app.use('/solicitudes', require('./src/routes/solicitudes.routes'))
// app.use('/vehiculos',   require('./src/routes/vehiculos.routes'))
// app.use('/admin',       require('./src/routes/admin.routes'))

// ── Manejo de rutas no encontradas ───────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

// ── Manejo global de errores ──────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Error interno del servidor' })
})

// ── Arrancar el servidor ──────────────────────────────
app.listen(PORT, () => {
  console.log(`🚛 CargoLink API corriendo en http://localhost:${PORT}`)
})