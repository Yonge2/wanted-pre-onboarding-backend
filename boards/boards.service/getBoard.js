const Board = require('../../sequelize/models/board');

module.exports = getBoard = async(req, res)=>{
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