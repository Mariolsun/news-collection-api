const router = require('express').Router();
const users = require('./users/users');
const signup = require('./signup/signup');
const signin = require('./signin/signin');
const articles = require('./articles/articles');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { MESSAGES } = require('../config');

router.use('/signup', signup);
router.use('/signin', signin);

router.use(auth);

router.use('/users', users);
router.use('/articles', articles);
router.use((req, res, next) => {
  next(new NotFoundError(MESSAGES.NOT_FOUND_DEFAULT));
});

module.exports = router;
