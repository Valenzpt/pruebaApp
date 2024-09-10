const db = require('../database/connection');
const Sequelize = require('sequelize');

const Solicitud = db.define('Solicitud', {
    sid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    codigo: Sequelize.STRING,
    descripcion: Sequelize.STRING,
    resumen: Sequelize.STRING,
    eid: Sequelize.INTEGER
},{
    tableName:"solicitud",
    timestamps: false
});

module.exports = Solicitud;