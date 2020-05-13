const { Sequelize, Model } = require('sequelize');
const sequelize = require('../core');


class Book extends Model { }

Book.init({
  book_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  book_author: {
    type: Sequelize.STRING,
    allowNull: false
  },
  book_color: {
    type: Sequelize.STRING,
    allowNull: false
  },
  book_details: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'book_details',
  tableName: 'book_details'
});

module.exports = {
  Book
}