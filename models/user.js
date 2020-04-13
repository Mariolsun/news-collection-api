const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const NeedAuthError = require('../errors/need-auth-err');
const errorTexts = require('../constants/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    validate: {
      validator: validator.isEmail,
      message: (props) => `${props.value} ${errorTexts.VALID_NOT_EMAIL}`,
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


userSchema.pre('save', async function hashPassword(next) { // стрелочная функция тут не работает (this.isNew === undefined)
  if (this.isNew) {
    await bcrypt.hash(this.password, 10)
      .then((hash) => {
        this.password = hash;
      })
      .catch(next);
  }
  next();
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NeedAuthError(errorTexts.AUTH_WRONG_CREDENTIALS));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new NeedAuthError(errorTexts.AUTH_WRONG_CREDENTIALS));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
