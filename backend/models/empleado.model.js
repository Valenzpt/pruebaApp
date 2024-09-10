const db = require('../database/connection');
const Sequelize = require('sequelize');

const Empleado = db.define('Empleado', {
    eid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fecha_ingreso: Sequelize.DATE,
    nombre: Sequelize.STRING,
    salario: Sequelize.DECIMAL
},{
    tableName:"empleados",
    timestamps: false
});

module.exports = Empleado;