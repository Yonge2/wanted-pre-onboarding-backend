const { Sequelize } = require('sequelize');
const process = require('process');
// // const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];


const User = require('./user');
const UserApply = require('./user_apply');
const Employer = require('./employer');
const Board = require('./board');

const sequelize = new Sequelize(config.database, config.username, config.password, config);
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = 
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
const db = {};
db.sequelize = sequelize;

db.User = User;
db.User_apply = UserApply;
db.Employer = Employer;
db.Board = Board;

User.init(sequelize);
UserApply.init(sequelize);
Employer.init(sequelize);
Board.init(sequelize);

setTimeout(()=>{
    User.initData();
    Employer.initData();
}, 1000);

module.exports = { db };
