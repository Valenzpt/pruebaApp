const Rol = require('../models/rol.model');

exports.findAll = async (req, res) => {
    try {
        const roles = await Rol.findAll();
        return res.status(200).json({message: 'Perfiles obtenidos correctament', data: roles})
    } catch (error) {
        return res.status(500).json({message: 'Error de servidor'})
    }
    
}
