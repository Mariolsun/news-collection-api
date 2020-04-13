const Article = require('../models/article');
const ForbiddenError = require('../errors/forbidden-err');
const { ERRORS } = require('../constants/errors');

module.exports.checkOwner = (req, res, next) => {
  Article.findById(req.params.id).select('+owner')
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        throw new ForbiddenError(ERRORS.ARTICLE_NOT_DELETED_NOT_OWNER);
      }
      next();
    })
    .catch(next);
};
