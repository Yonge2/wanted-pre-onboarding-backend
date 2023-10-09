const { Sequelize } = require('sequelize');

const env = 'development';
const config = require(__dirname + '/../config/config.json')[env];

const User = require('./user');
const UserApply = require('./user_apply');
const Company = require('./company');
const Board = require('./board');


const sequelize = new Sequelize(config.database, config.username, config.password, config)

const db = {}
db.sequelize = sequelize

db.User = User
db.UserApply = UserApply
db.Company = Company
db.Board = Board

db.User.init(sequelize)
db.UserApply.init(sequelize)
db.Company.init(sequelize)
db.Board.init(sequelize)

db.Company.hasMany(db.Board, {foreignKey: "company_id"})
db.Board.belongsTo(db.Company, {foreignKey: "company_id"})

db.User.hasMany(db.UserApply, {foreignKey: "user_id"})
db.UserApply.belongsTo(db.User, {foreignKey: "user_id"})

db.Board.hasOne(db.UserApply, {foreignKey: "board_id"})
db.UserApply.belongsTo(db.Board, {foreignKey: "board_id"})


setTimeout(()=>{
    User.initData()
    Company.initData()
}, 1000)

module.exports = { db }
