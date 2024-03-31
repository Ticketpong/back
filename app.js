const express = require('express');
const app = express();

// 라우트 모듈 가져오기
const apiRoutes = require('./routes/api');

// 미들웨어 등록
app.use(express.json());

// 라우트 모듈 적용
app.use('/api', apiRoutes);

// 서버 시작
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
