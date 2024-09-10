const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw();
        next();
    } catch (error) {
        res.status(422);
        res.json({error: true, errors: error.array()})
    }
}

module.exports = {validateResult}