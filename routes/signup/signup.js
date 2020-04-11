const router = require('express').Router();
const { createUser } = require('../../controllers/users');
const { isValidUserSchema } = require('../../middlewares/validation');

router.post('/', isValidUserSchema, createUser);

module.exports = router;
