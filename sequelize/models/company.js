const { Sequelize, Model } = require("sequelize");

module.exports = class Company extends Model {
    static init(sequelize) {
        return super.init({
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
            tableName: 'company',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }

    static initData(){
        Company.create({
            company_id: "wanted",
            company_region: "seul",
        })
    }
}