const Sequelize = require('sequelize');

const sequelize = new Sequelize('mytest', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
})

sequelize.sync( {force: false});

module.exports = sequelize