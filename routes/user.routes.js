const { Router } = require('express');
const {
  findAllUsers,
  findOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controllers');
const { validExistUser, tokenValidation, protectAccountOwner } = require('../middlewares/users.middleware');

const router = Router();

router.get('/', tokenValidation, findAllUsers, );

router.get('/:id', tokenValidation, validExistUser, findOneUser);

router.post('/', createUser);

router.patch('/:id', tokenValidation, protectAccountOwner, validExistUser, updateUser);

router.delete('/:id', tokenValidation,protectAccountOwner, validExistUser, deleteUser);

module.exports = {
  userRouter: router,
};
