const { Sequelize } = require('sequelize');

const config = {
    db:{
        host:"mysql",
        port:"3306",
        user:"root",
        password:"password",
        database : "tpVirtualisation",
        connectionTimeout: 60000
    },
    listperpage : 10
};

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: 'mysql'
});

module.exports = {sequelize, config}
