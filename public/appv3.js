const [sourceSelect, targetSelect] = document.getElementsByTagName('select');
const [sourceTextArea, targetTextArea] = document.getElementsByTagName('textarea');

// 번역될 언어의 타입 변경 이벤트
// English면 en, 한국어면 ko
let targetLanguage = 'en'; // 번역하고 싶은 언어의 타입, 초기값은 en(English)
targetSelect.addEventListener('change', (event) => targetLanguage = event.target.value);

const post = (url, data) =>{ 

  return new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onload = () => {
    if(xhr.status === 200){
      const responseData = xhr.response;
      const parsedData = JSON.parse(responseData);
      resolve(parsedData);
    }else {
      reject(new Error(`HTTP 오류 : ${xhr.status}`));
    }
  }
  xhr.send(JSON.stringify(data));
});
};

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
