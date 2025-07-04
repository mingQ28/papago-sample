import express from 'express' // node_modules/express/폴더 내 코드를 import
import HTTP from 'superagent';
// 여기서 express 관련 코드를 써야 하기 때문에

const CLIENT_ID = 'g1ns2d9lat'
const CLIENT_SECRET = 'yuMGLhvPatsfiY3vZ1MtHOAw3PGmQEjgFw5Vf87N'

const app = express() // app -> express를 통해 서버를 구성할 대 설정할 헬퍼 객체

// 미들웨어 작성 부분 app 밑
app.use(express.static('public'))
app.use(express.json()); // 역직렬화 모듈

const clientId = CLIENT_ID;
const clientSecret = CLIENT_SECRET;

// 정적 리소스 호스팅, express.js의 미들웨어 기능으로 활용
// public 이라는 이름의 폴더를 정적 리소스가 제공되는 곳으로 이동
// const rootHandler = (_, res) => {
//     res.sendFile('index.html')
// }

// 어딘가에서 해당 경로로 요청 이벤트가 발생하면 rootHandler함수 실행
// 루트 경로 요청 시 index.html을 응답하는 핸들러
app.get('/', (_, response) => {
  response.sendFile('index.html');
});

// 언어 감지 요청 처리할 핸들러
app.post('/detect', (request, response) => {
    // 언어 감지 요청 처리 로직 구현
    const url = 'https://papago.apigw.ntruss.com/langs/v1/dect';

    HTTP.post(url)
        .send(request.body)
        .set('Content-Type', 'application/json')
        .set('X-NCP-APIGW-API-KEY-ID', clientId)
        .set('X-NCP-APIGW-API-KEY', clientSecret)
        .end((error, result) => {
            if (result.statusCode === 200) {
                response.send(result.body);
            } else {
                console.error(error);
            }
        });
});

// 언어 번역 요청 처리할 핸들러
app.post('/translate', (request, response) => {
  const url = 'https://papago.apigw.ntruss.com/nmt/v1/translation';

    HTTP.post(url)
        .send(request.body)
        .set('Content-Type', 'application/json')
        .set('X-NCP-APIGW-API-KEY-ID', clientId)
        .set('X-NCP-APIGW-API-KEY', clientSecret)
        .end((error, result) => {
            if (result.statusCode === 200) {
                // 파파고 서버로부터 응답받은 결과 데이터
                const responseDataFromPapago = result.body;

                // 화면 출력에 필요한 값만 추출
                const { srcLangType: detectedLanguage, tarLangType: targetLanguage, translatedText } = responseDataFromPapago.message.result;

                const responseData = {
                    detectedLanguage,
                    targetLanguage,
                    translatedText
                }

                response.send(responseData);
            } else {
                console.error(error);
            }
        });
})

const port = 3000;
app.listen(port,
    () => console.log(`http://127.0.0.1:${port}/ 서버 프로세스가 3000번 포트에서 실행 중입니다.`)
);
