const express = require('express');
const trainerController = require('../controllers/trainerContoller');
const router = express.Router();

router.get('/',trainerController.getAll);
router.get('/:id', trainerController.getTrainerById);
router.post('/', trainerController.addTrainer);
router.put('/:id', trainerController.updateTrainer);
router.delete('/:id', trainerController.removeTrainer);

module.exports=router;