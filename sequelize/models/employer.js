const { Sequelize, Model } = require("sequelize");

module.exports = class Employer extends Model {
    static init(sequelize) {
        return super.init({
            //attributes
            company_id: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
            },
            company_region: {
                type: Sequelize.STRING,
                allowNull: false,
            }
        }, {
            sequelize,
            tableName: 'employer',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }

    static initData(){
        Employer.create({
            company_id: "wanted",
            company_region: "seul",
        })
    }
}