const Board = require('../../sequelize/models/board');

module.exports = updateBoard = async(req, res) =>{
    const updateObj = req.body;

    const board_id = parseInt(updateObj.board_id);
    delete updateObj.board_id;

    try{
        const updateResult = await Board.update(updateObj, {
            where: {board_id: board_id}
        })
        if(updateResult[0]) res.status(201).json({success: true, message: "수정 완료"});
        else{
            console.log("udpateResult : ", updateResult);
            res.status(400).json({success: false, message: "다시 확인하세요"});
        }
    }
    catch(e){
        console.log("update Err : ", e);
        res.status(400).json({success: true, message: "잘못된 요청"});
    }
}
