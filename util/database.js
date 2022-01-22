const {Sequelize} = require('sequelize');
// const sequelize = new Sequelize('userslist', 'dennistwo', 'password', {
//     dialect: 'mysql',
//     host: 'localhost',
//     port: 3307
// })

const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);

module.exports = sequelize;