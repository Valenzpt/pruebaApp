const Empleado = require('../models/empleado.model');

//crear un empleado 
exports.create = async (req, res) => {
    try {
        //destructurar cuerpo de solicitud
        const { nombre, fecha, salario } = req.body;
        
        const encontrar = await Empleado.findOne({where: {nombre: nombre, fecha_ingreso: fecha}});
        if(encontrar){
            return res.status(422).json({message: 'Ya existe un empleado con estos datos'})
        }
        const empleado = await Empleado.create({
            salario: salario,
            nombre: nombre,
            fecha_ingreso: fecha
        })
        return res.status(201).json(empleado)
    } catch (error) {
        return res.status(500).json({success: false, error: error})
    }
}
//obtener todos los empleados paginas
exports.findAll = async (req, res) => {
    try {
        //pagina actual 
        const page = parseInt(req.query.page, 10) || 1;
        //tamaño de la pagina
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        //desplazamiento
        const offset = (page - 1) * pageSize;

        const totalEmpleados = await Empleado.count();

        const empleados = await Empleado.findAll({
            limit: pageSize,
            offset: offset
        });
        const totalPages = Math.ceil(totalEmpleados/pageSize);

        const rol = req.rol===1?'admin':'empleado';
        return res.status(200).json({success: true, data: empleados, perfil: rol, totalPages, currentPage: page, totalEmpleados})
    } catch (error) {
        return res.status(500).json({message: 'Server error', error})
    }
}
exports.todos = async (req, res) => {
    try {
        const empleados = await Empleado.findAll();
        const rol = req.rol===1?'admin':'empleado';
        return res.status(200).json({success: true, data: empleados, perfil: rol})
    } catch (error) {
        return res.status(500).json({message: 'Server error', error})
    }
}
//obtener un empleado
exports.findOne = async (req, res) => {
    try {
        const empleado = await Empleado.findByPk(req.params.id);
        if(!empleado){
            return res.status(404).json({message: 'Empleado no encontrado'});
        }
        return res.status(200).json({success: true, empleado})
    } catch (error) {
        return res.status(500).json({message: 'Server error', error})
    }
}