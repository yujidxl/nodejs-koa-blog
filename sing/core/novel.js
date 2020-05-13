const Sequelize = require('sequelize');

const sequelize = new Sequelize('novel_collection', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.sync( {force: false} );

module.exports = sequelize;