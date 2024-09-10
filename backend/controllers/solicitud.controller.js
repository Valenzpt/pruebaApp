const Solicitud = require('../models/solicitud.model');
const Empleado = require('../models/empleado.model');

//relacion entre solicitud y empleado
Solicitud.belongsTo(Empleado, {foreignKey: 'eid'});

//crear solicitud
exports.create = async (req, res) => {
    try{
        const {codigo, descripcion, resumen} = req.body;
        
        const empleado = await Empleado.findOne({where: {eid: req.eid}});
        if(!empleado){
            return res.status(404).json({success: false, message: "No se encontro empleado"});
        }
        const solicitud = await Solicitud.create({
            codigo: codigo,
            descripcion: descripcion,
            resumen: resumen,
            eid: req.eid
        });
        return res.status(201).json({success: true, message: 'solicitud creada con exito', solicitud});
    }catch(error){
        return res.status(500).json({success: false, error})
    }
}

//obtener todas las solicitudes
exports.findAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;

        const totalSolicitudes = await Solicitud.count();
        const solicitudes = await Solicitud.findAll({
            limit: pageSize,
            offset: offset,            
            include: [{
                model: Empleado,
                attributes: ['nombre']
            }]
        });
        const totalPages = Math.ceil(totalSolicitudes/pageSize);
        const rol = req.rol===1?'admin':'empleado';
        if(solicitudes.length==0){
            return res.status(404).json({success: false, message: 'No se encontraron solicitudes'})
        }
        return res.status(200).json({success: true, data: solicitudes, perfil: rol, totalPages, currentPage: page, totalSolicitudes})
    } catch (error) {
        return res.status(500).json({success: false, error, message: 'server error'})
    }
}

//obtner una solicitud por id
exports.findOne = async (req, res) => {
    try {
        const solicitud = await Solicitud.findOne({where: {sid: req.params.id}, include:[{model: Empleado, attributes: ['nombre']}]});
        if(!solicitud){
            return res.status(404).json({message: 'Solicitud no encontrada'});
        }
        return res.status(200).json({success: true, solicitud});
    } catch (error) {
        return res.status(500).json({message: 'Server error', error});
    }
}

//eliminar solicitud
exports.eliminar = async (req, res) => {
    try {
        const solicitud = await Solicitud.findByPk(req.params.id);
        if(!solicitud){
            return res.json({success: false, message: 'No se encontro solicitud'})
        }
        await Solicitud.destroy({where: {sid: req.params.id}});
        return res.status(200).json({success: true, message: 'solicitud eliminada'})
    } catch (error) {        
        return res.status(500).json({success: false, error, message: 'server error'})
    }
}