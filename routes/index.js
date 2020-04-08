const router = require('express').Router();
const users = require('./users/users');
const articles = require('./articles/articles');
const signin = require('./signin/signin');
const signup = require('./signup/signup');
const auth = require('../middlewares/auth');

router.use('/signin', signin);
router.use('/signup', signup);
// router.use(auth);
router.use('/users', users);
router.use('/articles', articles);

module.expors = router;
