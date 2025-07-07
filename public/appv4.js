const [sourceSelect, targetSelect] = document.getElementsByTagName('select');
const [sourceTextArea, targetTextArea] = document.getElementsByTagName('textarea');

// 번역될 언어의 타입 변경 이벤트
// English면 en, 한국어면 ko
let targetLanguage = 'en'; // 번역하고 싶은 언어의 타입, 초기값은 en(English)
targetSelect.addEventListener('change', (event) => targetLanguage = event.target.value);

const post = async (url, data) => {
  let response;
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }
  try{
    response = await fetch(url, options);
  }catch (err) {
    // fetch() 자체가 실패한 경우 (TypeError: Failed to fetch ...)
    throw new Error('네트워크 오류: 서버 연결 실패');
  }

  if (!response.ok) {
    // 2xx가 아닌 HTTP 상태코드
    throw new Error(`HTTP 오류: ${response.status}`);
  }

  /* 정상 응답 → JSON 파싱 */
  return response.json();
}

let timer;
sourceTextArea.addEventListener('input', (event) => {
    if (timer) clearTimeout(timer);
    
    timer = setTimeout(() => {
        const text = event.target.value;
        
        post('./detect', {query: text})
        .then(dectLang => {
          const detectedLang = dectLang.langCode;
          sourceSelect.value = detectedLang;
          return post('./translate', {
          source: dectLang.langCode,
          target: targetLanguage,
          text,
          })
        })
        .then(transLang => { 
          targetTextArea.value = transLang.translatedText;
        })
    }, 2000);

});
