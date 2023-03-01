const { Router } = require('express');
const {
  findAllRepairs,
  findOneRepair,
  createRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repair.controller');
const { validExistRepairs } = require('../middlewares/repairs.middleware');
const { tokenValidation, restrictTo } = require('../middlewares/users.middleware');

const router = Router();

router.get('/',tokenValidation,restrictTo('employee'), findAllRepairs);

router.get('/:id',tokenValidation,restrictTo('employee'), validExistRepairs, findOneRepair);

router.post('/',tokenValidation, createRepair);

router.patch('/:id',tokenValidation,restrictTo('employee'), validExistRepairs, updateRepair);

router.delete('/:id',tokenValidation,restrictTo('employee'), validExistRepairs, deleteRepair);

module.exports = {
  repairRouter: router,
};
