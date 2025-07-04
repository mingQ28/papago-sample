
const [sourceSelect, targetSelect] 
    = document.getElementsByTagName('select');

const [sourceTextArea, targetTextArea] 
    = document.getElementsByTagName('textarea');

let timerID;
sourceTextArea.addEventListener('input', event => {
    if(timerID)
        clearTimeout(timerID);
    timerID = setTimeout( ()=> {
        const text = event.target.value;

        // server.js로 전달하기 위해 xhr코드 작성
        // 1. xhr api 호출
        const xhr = new XMLHttpRequest(); // web api(브라우저에서만 사용)

        // 2. node.js 서버로부터 요청 결과를 받았을 경우 처리할 로직
        xhr.onload = () => { // 응답 결과 처리 로직

        }

        // 3. 요청 준비(어떤 요청이고, 보낼 엔드포인트 주소)
            // 3-1. 보낼 엔드포인트 주소
            const DETECT_LANGUAGE_URL = '/detect'; // 현재 주소가 localhost:3000이기 때문에
            // 3-2. 보낼 데이터(json 형태로 전송)
            const data = { // JS 객체 -> json 아님
                query: text
            }
            

        xhr.open('POST', DETECT_LANGUAGE_URL);
            // 4-1. 전송할 데이터(컨텐츠)의 타입(media type)을 명시
            xhr.setRequestHeader('Content-Type', 'application/json');
            const stringifiedData = JSON.stringify(data); // 직렬화
        xhr.send(stringifiedData)
        // 4. 실제 요청 전송
    }, 2000);
});