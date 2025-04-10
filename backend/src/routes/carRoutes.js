const express = require('express');
const router = express.Router();
const {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
} = require('../controllers/carController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.route('/')
    .get(getCars)
    .post(createCar);

router.route('/:id')
    .get(getCarById)
    .put(updateCar)
    .delete(deleteCar);

module.exports = router; 