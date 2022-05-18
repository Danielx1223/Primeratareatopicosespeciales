const jwt = require('jsonwebtoken');
const { Model } = require('./model');
const config = require('../../../config/');

exports.readAll = async (req, res, next) => {
  try {
    const users = await Model.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Model.findOne({ email });
    if (user && await user.validatePassword(password)) {
      const token = jwt.sign({ user }, config.jwtSecret);
      return res.json(token);
    } else {
      return res.status(401).json('Invalid user/password');
    }
  } catch (error) {
    res.status(401).json('Invalid user/password');
  }
}

// Mostrando la info que coloco en postmant desde body.
exports.create = async (req, res, next) => {
  const { firstname = '', lastname = '', email = '', password = '' } = req.body;
  const document = new Model({
    firstname,
    lastname,
    email,
    password
  });
  try {
    const data = await document.save();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.id = async (req, res, next) => {
  const { params = {} } = req;
  const { id = '' } = params; // const id = params.id

  try {
    const data = await Model.findById(id).exec();

    if (data) {
      req.doc = data;
      next();
    } else {
      next({
        statusCode: 404,
        message: 'Document not Found',
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.read = async (req, res, next) => {
  const { doc = {} } = req;

  res.json({
    data: doc,
  });
};

exports.update = async (req, res, next) => {
  const { body = {}, doc = {} } = req;

  Object.assign(doc, body); // Mezclar documentos.

  try {
    const data = await doc.save();
    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  const { params = {} } = req;
  const { id = '' } = params; // const id = params.id

  try {
    const data = await Model.findByIdAndDelete(id);
    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};
