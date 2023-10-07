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
            user_region: "Seoul",
            user_skill: "node.js"
        });
        User.create({
            user_id: "Lee",
            user_region: "Incheon",
            user_skill: "java"
        });
    }
}