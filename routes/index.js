const router = require('express').Router();
const signin = require('./signin/signin');
const signup = require('./signup/signup');
const auth = require('../middlewares/auth');

const { getUser } = require('../controllers/users');
const { checkOwner } = require('../middlewares/checkOwner');
const { isValidArticleId, isValidArticleSchema } = require('../middlewares/validation');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');


router.use('/signin', signin);
router.use('/signup', signup);

router.use(auth);

router.get('/users/me', getUser);

router.get('/articles', getArticles);
router.post('/articles', isValidArticleSchema, createArticle);
router.delete('/articles/:id', isValidArticleId, checkOwner, deleteArticle);

module.expors = router;
