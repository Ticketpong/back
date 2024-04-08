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
const port = 8080;
const corsOptions = {
  origin: "*", // 모든 도메인 허용
  credentials: true, // 쿠키를 전달하기 위한 설정
  optionsSecSuccessStatus: 200, //
};

// views 폴더 설정 및 ejs 엔진 설정
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 미들웨어 설정
app.use(logger("dev")); // 로그 출력
app.use(express.json()); // json 형식으로 데이터를 받아오기 위한 설정
app.use(express.urlencoded({ extended: true })); //post 요청을 객체로 받기 위한 설정
app.use(cookieParser()); // 쿠키 파싱 설정
app.use(express.static(path.join(__dirname, "public"))); // 정적 파일 위치 설정
app.use(
  session({
    secret: "keyboard",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);
app.use(cors(corsOptions));

// 라우트 모듈 가져오기
const apiRoutes = require("./routes/api");

// 라우터 설정
const indexRouter = require("./routes/index");

// member 라우터 설정
const signupRouter = require("./routes/member/signup");
const loginRouter = require("./routes/member/login");
const mainRouter = require("./routes/member/main");
const logoutRouter = require("./routes/member/logout");

//manage 라우터 설정
const manageLogin = require("./routes/manage/manageLogin");
const manageAdd = require("./routes/manage/manageAdd");
const manageMain = require("./routes/manage/manageMain");
const manageLogout = require("./routes/manage/manageLogout");

// 예약 라우터 설정
const reservationRouter = require("./routes/reservation/reservation");

//라우터 연결
app.use("/", indexRouter);

//member 라우터 연결
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/main", mainRouter);
app.use("/logout", logoutRouter);

//manage 라우터 연결
app.use("/manage", manageLogin);
app.use("/manage/manageAdd", manageAdd);
app.use("/manage/manageMain", manageMain);
app.use("/manage/manageLogout", manageLogout);

// 예약 라우터 연결
app.use("/reservation", reservationRouter);

//에러 핸들러
// 404 에러 핸들러
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// 서버쪽 에러 핸들러
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
});

// 서버 실행 함수
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
