// 내가 짠 코드
// 언어 감지 api
const inputArea = document.getElementById("translate-box");
//console.dir(inputArea);

let timer = null;
inputArea.addEventListener("input", (e) => {
  //console.dir(e.target);
  clearTimeout(timer); // 계속 입력할 경우 timer 취소
  timer = setTimeout(() => {// 1초 동안 입력값이 없을 경우 실행
    console.log(e.target.value);
    // api 구현
    //apiRequest(e.target.value);
  }, 1000); 
});

const dectLanguage = (value) => {
    const xhr = new XMLHttpRequest(); // 인스턴스 생성
 
    xhr.onload = () => { // 서버로부터의 응답완료 확인
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            const responseData = xhr.responseText; // responseText: 서버로부터 받은 응답 데이터
            const result = JSON.parse(responseData); // JSON 역직렬화
            console.log(result); 
            // 응답코드를 받음

        }else {
            console.error("Failed!");
        }
    }
    
    const url = 'https://papago.apigw.ntruss.com/langs/v1/dect'; // 요청준비
    xhr.open('POST', url);
    
    xhr.send(value); // 요청
}
