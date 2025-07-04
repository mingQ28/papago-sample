import express from 'express' // node_modules/express/폴더 내 코드를 import
import { detectLangs } from './apitest.js';
// 여기서 express 관련 코드를 써야 하기 때문에

const app = express() // app -> express를 통해 서버를 구성할 대 설정할 헬퍼 객체
const port = 3000
// 미들웨어 작성 부분 app 밑
app.use(express.static('public'))
app.use(express.json()); // 역직렬화 모듈

// 정적 리소스 호스팅, express.js의 미들웨어 기능으로 활용
// public 이라는 이름의 폴더를 정적 리소스가 제공되는 곳으로 이동
const rootHandler = (_, res) => {
    res.sendFile('index.html')
}

// 어딘가에서 해당 경로로 요청 이벤트가 발생하면 rootHandler함수 실행
// 루트 경로 요청 시 index.html을 응답하는 핸들러
app.get('/', rootHandler)

// 언어 감지 요청 처리할 핸들러
app.post('/detect', (request, reponse) => {
    // 언어 감지 요청 처리 로직 구현
    console.log(request.body); 
    detectLangs(request.body);
})

// 언어 번역 요청 처리할 핸들러
app.post('/translate', () => {

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
