const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const NeedAuthError = require('../errors/need-auth-err');
const { ERRORS } = require('../constants/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    validate: {
      validator: validator.isEmail,
      message: (props) => `${props.value} ${ERRORS.VALID_NOT_EMAIL}`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NeedAuthError(ERRORS.AUTH_WRONG_CREDENTIALS));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new NeedAuthError(ERRORS.AUTH_WRONG_CREDENTIALS));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
