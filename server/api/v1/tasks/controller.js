const tasks = [];

exports.all = (req, res, next) => {
  const { query = {} } = req; // metiendo valores
  res.json({
    data: tasks,
    included: {
      query,
    },
  });
};

// Mostrando la info que coloco en postmant desde body.
exports.create = (req, res, next) => {
  const { body = {} } = req;
  const createdAt = { ...body, creado: new Date() }; // // Degradamos (extraemos valores del array body y lo metemos en data)
  tasks.push(createdAt);
  res.json({
    data: createdAt,
  });
};

exports.read = (req, res, next) => {
  const { params = {} } = req;
  const { pag = '' } = params; // const id = params.id

  const data = tasks.find(function (item) {
    // Función para encontrar la que quiero ver
    return item.pag === pag;
  });

  res.json({
    data,
  });
};

exports.update = (req, res, next) => {
  const { body = {}, params = {} } = req;
  const updateAt = { ...body, editado: new Date() }; // Fecha de edicion
  const { pag = '' } = params; // const id = params.id

  const Antes = tasks.find(function (item) {
    // Función para encontrar la que quiero ver
    return item.pag === pag;
  });

  // Función para encontrar la posición del array que aparezca la pag.
  const findObjectUpdate = (element) => element.pag == pag;
  const updatePositionIndex = tasks.findIndex(findObjectUpdate);
  tasks[updatePositionIndex] = updateAt;

  res.json({
    Nuevo: updateAt,
    Antes,
  });
};

exports.delete = (req, res, next) => {
  const { params = {} } = req; // Parametro de la URL
  const { pag = '' } = params; // const id = params.id

  const findObjectUpdate = (element) => element.pag == pag;
  const deletePositionIndex = tasks.findIndex(findObjectUpdate);
  delete tasks[deletePositionIndex]; // función para borrar valores de la posición del array
  res.json({});
};
