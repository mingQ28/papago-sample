// superagent 모듈을 HTTP라는 이름으로 사용하기 위해 import
import HTTP from 'superagent';

const DETECT_LANGUAGE_URL = 'https://papago.apigw.ntruss.com/langs/v1/dect';
const TEXT_TRANSLATION_URL = 'https://papago.apigw.ntruss.com/nmt/v1/translation'

const CLIENT_ID = 'g1ns2d9lat'
const CLIENT_SECRET = 'yuMGLhvPatsfiY3vZ1MtHOAw3PGmQEjgFw5Vf87N'

// 언어 감지
const detectLangs = () => {
    const payload = { // 요청 데이터
        query: '안녕하세요?'
    };

    HTTP.post(DETECT_LANGUAGE_URL) // 보낼 엔드포인트(주소)
        .send(payload) // 보낼 데이터
        .set('X-NCP-APIGW-API-KEY-ID', CLIENT_ID)
        .set('X-NCP-APIGW-API-KEY', CLIENT_SECRET)
        // error가 발생했을 때는 콜백 함수의 인수 중 error에 넣어줌
        // 결과값은 result에 넣어줌
        .end((error, result) => { // 응답받은 결과값 취득했을 때 코드 작성 부분
            if (result.statusCode === 200) { // 응답 결과값이 200, OK일 경우
                const resultData = result.body;
                console.log(resultData);
            } else {
                console.error(error);
            }
        });
}

// TODO: 번역 요청 코드 완성하기
const translate = () => {
    const requestBody = {
        source: 'ko',
        target: 'ja',
        text: '어쩔티비',
    }

    HTTP.post(TEXT_TRANSLATION_URL) // 보낼 주소
    .send(requestBody) // 보낼 데이터
    .set('X-NCP-APIGW-API-KEY-ID', CLIENT_ID)
    .set('X-NCP-APIGW-API-KEY', CLIENT_SECRET)
    .end((error, result) => { // 응답받은 결과값 취득
        if (result.statusCode === 200) {
            console.log(result.body);
        } else {
            console.error(error);
        }
    }); 
}

translate();