const [sourceSelect, targetSelect] = document.getElementsByTagName("select");
const [sourceTextArea, targetTextArea] =
  document.getElementsByTagName("textarea");

let timerId;
sourceTextArea.addEventListener("input", (event) => {
  if (timerId) clearTimeout(timerId);

  timerId = setTimeout(() => {
    const text = event.target.value;

    // server.js로 전달하기 위해 XHR(XMLHttpRequest API) 코드 작성
    // 1. XHR API(객체) 호출
    const xhr = new XMLHttpRequest(); // Web API(브라우저에서만 사용 가능)

    // 2. Node.js 서버로부터 요청 결과를 받았을 경우 처리할 로직(onload, 이벤트)
    xhr.onload = () => {
      // 응답 결과 처리 로직
      if (xhr.readyState == xhr.DONE && xhr.status === 200) {
        // 결과 데이터를 문자열 형태로 응답받음
        const responseData = xhr.response;
        // 결과 데이터를 JS 객체 형태로 파싱(역직렬화)
        const parsedData = JSON.parse(responseData);

        // 화면에 출력할 처리로직, ex. 감지된 언어 -> 한국어
        const detectedLang = parsedData.langCode; //
        sourceSelect.value = detectedLang;

        // 후속처리 : 언어감지 요청으로 응답받은 '감지된 언어 결과값(ex.ko)를 가지고 언어 번역 요청 수행
        targetSelect.addEventListener("change", () => {
          translateFromDetected(text);
        });
      }
    };

    // 3. 요청 준비(어떤 요청이고, 보낼 엔드포인트 주소)
    // 3-1. 보낼 엔드포인트 주소
    const DETECT_LANGUAGE_URL = "/detect"; // 현재 접속 중인 페이지가 localhost:3000/이기 때문에 뒤에 붙음

    // 3-2. 보낼 데이터(JSON 형태로 전송)
    const data = {
      query: text,
    };

    xhr.open("POST", DETECT_LANGUAGE_URL);

    // 4-1. 전송할 데이터(컨텐츠)의 타입(Media type)을 명시
    xhr.setRequestHeader("Content-Type", "application/json");

    // 직렬화
    const stringifiedData = JSON.stringify(data);

    // 4. 실제 요청 전송
    xhr.send(stringifiedData);
  }, 2000);
});

const translateFromDetected = (text) => {
  const transXhr = new XMLHttpRequest();
  transXhr.onload = () => {
    if (transXhr.readyState == transXhr.DONE && transXhr.status === 200) {
      const parseTarget = JSON.parse(transXhr.response);
      const transLatedText = parseTarget.translatedText;
      targetTextArea.value = transLatedText;
    }
  };
  const TRANS_LANGUAGE_URL = "/translate";
  const transData = {
    source: sourceSelect.value,
    target: targetSelect.value,
    text: text,
  };
  transXhr.open("POST", TRANS_LANGUAGE_URL);
  transXhr.setRequestHeader("Content-Type", "application/json");
  transXhr.send(JSON.stringify(transData));
};
