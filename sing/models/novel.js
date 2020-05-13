const { Sequelize, Model } = require('sequelize');
const sequelize = require('../core/novel.js');

class Novel extends Model {}

Novel.init({
  href: {
    type: Sequelize.STRING,
    allowNull: false
  },
  img: {
    type: Sequelize.STRING,
    allowNull: false
  },
  book_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  book_author: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'novel',
  modelName: 'novel'
})

module.exports = Novel;