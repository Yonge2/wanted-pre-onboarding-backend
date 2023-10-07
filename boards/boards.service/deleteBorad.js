const Board = require('../../sequelize/models/board');

module.exports = deleteBoard = async(req, res) =>{
    const board_id = req.body.board_id;

    try{
        const deleteResult = await Board.destroy({
            where: {
                board_id: board_id
            }
        });
        console.log("deleteResult", deleteResult);
        res.status(201).json({success: true, message: "해당공고 삭제완료"})
    }
    catch(e){
        console.log("deleteBoard Err : ", e);
        res.status(400).json({success: false, message: "잘못된 요청"});
    }
}