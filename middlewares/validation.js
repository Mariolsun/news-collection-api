const { celebrate, Joi } = require('celebrate');

module.exports.isValidUserSchema = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.isValidArticleSchema = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    publishedAt: Joi.string().required(),
    source: Joi.string().required(),
    url: Joi.string().required().uri(),
    urlToImage: Joi.string().required().uri(),
  }),
});

module.exports.isValidArticleId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
});

module.exports.isValidSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
