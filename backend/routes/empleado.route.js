const express = require('express');
const router = express.Router();
const Empleado = require('../controllers/empleados.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/jwt.middleware');
const {Crear} = require('../validations/empleado');
router.post('/api/empleados', verifyToken, verifyAdmin, Crear, Empleado.create);
router.get('/api/empleados', verifyToken, Empleado.findAll);
router.get('/api/empleados/todos', verifyToken, Empleado.todos);
router.get('/api/empleados/:id', verifyToken, Empleado.findOne);

module.exports = router