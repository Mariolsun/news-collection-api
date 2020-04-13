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
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: validator.isURL,
      message: (props) => `${props.value} ${errorTexts.VALID_NOT_LINK}`,
    },
    required: true,
  },
  image: {
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
