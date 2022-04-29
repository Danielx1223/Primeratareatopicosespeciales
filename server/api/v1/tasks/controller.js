const Task = require('./task');

exports.readAll = (req, res) => {
  res.json(Task.getAllTasks());
};

// Mostrando la info que coloco en postmant desde body.
exports.create = (req, res) => {
  const { description = 'No description', author = 'No author' } = req.body;
  res.json(Task.createTask({ description, author }));
};

exports.readById = (req, res) => {
  const { id = 0 } = req.params;
  res.json(Task.getTaskById(id));
};

exports.update = (req, res) => {
  const { id = 0 } = req.params;
  const { description = 'No description', author = 'No author' } = req.body;
  res.json(Task.updateTask(id, { description, author }));
};

exports.delete = (req, res) => {
  const { id = 0 } = req.params;
  res.json(Task.deleteTask(id));
};
