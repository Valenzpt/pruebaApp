const db = require('../database/connection');
const Sequelize = require('sequelize');

const Usuario = db.define('Usuario', {
    uid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    email: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    rid: Sequelize.INTEGER,
    eid: Sequelize.INTEGER
},{
    tableName:"usuarios",
    timestamps: false
});

module.exports = Usuario;