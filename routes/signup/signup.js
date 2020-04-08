const router = require('express').Router();
const { isValidUserSchema } = require('../../middlewares/validation');
const { createUser } = require('../../controllers/users');

router.post('/', isValidUserSchema, createUser);

module.exports = router;
