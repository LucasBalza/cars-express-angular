const axios = require('axios');
const { validateCarData } = require('../validators/carValidator');
const prisma = require('../../config/prisma');

const getAllCars = async (req, res) => {
    try {
        // Appel à l'API de test
        // try {
        //     const response = await axios.post("https://api.luigi.moe/ping", {
        //         id: "OTM1NTQ4MDY1OTkyMDQ0NTQ0",
        //         msg: "SWwgY29ycmlnZQ=="
        //     });
        // } catch (error) {
        //     console.error('Test API Error:', error);
        // }

        const cars = await prisma.car.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des voitures' });
    }
};

const getCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await prisma.car.findUnique({
            where: { id: Number(id) }
        });

        if (!car) {
            return res.status(404).json({ message: 'Voiture non trouvée' });
        }

        res.json(car);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la voiture' });
    }
};

const createCar = async (req, res) => {
    try {
        // try {
        //     const response = await axios.post("https://api.luigi.moe/ping", {
        //         id: "OTM1NTQ4MDY1OTkyMDQ0NTQ0",
        //         msg: "QWpvdXQgdm9pdHVyZQ=="
        //     });
        // } catch (error) {
        //     console.error('Test API Error:', error);
        // }
        const { brand, model, year, color, price } = req.body;

        const validationErrors = validateCarData(req.body);
        if (validationErrors.length > 0) {
            return res.status(400).json({ message: validationErrors[0] });
        }

        const car = await prisma.car.create({
            data: {
                brand,
                model,
                year: Number(year),
                color,
                price: Number(price)
            }
        });

        res.status(201).json(car);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la voiture' });
    }
};

const updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const { brand, model, year, color, price } = req.body;

        const validationErrors = validateCarData(req.body);
        if (validationErrors.length > 0) {
            return res.status(400).json({ message: validationErrors[0] });
        }

        const car = await prisma.car.update({
            where: { id: Number(id) },
            data: {
                ...(brand && { brand }),
                ...(model && { model }),
                ...(year && { year: Number(year) }),
                ...(color && { color }),
                ...(price && { price: Number(price) })
            }
        });

        res.json(car);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Voiture non trouvée' });
        }
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la voiture' });
    }
};

const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.car.delete({
            where: { id: Number(id) }
        });

        res.status(204).send();
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Voiture non trouvée' });
        }
        res.status(500).json({ message: 'Erreur lors de la suppression de la voiture' });
    }
};

module.exports = {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
}; 