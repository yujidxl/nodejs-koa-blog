const Sequelize = require('sequelize');

//方法1:单独传递参数
const sequelize = new Sequelize('mytest', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.sync({ force: false });
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const Model = Sequelize.Model;
class User extends Model { }
User.init({
  classify: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  details: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'book',
  tableName: 'book'
  // 参数
});

const user = new User();
user.classify = '设置';
user.details = '增大数据返回为';
user.save();

