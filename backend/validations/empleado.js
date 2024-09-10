const {check, body, validationResult} = require('express-validator');
const {validateResult} = require('../Helpers/validateHelper')

const Crear = [
    body("nombre").notEmpty().withMessage('Ingrese nombre de empleado'),
    body("salario").isNumeric().withMessage('Salario no valido'),
    body("fecha").notEmpty().withMessage('Fecha no puede estar vacia').matches(/^\d{4}-\d{2}.\d{2}$/).withMessage('Debe ser formato YYYY-MM-DD'),
    (req, res, next)=>{
        validateResult(req, res, next)
    }
];
module.exports = {Crear}