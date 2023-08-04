const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ServerError = require('../errors/ServerError');
const AuthError = require('../errors/AuthError');
// const DuplicateError = require('../errors/DuplicateError');
const ConflictError = require('../errors/ConflictError');
const {
  BAD_REQUEST_CODE,
  CREATE_CODE,
  SUCCES_CODE,
  secretKey,
} = require('../utils/constants');

// 400 — Переданы некорректные данные при создании пользователя. 500 — На сервере произошла ошибка.

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(CREATE_CODE).send({
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        throw new ConflictError('Пользователь с данным email уже существует');
      }

      if (err.name === 'ValidationError') {
        throw new BadRequestError(
          'Переданы некорректные данные при создании пользователя.',
        );
      }
      return new ServerError('На сервере произошла ошибка');
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, secretKey, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch((err) => {
      throw new AuthError(err.message);
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(SUCCES_CODE).send({ user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      if (err.name === 'CastError') {
        throw new BadRequestError('Введены некорректные данные');
      }
      return new ServerError('На сервере произошла ошибка');
    })
    .catch(next);
};

// 404 — Пользователь по указанному _id не найден. 500 — На сервере произошла ошибка.
module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.status(SUCCES_CODE).send({ data: user }))
    .catch((err) => {
      // если пользователь с данным id не найден
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      // если введены некорректные данные
      if (err.name === 'CastError') {
        throw new BadRequestError('Введены некорректные данные');
      }
      return new ServerError('На сервере произошла ошибка');
    })
    .catch(next);
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .orFail()
    .then((user) => res.status(SUCCES_CODE).send({ data: user }))
    // .catch((err) => {
    //   throw new ServerError(err.message);
    // })
    .catch(next);
};

// 400 — Переданы некорректные данные при обновлении профиля.
// 404 — Пользователь с указанным _id не найден. 500 — На сервере произошла ошибка.
module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true,
    },
  )
    .then((user) => res.status(SUCCES_CODE).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(
          'Переданы некорректные данные при обновлении профиля.',
        );
      }
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      return new ServerError('На сервере произошла ошибка');
    })
    .catch(next);
};

// 400 — Переданы некорректные данные при обновлении аватара.
// 404 — Пользователь с указанным _id не найден.
// 500 — На сервере произошла ошибка.
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true,
    },
rs: true,
    },
.status(BAD_REQUEST_CODE).send({
          message: 'Переданы некорректные данные при обновлении аватара.',
        });
      }
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      return new ServerError('На сервере произошла ошибка');
    })
    .catch(next);
};
