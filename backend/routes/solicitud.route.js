const express = require('express');
const router = express.Router();
const Solicitud = require('../controllers/solicitud.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/jwt.middleware');
const {Crear} = require('../validations/solicitud');

router.post('/api/solicitudes', verifyToken, verifyAdmin, Crear, Solicitud.create);
router.get('/api/solicitudes', verifyToken, Solicitud.findAll);
router.get('/api/solicitudes/:id', verifyToken, Solicitud.findOne);
router.delete('/api/solicitudes/:id', verifyToken, verifyAdmin, Solicitud.eliminar);

module.exports = router;