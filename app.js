// 언어 감지 api
// 사용자가 타자를 계속 입력하면 cleartimeout을 이용해 입력값을 삭제해버림
// 입력이 멈추고 1초 후 마지막 입력값으로 api 실행

const inputArea = document.getElementById("translate-box");
//console.dir(inputArea);
let timer = null;

// 먼저 스택에 clearTimeout 들어오고 web api에 전달된 timer를 즉시 취소
// web api는 setTimeout 실행(등록)
// 스택에 setTimeout 올라가고 콜백함수, 1000 web api로 전달
// 1초 후에 콜백함수 큐에 저장
// 스택이 비어있을 경우 함수실행
inputArea.addEventListener("input", (e) => {
  //console.dir(e.target);
  clearTimeout(timer);
  timer = setTimeout(() => {
    console.log(e.target.value);
  }, 1000);
});
