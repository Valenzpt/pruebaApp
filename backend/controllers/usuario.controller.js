
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/usuario.model');
const Employee = require('../models/empleado.model');

//crear un usuario
exports.create = async (req, res) => {
    try{
        const { username, email, password, rol, empleado } = req.body;
        //verificar existencia del usuario
        const encontrar = await User.findOne({where: {email: email}});
        const empleadoF = await Employee.findOne({where: {eid: empleado}});
        if(encontrar){
            return res.status(409).json({success: false, message: "Usuario ya se encuentra registrado"});
        }
        //verificar empleado
        if(!empleadoF){
            return res.status(404).json({success: false, message: "El empleado no existe"});
        }
        //crear hash de contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        //crear usuario
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPass,
            rid: rol,
            eid: empleado
        });
        return res.status(200).json({success: true, usuario: {usuario: newUser.username, correo: newUser.email, rol: newUser.rid}, message: "Usuario creado correctamente"}) 

    }catch(error){
        return res.status(500).json({ message: "Server error", error});
    }
};

//inicio de sesion
exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;

        //verifica existencia del usuario
        const usuario = await User.findOne({where: {email: email}})
        if(!usuario){
            return res.status(404).json({success: false, message: "usuario no encontrado"});
        }

        //compara contraseña
        const coincide = await bcrypt.compare(password, usuario.password)
        if(!coincide){
            return res.status(401).json({success: false, message: "credenciales incorrectas"});
        }
        //obtiene el token
        const token = jwt.sign({email: usuario.email, rol: usuario.rid, eid: usuario.eid},
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }  
        );
        //guarda token en la cookie
        res.cookie('token', token, {
            httpOnly: true
        })
        return res.status(200).json({success: true, token, usuario: {email: usuario.email, rol: usuario.rid}}); 
    }catch(error){
        return res.status(500).json({message: "server error", error});
    }
};

//cerrar sesion
exports.logout =  (req, res) => {
    //destruye cookie
    res.cookie('token', "", {expires: new Date(0)});
    return res.status(200).json({message: 'sesion eliminada'});
};

exports.findAll = async (req, res) => {
    try {
        const usuarios = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({message: 'Server error', error});
    }
};