const express = require('express');
const router = express.Router();
const Rol = require('../controllers/rol.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/jwt.middleware');

router.get('/api/roles', verifyToken, verifyAdmin, Rol.findAll);

module.exports = router;