const express = require('express');
const router = express.Router();
const User = require('../controllers/usuario.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/jwt.middleware');
const {Crear, Loguear} = require('../validations/usuario');

router.get('/api/usuarios', verifyToken, verifyAdmin, User.findAll);
router.post('/api/usuarios',verifyToken, verifyAdmin, Crear, User.create);
router.post('/api/login', Loguear, User.login);
router.post('/api/logout', User.logout);

module.exports = router;