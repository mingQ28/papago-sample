// 언어 감지 api
// 사용자가 타자를 계속 입력하면 cleartimeout을 이용해 입력값을 삭제해버림
// 입력이 멈추고 1초 후 마지막 입력값으로 api 실행

const inputArea = document.getElementById("translate-box");
//console.dir(inputArea);
let timer = null;

// 먼저 스택에 clearTimeout 들어오고 web api에 전달된 timer를 즉시 취소 => 1초 되기 전에 계속 입력해도 clear => 1초가 되면 실행
// web api는 setTimeout 실행(등록)
// 스택에 setTimeout 올라가고 콜백함수, 1000 web api로 전달
// 1초 후에 콜백함수 큐에 저장
// 스택이 비어있을 경우 함수실행
inputArea.addEventListener("input", (e) => {
  //console.dir(e.target);
  clearTimeout(timer); // 계속 입력할 경우 timer 취소
  timer = setTimeout(() => {// 1초 동안 입력값이 없을 경우 실행
    console.log(e.target.value);
  }, 1000); 
});
