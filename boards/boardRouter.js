const express = require('express');
router = express.Router();
const checkAccess = require('./boards.middleware/checkAccess');
const createBoard = require('./boards.service/createBoard');
const getBoard = require('./boards.service/getBoard');
const deleteBoard = require('./boards.service/deleteBorad');
const updateBoard = require('./boards.service/updateBoard');

router.get('/', checkAccess, getBoard);

router.post('/', checkAccess, createBoard);

    // 채용공고 등록
    // {
    // "채용공고 ID 생성하기"
    //     "회사_id": 회사_id,
    //     "채용포지션": "백엔드 주니어 개발자",
    //     "채용보상금": 1000000,
    //     "채용내용": "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
    //     "사용기술": "Python"
    // }


router.put('/', checkAccess, updateBoard);
    //채용공고 수정
    //회사 id를 제외한 모든것 수정


router.delete('/', checkAccess, deleteBoard);
    //채용공고 삭제(pk : 공고_id)

// router.get('/', () => {
//     //전체 내용 가져오기
//     //검색기능도 구현
// })

// router.get('/detail', ()=>{
//     //채용 상세 페이지, 해당회사가 올린 다른 채용공고 가져오기(가산점)
// //     Example)
// // {
// // 	"채용공고_id": 채용공고_id,
// //   "회사명":"원티드랩",
// //   "국가":"한국",
// //   "지역":"서울",
// //   "채용포지션":"백엔드 주니어 개발자",
// //   "채용보상금":1500000,
// //   "사용기술":"Python",
// // 	"채용내용": "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
// // 	"회사가올린다른채용공고":[채용공고_id, 채용공고_id, ..] # id List (선택사항 및 가산점요소).
// // }
// })

module.exports = router;

// //사용자 지원, 가산점
// // 채용공고ID, 사용자 ID