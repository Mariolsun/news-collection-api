const Article = require('../models/article');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.checkOwner = (req, res, next) => {
  Article.findById(req.params.id, (err, article) => {
    if (!article.owner.equals(req.user._id)) {
      next(new ForbiddenError('Статью может удалить только ее создатель!'));
    }
    next();
  })
    .catch(next);
};
