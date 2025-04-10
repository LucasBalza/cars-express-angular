require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const colors = require('colors')
const prisma = require('./config/prisma')
const { authenticateToken } = require('./src/middlewares/authMiddleware')
const authRoutes = require('./src/routes/authRoutes')
const { getAllCars, getCarById, createCar, updateCar, deleteCar } = require('./src/controllers/carController')

const app = express()
const port = process.env.PORT || 5000

// Configuration CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 heures
}

// Middleware
app.use(cors(corsOptions))
app.use(express.json())

// Routes d'authentification
app.use('/api/auth', authRoutes)

// Routes des voitures
app.get('/api/cars', authenticateToken, getAllCars)
app.get('/api/cars/:id', authenticateToken, getCarById)
app.post('/api/cars', authenticateToken, createCar)
app.put('/api/cars/:id', authenticateToken, updateCar)
app.delete('/api/cars/:id', authenticateToken, deleteCar)

// Démarrage du serveur une fois que Prisma est connecté
const startServer = () => {
  app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`.cyan)
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Le port ${port} est déjà utilisé. Tentative avec le port ${port + 1}`.yellow)
      app.listen(port + 1)
    } else {
      console.error('Erreur lors du démarrage du serveur:'.red, err)
    }
  })
}

// On attend un petit moment pour s'assurer que Prisma est bien connecté
setTimeout(startServer, 1000) 