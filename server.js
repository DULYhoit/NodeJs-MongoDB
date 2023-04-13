//다운받은 express 로 서버를 열기위한 기본문법
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const MongoClient = require('mongodb').MongoClient;
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session  = require('express-session');
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 
var db;


MongoClient.connect('mongodb+srv://admin:qwer1234@cluster0.3dujlrj.mongodb.net/?retryWrites=true&w=majority', function(err,client) {
    if(err) return console.log(err);
    db = client.db('todoapp');
    // db.collection('post').insertOne({name : 'Jon', age : 20},function(err,result) {
    //     console.log('저장완료');
    // });

    app.listen(8080,function() {
        console.log('서버실행중...')
    })
})

//파라미터 : 1.포트번호 , 2.콜백함수

app.use(bodyParser.urlencoded({extended : true}));

let obj = [{
    category : '옷',
    name : '강아지 옷',
    size : ['L','XL','XXL'],
},
{
    category : '바지',
    name : '강아지 바지',
    size : ['L','XL','XXL'],
}
]
let json = JSON.stringify(obj);
    

// 누군가 /pet 으로 방문하면 pet 관련된 안내문을 띄움
app.get('/pet',function (req,res) {
    res.send(json)
});
app.get('/',function (req,res) {
    res.render('index.ejs')
});
app.get('/write',function (req,res) {
    res.render('write.ejs')
});
app.get('/list',function(req,res) {
    db.collection('post').find().toArray(function (err,result) {
        console.log(result);
        res.render('list.ejs',{posts : result});
       
    });
    
})
app.get('/detail/:id', function (req,res) {
    
    db.collection('post').findOne({id:parseInt(req.params.id)},function (err,result) {
        if(result != null){
            res.render('detail.ejs',{data : result});
        }else{
            res.send("<script>alert('존재하지 않는 게시물');location.href='/'</script>");
            
        
        }
       
        
    })
})
app.get('/edit/:id',function (req,res) {
    db.collection('post').findOne({id :parseInt(req.params.id)},function (err,result) {
        res.render('edit.ejs',{data : result});
        
    })
})
app.get('/login',function (req,res) {
    res.render('login.ejs');
})
app.put('/edit',function (req,res) {
    //1. form에 담긴 제목데이터, 날짜데이터를 가지고
    //db.colection 에다가 업데이트함
    db.collection('post').updateOne({id : parseInt(req.body.id)},{$set: {title:req.body.title, date : req.body.date}},function (err,result) {
        console.log('수정완료');
        res.redirect('/detail/'+req.body.id);
    })
})
//post요청
app.post('/add',function (req,res) {
    let count = db.collection('counter').findOne({name : '총게시물'},function (err,result) {
        console.log(result);
        let add = {
            id : result.totalPost + 1,
            title : req.body.title,
            date : req.body.date
        };
        db.collection('post').insertOne(add,function(err,result) {
            db.collection('counter').updateOne({name : '총게시물'},{ $inc : {totalPost:1} },function (err) {
                console.log(err);
            })
        });
        
    });
    res.redirect('/');
    
})
app.post('/login',passport.authenticate('local',{
    failureRedirect : '/fail'
}),function (req,res) {
    res.redirect('/');
})
app.delete('/delete',function (req,res) {
    console.log('삭제진행중...');
   req.body.id = parseInt(req.body.id);
   console.log(req.body.id);
    db.collection('post').deleteOne(req.body,function (err,result) {
        console.log('삭제완료');
        res.status(200).send({message: '성공했습니다.'});
    })
})

//REST API
//REST 원칙6개
//1.Uniform interface
//-하나의 자료는 하나의 URL로
//-URL 하나를 알면 둘을 알 수 있어야함
//-요청과 응답은 정보가 충분히 들어있어야함
//2.Client-Server 역할구분
//-브라우저는 요청만 할 뿐
//-서버는 응답만 해야함
//3.Stateless
//-요청1과 요청2는 의존성이 없어야함
//4.Cacheable - 특성이 있지만 브라우저가 알아서 해줌
//5.Layerd System
//6.Code on Demand

//1번의 예시
//www.example.com/products/66432
//instargram.com/explore/tags/kpop/
//facebook.com/natgeo/photos/

//MongoDB

