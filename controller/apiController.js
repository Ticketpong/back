const request = require('request');
const xml2json = require('xml-js');

const { db } = require('../config/mariadb.js'); // DB 정보 require


// MySQL 연결
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// API에서 공연 정보를 가져와서 데이터베이스에 저장하는 함수
function saveShowData() {
    const options = {
        method: 'GET',
        url: 'http://www.kopis.or.kr/openApi/restful/pblprfr',
        qs: {
            service: 'fa3c8f8cc2c94da2bf5e4a40f8d54321',
            stdate: '20240301',
            eddate: '20240331',
            cpage: 1,
            rows: 1000
        }
    };

    request(options, function(error, response, body) {
        if (error) {
            console.error('Error:', error);
            return;
        }
        
        const info = JSON.parse(xml2json.xml2json(body, { compact: true, spaces: 4 }));
        
        const showIds = info.dbs.db.map(item => item.mt20id._text);
        
        showIds.forEach(showId => {
            getShowDetail(showId);
        });
    });
}

// 공연 상세 정보를 가져와서 데이터베이스에 저장하는 함수
function getShowDetail(showId) {

    // api호출에 필요한 URL 및 파라미터
    const options = {
        method: 'GET', // URL 요청 타입 
        url: `http://www.kopis.or.kr/openApi/restful/pblprfr/${showId}`, // 요청 URL + 공연아이디가 상세조회에 필요하다.
        qs: { // qs : API 요청에 필요한 파라미터
            service: 'fa3c8f8cc2c94da2bf5e4a40f8d54321' // serviceKey 
        }
    };

    request(options, function(error, response, body) { // 요청 보내기
        if (error) {
            console.error('Error:', error);
            return;
        }
        
        // api 호출 결과
        const detailInfo = JSON.parse(xml2json.xml2json(body, { compact: true, spaces: 4 }));
        const item = detailInfo.dbs.db; // dbs안에 db라는 이름의 리스트에서 데이터 꺼냄
        

        let styurl = '';
        if(item.styurls && item.styurls.styurl) {
        if(Array.isArray(item.styurls.styurl) ) {
            styurl = item.styurls.styurl[0]._text;
        } else{
            styurl = item.styurls.styurl._text;
        }
    }

        const sql = `INSERT INTO PERFORMANCE (mt20id, manager_id, prfnm, prfpdfrom, prfpdto, prfruntime, pcseguidance, genrenm, prfstate, updatedate, poster, styurl, dtguidance, prfage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            item.mt20id._text, // 공연아이디
            'manager',   //  아이디
            item.prfnm._text, // 공연제목 
            item.prfpdfrom._text, // 공연시작일
            item.prfpdto._text, // 공연종료일
            item.prfruntime._text, // 공연 런타임
            item.pcseguidance._text, // 티켓가격
            item.genrenm._text, // 장르
            item.prfstate._text, // 공연상태
            item.updatedate ? item.updatedate._text : null, // 최종수정일
            item.poster._text, // 포스터 이미지 경로
            styurl,// 소개 이미지
            item.dtguidance._text, // 공연시간
            item.prfage._text // 관람등급
        ];
        

        // 쿼리 실행
        db.query(sql, values, function(err, result) {
            if (err) {
                console.error('Error inserting data:', err);
                return;
            }
            console.log('Data inserted successfully.');
        });

        savePlaceInfo(item.mt10id._text) // 시설상세 api 요청 // item.mt10id._text는 공연시설ID임.
    });
}

function savePlaceInfo(placeId) {
    const options = {
        method: 'GET',
        url: `http://www.kopis.or.kr/openApi/restful/prfplc/${placeId}`,
        qs: {
            service: 'fa3c8f8cc2c94da2bf5e4a40f8d54321',
            newsql : 'Y'
        }
    };

    request(options, function(error, response, body) {
        if (error) {
            console.error('Error:', error);
            return;
        }
        
        const placeInfo = JSON.parse(xml2json.xml2json(body, { compact: true, spaces: 4 }));
        
        const item = placeInfo.dbs.db;
        const sql = `INSERT INTO PERFORMANCEHALL (mt10id, fcltynm, opende, fcltychartr, seatscale, mt13cnt, telno, relateurl, adres, la, lo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
            const values = [
                item.mt10id._text         // 공연시설ID
                , item.fcltynm._text        // 공연시설명
                , item.opende._text         // 개관연도
                , item.fcltychartr._text    // 시설특성
                , item.seatscale._text      // 객석 수
                , item.mt13cnt._text        // 공연장 수
                , item.telno._text          // 전화번호
                , item.relateurl._text      // 홈페이지
                , item.adres._text          // 주소
                , item.la._text             // 위도
                , item.lo._text             // 경도
                
            ];

            // 쿼리 실행
            db.query(sql, values, function(err, result) {
                if (err) {
                    console.error('Error inserting data:', err);
                    return;
                }
                console.log('Data inserted successfully.');
            });

        
    })

}

// 예매상황판 호출 및 저장 함수
function saveBoxOffice() {
    const options = {
        method: 'GET',
        url: `http://www.kopis.or.kr/openApi/restful/boxoffice`,
        qs: {
            service: 'fa3c8f8cc2c94da2bf5e4a40f8d54321',
            ststype: 'month',
            date   : '20240326'
        }
    };

    request(options, function(error, response, body) {
        if (error) {
            console.error('Error:', error);
            return;
        } 
        
        const boxOfficeInfo = JSON.parse(xml2json.xml2json(body, { compact: true, spaces: 4 }));
       
        
        const items = boxOfficeInfo.boxofs; // 예매상황 목록


        const sql = `INSERT INTO BOXOFFICE (cate, rnum, prfnm, prfpd, prfplcnm, seatcnt, prfdtcnt, area, poster, mt20id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        items.boxof.forEach((item, index) => {
            const values = [
                item.cate._text,         // 장르
                item.rnum._text,          // 순위
                item.prfnm._text,        // 공연명
                item.prfpd._text,        // 공연기간
                item.prfplcnm._text,     // 공연장
                item.seatcnt._text,      // 좌석수
                item.prfdtcnt._text,     // 상연횟수
                item.area? item.area._text : null,         // 지역      
                item.poster._text,       // 포스터이미지
                item.mt20id._text,       // 공연ID
                
            ];
            
            db.query(sql, values, function(err, result) {
                if (err) {
                    console.error('Error inserting data:', err);
                    return;
                }
                console.log('Data inserted successfully.');
            });
        } )
        
    })

}

// 데이터 저장 함수 호출
saveShowData();   // 공연정보 저장
saveBoxOffice();  // 예매상황판 저장