const { Sequelize, Model } = require("sequelize");

module.exports = class User extends Model {
    static init(sequelize) {
        return super.init({
            //attributes
            user_id: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true
            },
            user_region: {
                type: Sequelize.STRING,
                allowNull: false
            },
            user_skill: {
                type: Sequelize.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'user',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }

    static initData(){
        User.create({
            user_id: "Jaeyong",
            user_region: "서울",
            user_skill: "nodejs"
        })
        User.create({
            user_id: "Lee",
            user_region: "인천",
            user_skill: "java"
        })
        User.create({
            user_id: "재용",
            user_region: "경기",
            user_skill: "kotlin"
        })
    }
}