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
  })
    .then((article) => {
      const { owner, ...articleFields } = JSON.parse(JSON.stringify(article));
      res.send({ data: articleFields });
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findByIdAndDelete(req.params.id).select('-owner')
    .then((deletedCard) => {
      res.send({ data: deletedCard });
    })
    .catch(next);
};
