const router = require('express').Router();
const { checkOwner } = require('../../middlewares/checkOwner');
const { isValidArticleId, isValidArticleSchema } = require('../../middlewares/validation');
const { getArticles, createArticle, deleteArticle } = require('../../controllers/articles');

router.get('/articles', getArticles);
router.post('/articles', isValidArticleSchema, createArticle);
router.delete('/articles/:id', isValidArticleId, checkOwner, deleteArticle);

module.exports = router;
