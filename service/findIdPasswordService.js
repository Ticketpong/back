const dbconn = require("../config/mariadb");
let bcrypt = require("bcrypt-nodejs");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");

dotenv.config();

// findId
// 아이디 찾기
const findId = async (name, email) => {
  let sql = `SELECT * FROM MEMBER WHERE user_name = ? AND user_email = ?`; // 아이디 찾기 쿼리문
  console.log(sql);
  const params = [name, email];

  return new Promise((resolve, reject) => {
    dbconn.db.query(sql, params, (err, result) => {
      if (err || result.length === 0) {
        console.log("일치하는 정보가 없습니다.");
        resolve(false);
      } else {
        console.log(result[0].user_id);
        resolve(result[0].user_id);
      }
    });
  });
};

// findPassword
// 비밀번호 찾기
const findPassword = async (name, id, email) => {
  let sql = `SELECT * FROM MEMBER WHERE user_name = ? AND user_id = ? AND user_email = ?`; // 비밀번호 찾기 쿼리문
  console.log(sql);
  const params = [name, id, email];

  return new Promise((resolve, reject) => {
    dbconn.db.query(sql, params, (err, result) => {
      if (err || result.length === 0) {
        console.log("일치하는 정보가 없습니다.");
        resolve(false);
      } else {
        const tempPw = uuidv4(); // 임시 비밀번호 생성

        // 비밀번호 암호화
        const hashPw = bcrypt.hashSync(tempPw);

        // 임시 비밀번호로 비밀번호 변경
        let sql = `UPDATE MEMBER SET user_password = ? WHERE user_id = ?`;
        const params = [hashPw, id];
        dbconn.db.query(sql, params, (err, updateResult) => {
          if (err || updateResult.length === 0) {
            console.log(err);
            resolve(false);
          } else {
            // 이메일 전송
            if (result[0].user_email) {
              const transporter = nodemailer.createTransport({
                // SMTP 설정
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                  user: process.env.EMAIL,
                  pass: process.env.PASSWORD,
                },
              });

              // 이메일 옵션
              const mailOptions = {
                from: process.env.EMAIL,
                to: result[0].user_email,
                subject: "Ticketpong에서 임시비밀번호를 알려드립니다.",
                html: `<h1>Ticketpong에서 임시비밀번호를 알려드립니다.</h1> <h2> 비밀번호: ${tempPw} </h2>
                <h3 style = "color: crimson;">로그인 후 반드시 비밀번호를 변경해주시기 바랍니다.</h3> 
                <a href="http://localhost:3000">Ticketpong 바로가기</a>`,
              };

              // 이메일 전송
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                  resolve(false);
                } else {
                  console.log("이메일 전송 성공: " + info.response);
                  resolve(result);
                }
              });
            } else {
              console.log("이메일이 없습니다.");
              resolve(false);
            }
          }
        });
      }
    });
  });
};

module.exports = { findId, findPassword };
