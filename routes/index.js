const router = require('express').Router();
const users = require('./users/users');
const articles = require('./articles/articles');

router.use('/users', users);
router.use('/articles', articles);
