const { db } = require('../../sequelize/models/index')

module.exports = createBoard = async (req, res) => {

    const company_id = req.id.company_id

    if(req.id.code==='user'||!company_id) {
        return res.status(401).json({success: false, message: "접근 권한 없음"})
    }

    try {
        const companyInfo = await db.Company.findOne({
            where: {company_id: company_id},
            raw: true
        })

        const createObj = req.body;
        createObj.company_id =company_id
        createObj.company_region = companyInfo.company_region

        const createResult = await db.Board.create(createObj)
        return res.status(201).json({ success: true, message: `${company_id} 공고 등록 완료!` })
    }
    catch (e) {
        console.log("createBoard Err: ", e)
        return res.status(400).json({ success: false, message: 'Request 확인 요망' })
    }
}
