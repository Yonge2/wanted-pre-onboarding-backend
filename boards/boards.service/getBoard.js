const Board = require('../../sequelize/models/board');

//todo
// + 키워드 
//1. default - 공고 등록 시간순
//2. 거리순
//3. 해당 스킬순
module.exports = getBoard = async(req, res)=>{
    if(req.query.search){
        //search KeyWord
    }
    try{
        const a = await Board.findAll({raw: true});
        console.log(a);
        res.status(200).json(a);
    }
    catch(e){
        console.log(e);
        res.status(400).json({success: false, mesaage: "잘못된 요청"});
    }
}