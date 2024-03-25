const request = require('request');
const xml2json = require('xml-js');

let combinedInfoArray = []; // 공연 정보를 담을 배열

// 공연 목록 조회를 위한 함수 정의
function getShowList() {
    // 요청 옵션
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

    // 요청 보내기
    request(options, function(error, response, body) {
        if (error) {
            console.error('Error:', error);
            return;
        }
        
        // XML 데이터를 JSON으로 변환
        const info = JSON.parse(xml2json.xml2json(body, { compact: true, spaces: 4 }));
        
        // 공연 상세 조회를 위해 공연 아이디 추출
        const showIds = info.dbs.db.map(item => item.mt20id._text);
        
        // 공연 상세 조회 함수 호출
        showIds.forEach(showId => {
            getShowDetail(showId);
        });
    });
}

// 공연 상세 조회를 위한 함수 정의
function getShowDetail(showId) {
    // 요청 옵션 설정
    const options = {
        method: 'GET',
        url: `http://www.kopis.or.kr/openApi/restful/pblprfr/${showId}`,
        qs: {
            service: 'fa3c8f8cc2c94da2bf5e4a40f8d54321'
        }
    };

    // 요청 보내기
    request(options, function(error, response, body) {
        if (error) {
            console.error('Error:', error);
            return;
        }
        
        // XML 데이터를 JSON으로 변환
        const detailInfo = JSON.parse(xml2json.xml2json(body, { compact: true, spaces: 4 }));
        console.log(detailInfo);
        const item = detailInfo.dbs.db
            console.log("공연아이디 : " + item.mt20id._text);
            console.log("공연시설 아이디 : " + item.mt10id._text );
            console.log("공연명 : " + item.prfnm._text );
            console.log("공연시작일 : " + item.prfpdfrom._text );
            console.log("공연종료일 : " + item.prfpdto._text );
            console.log("공연시설명 : " + item.fcltynm._text );
            console.log("공연런타임 : " + item.prfruntime._text );
            console.log("공연티켓가격 : " + item.pcseguidance._text );
            console.log("공연장르명: " + item.genrenm._text );
            console.log("공연상태 : " + item.prfstate._text );
            console.log("공연포스터이미지경로 : " + item.poster._text );
            // item.styuls.forEach(image => {
            //     console.log("공연소개이미지들 : " + image.styuls._text );
            // })

            
        
        
        
    
    });
}

// 공연 목록 조회 함수
getShowList();
