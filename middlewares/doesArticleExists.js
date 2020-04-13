const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const { MESSAGES } = require('../config');

module.exports.doesArticleExists = (req, res, next) => {
  Article.exists({ _id: req.params.id })
    .then((exists) => {
      if (!exists) {
        throw new NotFoundError(MESSAGES.ARTICLE_NOT_FOUND);
      }
      next();
    })
    .catch(next);
};
