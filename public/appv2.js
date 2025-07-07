/* 내가 쓴 코드
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
        translateFromDetected(text);
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

targetSelect.addEventListener("change", () => {
  const text = sourceTextArea.value;
  translateFromDetected(text);
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
*/
const [sourceSelect, targetSelect] = document.getElementsByTagName('select');
const [sourceTextArea, targetTextArea] = document.getElementsByTagName('textarea');

// 번역될 언어의 타입 변경 이벤트
// English면 en, 한국어면 ko
let targetLanguage = 'en'; // 번역하고 싶은 언어의 타입, 초기값은 en(English)
targetSelect.addEventListener('change', (event) => targetLanguage = event.target.value);

let timer;
sourceTextArea.addEventListener('input', (event) => {
    if (timer) clearTimeout(timer);
    
    timer = setTimeout(() => {
        const text = event.target.value;
        
        // 언어 감지 요청
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.readyState == xhr.DONE && xhr.status === 200) {
                const responseData = xhr.response;
                const parsedData = JSON.parse(responseData);
                
                // 화면에 출력할 처리로직, ex. 감지된 언어 -> 한국어
                const detectedLang = parsedData.langCode;
                sourceSelect.value = detectedLang;

                // 후속처리: 언어 감지 요청으로 응답받은 '감지된 언어 결과값(ex. ko)'을 가지고 언어 번역 요청
                const xhr2 = new XMLHttpRequest();

                const url = '/translate';

                const data = JSON.stringify({
                    source: detectedLang,
                    target: targetLanguage,
                    text, // text: text와 같다.
                });

                xhr2.open('POST', url);
                xhr2.onload = () => {
                    if (xhr2.readyState === xhr2.DONE && xhr2.status === 200) {

                        /**
                         * const responseData = {
                                            detectedLanguage,
                                            targetLanguage,
                                            translatedText
                                        }
                        */

                        const responseData = JSON.parse(xhr2.response);
                        console.log(responseData);

                        targetTextArea.value = responseData.translatedText;
                    }
                }

                xhr2.setRequestHeader('Content-Type', 'application/json');
                xhr2.send(data);
            }
        }

        const DETECT_LANGUAGE_URL = '/detect';

        const data = {
            query: text
        }
    
        const stringifiedData = JSON.stringify(data);
        
        xhr.open('POST', DETECT_LANGUAGE_URL);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(stringifiedData);
    }, 2000);

});