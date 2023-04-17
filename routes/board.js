var router = require('express').Router();
function loginCheck(req,res,next) {
    if(req.user){
        next()
    }else{
        res.send('로그인 상태가 아닙니다.')
    }
}

//router.use(특정url,loginCheck) 라우터에 미들웨어를 적용
router.get('/sports',loginCheck,function (req,res) {
    res.send('스포츠 게시판');
})
router.get('/game',function (req,res) {
    res.send('게임 게시판');
})
module.exports = router;