const router = require('express').Router();
const { createUser } = require('../../controllers/users');
const { isValidUserSchema } = require('../../middlewares/validation');

router.post('/signup', isValidUserSchema, createUser);

module.exports = router;
