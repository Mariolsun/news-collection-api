const Article = require('../models/article');
const { MESSAGES } = require('../config');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  }).then((article) => Article.findById(article._id).select('-owner')) // Заново находим созданную карточку, чтобы исключить поле owner
    .then((article) => {
      res.send({ data: article });
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findByIdAndDelete(req.params.id).select('-owner')
    .then((deletedCard) => {
      res.send({ message: MESSAGES.ARTICLE_DELETED, data: deletedCard });
    })
    .catch(next);
};
