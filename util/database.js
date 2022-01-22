const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('userslist', 'dennistwo', 'password', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3307
})

module.exports = sequelize;