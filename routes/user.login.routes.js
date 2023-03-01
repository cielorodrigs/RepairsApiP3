const { Router } = require('express');
const { login } = require('../controllers/user.login.controller');

const router = Router();

router.post('/', login);

module.exports = {
  loginRouter: router,
};
