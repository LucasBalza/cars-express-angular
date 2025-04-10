const { PrismaClient } = require('@prisma/client')
const colors = require('colors')

const prisma = new PrismaClient()

async function connectDB() {
  try {
    await prisma.$connect()
    console.log('Connecté à la base de données avec Prisma'.green)
  } catch (error) {
    console.error('Erreur de connexion à la base de données :'.red, error)
    process.exit(1)
  }
}

// On s'assure que la connexion est établie avant d'exporter
connectDB()
  .catch((error) => {
    console.error('Erreur lors de l\'initialisation de Prisma :'.red, error)
    process.exit(1)
  })

module.exports = prisma
