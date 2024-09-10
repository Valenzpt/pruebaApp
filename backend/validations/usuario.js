const {check, body, validationResult} = require('express-validator');
const {validateResult} = require('../Helpers/validateHelper');

const Crear = [
    body("username").notEmpty().withMessage('Ingrese nombre de usuario'),
    body("email").isEmail().withMessage('Correo no valido'),
    body("rol").notEmpty().withMessage('Seleccione el rol'),
    body("empleado").notEmpty().withMessage('Seleccione el empleado'),
    body("password").notEmpty().withMessage('ingrese contraseña'),
    (req, res, next)=>{
        validateResult(req, res, next)
    }
];
const Loguear = [
    body("email").isEmail().withMessage('Correo no valido'),
    body("password").notEmpty().withMessage('ingrese contraseña'),
    (req, res, next)=>{
        validateResult(req, res, next)
    }
];

module.exports = {Crear, Loguear}