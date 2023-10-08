const Borad = require('../../sequelize/models/board');

module.exports = createBoard = async (req, res) => {

    const company_id = req.id.company_id

    if(req.id.code==='user'||!company_id) {
        return res.status(401).json({success: false, message: "접근 권한 없음"})
    }

    const createObj = req.body;
    createObj.company_id =company_id

    try {
        const createResult = await Borad.create(createObj)
        return res.status(201).json({ success: true, message: `${company_id} 공고 등록 완료!` })
    }
    catch (e) {
        console.log("createBoard Err: ", e)
        return res.status(400).json({ success: false, message: 'Request 확인 요망' })
    }
}
