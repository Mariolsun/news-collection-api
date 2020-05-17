const mongoose = require('mongoose');
const validator = require('validator');
const errorTexts = require('../constants/errors');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    validate: {
      validator: validator.isURL,
      message: (props) => `${props.value} ${errorTexts.VALID_NOT_LINK}`,
    },
    required: true,
  },
  urlToImage: {
    type: String,
    validate: {
      validator: validator.isURL,
      message: (props) => `${props.value} ${errorTexts.VALID_NOT_LINK}`,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
