//Express - minimalist web framework for nodejs
// framework - 웬만한 필요한거는 알아서 다 제공해서 좋음
const express = require('express');
const bodyParser = require("body-parser")// body부에 들어오는 메시지를 파싱해줌
const logger = require('morgan');
const app = express();
const port = 3000;


app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);


// body를 Parsing해주는
// MiddleWare
// form에 전달되는 바디메시지 처리하는 바디파서 모듈 설정
// true : qs(확장모듈), false: querystring(기본모듈)
app.use(bodyParser.urlencoded({ extended: false}));

// 바디 메시지가 JSON 형식인 경우 바디파서 설정
app.use(bodyParser.json());


// 정적 파일 위치 설정
// 정적 파일 서비스 시 위치 설정해야함
// 127.0.0.1:3000/music.html
app.use(express.static("public")); // "/" 생략된거임
// 127.0.0.1:3000/static/music.html
app.use("/static", express.static("public"));

// 로깅처리 미들웨어 설정
app.use(logger("dev")); // dev < short < common < combined

// GET, POST, PUT, DELETE 잘라내기한 위치 <here
// 라우팅 모듈 설정 (localhost:3000/api/music...)
app.use("/api", require("./api")); // api/index.js
//app.use("/music", require("./api/music")); // music에 대한 path가 들어오면
//app.use("/movie", require("./api/movie"));


// 여기까지 내려왔으면 위에서 처리가 되지 않은 것
// 500 에러 뜨게 하려면 new Error()바꾸고 error.code = 404를 지우면 됨
app.use((req, res, next) => { // 에러 발생시키는
    const error = new Error("없는 페이지입니다.");
    //error.code = 404;
    next(error); // 나는 일 다했다. 그 다음(밑) 일 받아라
}); // 보편적인 미들웨어 설정할때는 use

// 오류처리 미들웨어 함수
app.use((err, req, res, _) => { // next = 안쓸때는 _로
    //if (err.code) res.status(err.code); // 넘겨받은 코드 넘겨줌
    //else res.status(500); // 500: Internal Server Error
    res.status(err.code || 500);
    //if (err.message) res.send(err.message);
    //else res.send("Internal Server Error");
    res.send(err.message || "Internal Server Error"); 
});

// HTTP Method(CRUD)
// GET : 조회
// POST : 데이터 생성
// PUT : 데이터 갱신
// DELETE ㅣ 삭제

// REST API
// HTTP 요청 시 경로에 자원을 요청 -> 명사 지정
// 예) GET /users, GET /users/(id)
// reqres.in 테스트도구
// test.com/users/{id} [GET] : 조회 (목록, 상세)
// test.com/users [POST] : 등록
// test.com/users/{id} [PUT] : 갱신
// test.com/users/{id} [DELETE] : 삭제


// (bad case)
// test.com/users/create // 굳이 넣을 필요가 없어
// test.com/users/search // ..
// test.com/users/update // ..
// test.com/users/delete // ..

// ES2015 = ES6
// babel
const a = (b) => (c) => b * c;