const { body} = require('express-validator');
const {validateResult} = require('../Helpers/validateHelper');

const Crear = [
    body("codigo").notEmpty().withMessage('Ingrese codigo de la solicitud'),
    body("descripcion").notEmpty().withMessage('Ingrese una descripcion'),
    body("resumen").notEmpty().withMessage('Ingrese el resumen de la solicitud'),
    (req, res, next)=>{
        validateResult(req, res, next)
    }
];
module.exports = {Crear}