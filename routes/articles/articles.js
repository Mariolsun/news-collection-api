const router = require('express').Router();
const { checkOwner } = require('../../middlewares/checkOwner');
const { isValidArticleId, isValidArticleSchema } = require('../../middlewares/validation');
const { getArticles, createArticle, deleteArticle } = require('../../controllers/articles');

router.get('/', getArticles);
router.post('/', isValidArticleSchema, createArticle);
router.delete('/:id', isValidArticleId, checkOwner, deleteArticle);
