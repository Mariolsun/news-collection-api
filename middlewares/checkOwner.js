const Article = require('../models/article');
const ForbiddenError = require('../errors/forbidden-err');
const { MESSAGES } = require('../config');

module.exports.checkOwner = (req, res, next) => {
  Article.findById(req.params.id, (err, article) => {
    if (!article.owner.equals(req.user._id)) {
      next(new ForbiddenError(MESSAGES.ARTICLE_NOT_DELETED_NOT_OWNER));
    }
    next();
  })
    .catch(next);
};
