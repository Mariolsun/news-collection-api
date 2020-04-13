const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const { ERRORS } = require('../constants/errors');

module.exports.doesArticleExists = (req, res, next) => {
  Article.exists({ _id: req.params.id })
    .then((exists) => {
      if (!exists) {
        throw new NotFoundError(ERRORS.ARTICLE_NOT_FOUND);
      }
      next();
    })
    .catch(next);
};
