const express = require('express');
// eslint-disable-next-line
const router = express.Router();

// Traemos las variables
const controller = require('./controller');

/*
 * /api/v1/tweets        POST    Created  AGREGAR
 * /api/v1/tweets        GET     Read all LISTAR todo
 * /api/v1/tweets/:id    GET     Read     LISTAR ESPECIFICO
 * /api/v1/tweets/:id    PUT     Update   EDITAR
 * /api/v1/tweets/:id    DELETE  Delete   ELIMINAR
 */

// Forma de simplificar tantos get and post
router.route('/').get(controller.all).post(controller.create);

router
  .route('/:pag')
  .get(controller.read)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.delete);

module.exports = router;
