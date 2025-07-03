// 언어 감지 api
// 사용자의 입력을 받고 2초 이상 입력을 하지 않는다면 언어감지 api 실행
// 사용자 입력 -> 입력 값 읽기 -> api를 통해 반환값 확인 -> 반환값 출력

// 사용자의 입력을 어떻게 읽어오지
// keydown 리스너를 통해 디바운스 함수(clearTimeout)
// 입력값을 api에 요청

const inputArea = document.getElementById('translate-box');
console.dir(inputArea);
let text = '';

inputArea.addEventListener('input', (e) => {
    console.log(e);
    console.log(e.target.value);
    let timer = setTimeout(() => {
        console.log(e.target.value);
    }, 1000);
    clearTimeout(timer);
});
console.log(e.target.value);


// const xhr = new XMLHttpRequest();
// xhr.onload = () => {
//     if (xhr.readyState === xhr.DONE && xhr.status === 200) {
//         const responseData = xhr.responseText; // responseText: 서버로부터 받은 응답 데이터
//         const result = JSON.parse(responseData); // JSON 역직렬화
//         console.log(result); 
//     }

// }

// xhr.open('POST', '/dect');