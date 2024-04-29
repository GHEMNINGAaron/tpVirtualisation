
const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/conf.db'); 

const User = sequelize.sequelize.define('User', {
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cv: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    tableName: 'user', 
    timestamps: false 
});

module.exports = User;
