const Article = require('../models/article');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    description,
    publishedAt,
    source,
    url,
    image,
  } = req.body;

  Article.create({
    keyword,
    title,
    description,
    publishedAt,
    source,
    url,
    image,
    owner: req.user._id,
  }).then((article) => Article.findById(article._id).select('-owner')) // выбрасывание поля owner
    .then((article) => { // при помощи {owner, ...restParams} работает очень странно.
      res.send({ data: article }); // сами данные карточки хранятся в restParams._doc с полем owner!
    }) // похоже на работу mongoose и лечится копированием article (JSON.parse(JSON.stringify))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findByIdAndDelete(req.params.id).select('-owner')
    .then((deletedCard) => {
      res.send({ data: deletedCard });
    })
    .catch(next);
};
