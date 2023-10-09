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

    static initData(){
        Board.create({
            company_id: "wanted",
            company_region: "서울",
            emp_position: "백엔드 주니어 개발자",
            emp_prize: 100000,
            emp_skill: "java",
            emp_title: "[원티드] 백엔드 주니어 개발자 채용",
            emp_detail: "모집합니다 모집합니다 모집합니다 모집합니다 모집합니다 모집합니다 모집합니다 모집합니다 모집합니다 모집합니다"
        })
        Board.create({
            company_id: "jycompany",
            company_region: "경기",
            emp_position: "백엔드 신입 개발자",
            emp_prize: 50000,
            emp_skill: "nodejs",
            emp_title: "재용컴퍼니 채용",
            emp_detail: "모집합니다 모집합니다 모집합니다 모집합니다 모집합니다 모집합니다 모집합니다 모집합니다 모집합니다 모집합니다"
        })
    }
}