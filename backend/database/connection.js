require('dotenv').config();
const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mssql',
    logging: console.log,
});
try{
    sequelize.authenticate();
    console.log('Conexión a DB establecida correctamente');
}catch(error){
    console.error('No se pudo conectar a la base de datos: ', error)
}
module.exports = sequelize;