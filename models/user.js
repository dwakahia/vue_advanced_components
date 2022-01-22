const {DataTypes} = require('sequelize');
const sequelize = require('../util/database');
const user = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    dob: DataTypes.STRING,
    password: DataTypes.STRING,
})



module.exports = user;