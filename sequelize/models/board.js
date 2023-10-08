const { Sequelize, Model } = require("sequelize");

module.exports = class Board extends Model {
    static init(sequelize) {
        return super.init({
            board_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            company_id: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            company_region: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            emp_position: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            emp_prize: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            emp_title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            emp_skill: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            emp_detail: {
                type: Sequelize.TEXT,
                allowNull: false,
            }
        }, {
            sequelize,
            tableName: 'board',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }
}