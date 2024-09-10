const db = require('../database/connection');
const Sequelize = require('sequelize');

const Rol = db.define('Rol', {
    rid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: Sequelize.STRING,
},{
    tableName:"roles",
    timestamps: false
});

module.exports = Rol;