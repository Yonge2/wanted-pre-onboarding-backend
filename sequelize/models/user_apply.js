const { Sequelize, Model } = require("sequelize");

module.exports = class User_apply extends Model {
    static init(sequelize) {
        return super.init({
            //attributes
            apply_idx: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            user_id: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            board_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true
            },
            company_id: {
                type: Sequelize.STRING,
                allowNull: false,
            }
        }, {
            sequelize,
            tableName: 'user_apply',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }
}