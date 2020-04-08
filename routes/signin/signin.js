const router = require('express').Router();
const { login } = require('../../controllers/login');
const { isValidSignin } = require('../../middlewares/validation');

router.post('/signin', isValidSignin, login);

module.exports = router;
