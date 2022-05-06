const express = require('express');
// eslint-disable-next-line
const router = express.Router();
const { check, param } = require('express-validator');

// Traemos las variables
const controller = require('./controller');
const { validateFields } = require('../../middlewares/validateFields');

/*
 * /api/v1/users        POST    Created  AGREGAR
 * /api/v1/users        GET     Read all LISTAR todo
 * /api/v1/users/:id    GET     Read     LISTAR ESPECIFICO
 * /api/v1/users/:id    PUT     Update   EDITAR
 * /api/v1/users/:id    DELETE  Delete   ELIMINAR
 */

// Forma de simplificar tantos get and post
router.route('/')
  .get(controller.readAll)
  .post([
    check('firstname', 'firstname is a mandatory field').not().isEmpty(),
    check('lastname', 'lastname is a mandatory field').not().isEmpty(),
    check('email', 'email is a mandatory field').isEmail(),
    validateFields
  ], controller.create);

router.param('id', controller.id);

router
  .route('/:id')
  .get([
    param('id', 'Id not found').isMongoId(),
    validateFields
  ], controller.read)
  .put([
    param('id', 'Id not found').isMongoId(),
    check('firstname', 'firstname is a mandatory field').not().isEmpty(),
    check('lastname', 'lastname is a mandatory field').not().isEmpty(),
    check('email', 'email is a mandatory field').isEmail(),
    validateFields
  ], controller.update)
  .delete([
    param('id', 'Id not found').isMongoId(),
    validateFields
  ], controller.delete);

module.exports = router;
