//expressjs.com/ko/guide
// 미들웨어 (middleware)
// Express 어플리케이션 : 뼈대
// 어플리케이션에 필요한 기능을 미들웨어로 추가
const express = require('express');
const moment = require("moment"); // moment라는 모듈 require
const app = express();
const port = 3000;

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);

const mw1 = (req, res, next) => {
    console.log("첫번째 미들웨어");
    next();
};

const mw2 = (req, res, next) => {
    console.log("두번째 미들웨어");
    next(); // 다음(아래) 미들웨어 호출
};


// 미들웨어 설정 시 순서가 중요
// 1. 애플리케이션 레벨 미들웨어
app.use(mw2);
app.use(mw1);


const logger = (req, res, next) => {
    // 비구조화 할당 (destructuring)
    const { method, url } = req; // req.method, req.url
    // 밀리초까지 표시 Date.now
    const time = moment().format("YYYY-MM-DD HH:mm:ss:SSS");
    console.log(`${method} - ${url} - ${time}`);
    next();
};

// 로깅은 무조건 앞에 - 순서에 따라 실행되고, 실행이 안될 수 있음
app.use(logger);

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.get("/hello", (req, res) => {
    res.send("안냥");
});

// 2. 라우터 레벨 미들웨어
// URI > URL
// https://expressjs.com/ko/starter/basic-routing.html
// app.METHOD(PATH, HANDLER)
// https://expressjs.com/ko/guide/routing.html

// 3. 기본 제공 미들웨어
app.use(express.static("public"));

// 4. 서드 파티 미들웨어
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// 5. 오류 처리 미들웨어
app.use((err, req, res, _) => {
    //
});