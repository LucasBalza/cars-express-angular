import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Réinitialisation des tables
  console.log('Réinitialisation des tables...');
  await prisma.car.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Création des données de test...');
  
  // Création de l'utilisateur admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  // Création des voitures
  const cars = [
    {
      brand: 'Tesla',
      model: 'Model S',
      year: 2023,
      color: 'Rouge',
      price: 89990
    },
    {
      brand: 'BMW',
      model: 'M4',
      year: 2023,
      color: 'Bleu',
      price: 95900
    },
    {
      brand: 'Porsche',
      model: '911 GT3',
      year: 2023,
      color: 'Gris',
      price: 172800
    },
    {
      brand: 'Mercedes',
      model: 'AMG GT',
      year: 2023,
      color: 'Noir',
      price: 165000
    },
    {
      brand: 'Audi',
      model: 'RS e-tron GT',
      year: 2023,
      color: 'Blanc',
      price: 147500
    },
    {
      brand: 'Lamborghini',
      model: 'Huracán',
      year: 2023,
      color: 'Jaune',
      price: 238000
    },
    {
      brand: 'Ferrari',
      model: 'SF90 Stradale',
      year: 2023,
      color: 'Rouge',
      price: 450000
    },
    {
      brand: 'McLaren',
      model: '720S',
      year: 2023,
      color: 'Orange',
      price: 280500
    }
  ];

  for (const car of cars) {
    await prisma.car.create({
      data: car
    });
  }

  console.log('Base de données initialisée avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 