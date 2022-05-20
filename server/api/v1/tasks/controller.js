const { Model } = require('./model');

exports.readAll = async (req, res) => {
  try {
    const tasks = await Model.find({}).populate('userID');
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res) => {
  const { description = 'No description' } = req.body;
  const userID = req.auth.user._id;

  try {
    const document = new Model({
      description,
      userID
    });
    const data = await document.save();
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

exports.id = async (req, res, next) => {
  const { params = {} } = req;
  const { id = '' } = params; // const id = params.id

  try {
    const data = await Model.findById(id).populate('userID');

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
    netxt(error);
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