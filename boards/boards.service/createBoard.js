const Borad = require('../../sequelize/models/board');

module.exports = createBoard = async (req, res) => {
    const createObj = req.body;

    try {
        const createResult = await Borad.create(createObj);
        console.log('createResult : ', createResult);
        res.status(201).json({ success: true, message: `${createObj.company_id} 공고 등록 완료!` });
    }
    catch (e) {
        console.log("createBoard Err: ", e);
        res.status(400).json({ success: false, message: 'Request 확인 요망' })
    }
}
