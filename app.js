const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const cors = require("cors");
const FileStore = require("session-file-store")(session);
const bodyParser = require("body-parser");

// 서버 생성
const app = express();



/////////////// 공연 API ////////////////

const port = 3000;

// 미들웨어 설정
app.use(logger('dev')); // 로그 출력
app.use(express.json()); // json 형식으로 데이터를 받아오기 위한 설정
app.use(express.urlencoded({ extended: false })); // form 형식으로 데이터를 받아오기 위한 설정
app.use(cookieParser()); // 쿠키 파싱 설정
app.use(express.static(path.join(__dirname, 'public'))); // 정적 파일 위치 u
app.use(session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
}));
app.use(bodyParser.json()); // JSON 파싱을 위한 미들웨어

// View 엔진 및 뷰 경로 설정
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

// 라우터 설정
const apiRouter = require('./routes/api');
app.use('/routes/api', apiRouter);


// 서버 실행 포트 코드
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

