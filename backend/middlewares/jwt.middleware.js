const jwt = require('jsonwebtoken');
exports.verifyToken = (req, res, next) => {
    let token = req.cookies.token;
    if(!token){
        return res.status(401).json({success: false, message: "error al obtener token"});
    }
    try{
        const { email, rol, eid } = jwt.verify(token, process.env.JWT_SECRET);
        req.email = email;
        req.rol = rol;
        req.eid = eid;
        next();
    }catch(error){
        return res.json({success: false, error})
    }
}
exports.verifyAdmin = (req, res, next) => {
    if(req.rol === 1){
        return next();
    }
    return res.status(401).json({success: false, message: 'No autorizado'})
}