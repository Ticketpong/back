const request = require('request');
const xml2json = require('xml-js');

let showDataArray = []; // 공연 정보를 담을 배열

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
function getShowDetail(showFacilityId) {
    // 요청 옵션 설정
    const options = {
        method: 'GET',
        url: `http://www.kopis.or.kr/openApi/restful/pblprfr/${showFacilityId}`,
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
        console.log(detailInfo)
        // 필요한 데이터 추출하여 배열에 추가
        const item = detailInfo.dbs.db;
        console.log(item)
        showDataArray.push({
            showFacilityId: item.mt10id._text,
            showName: item.prfnm._text,
            showStartDate: item.prfpdfrom._text,
            showEndDate: item.prfpdto._text,
            // 이하 필요한 데이터 추가
        });

        // 공연 시설 상세 조회 함수 호출
        getShowFacility(item.mt10id._text); // 공연 아이디를 파라미터로 넘겨줌
    });
}
function getShowFacility(showFacilityId) {
    // 요청 옵션 설정
    const options = {
        method: 'GET',
        url: `http://www.kopis.or.kr/openApi/restful/prfplc/${showFacilityId}`, // 공연 시설 아이디로 변경
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
        const facilityInfo = JSON.parse(xml2json.xml2json(body, { compact: true, spaces: 4 }));

        console.log(JSON.stringify(facilityInfo, null, 2));

    });
}
// 공연 목록 조회 함수 호출
getShowList();