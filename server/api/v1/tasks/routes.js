const express = require('express');
// eslint-disable-next-line
const router = express.Router();
const { check, param } = require('express-validator');

// Traemos las variables
const controller = require('./controller');
const { validateFields } = require('../../middlewares/validateFields');

/*
 * /api/v1/tasks        POST    Created  AGREGAR
 * /api/v1/tasks        GET     Read all LISTAR todo
 * /api/v1/tasks/:id    GET     Read     LISTAR ESPECIFICO
 * /api/v1/tasks/:id    PUT     Update   EDITAR
 * /api/v1/tasks/:id    DELETE  Delete   ELIMINAR
 */

// Forma de simplificar tantos get and post
router.route('/')
  .get(controller.readAll)
  .post([
    check('description', 'Description is a mandatory field').not().isEmpty(),
    check('author', 'Author is a mandatory field').not().isEmpty(),
    validateFields
  ], controller.create);

router
  .route('/:id')
  .get([
    param('id', 'id should be a numeric value').toInt().isNumeric(),
    validateFields
  ], controller.readById)
  .put([
    param('id', 'id should be a numeric value').toInt().isNumeric(),
    check('description', 'Description is a mandatory field').not().isEmpty(),
    check('author', 'Author is a mandatory field').not().isEmpty(),
    validateFields
  ], controller.update)
  .delete([
    param('id', 'id must be a numeric value').toInt().isNumeric(),
    validateFields
  ], controller.delete);

module.exports = router;
