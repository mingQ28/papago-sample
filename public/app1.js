/**
 * source~: 번역할 텍스트, 번역할 언어의 타입(ko, ja..)
 * target~: 번역된 결과 텍스트, 번역될 언어의 타입(ko, ja..)
 */

// 배열 디스트럭처링 활용
const [sourceSelect, targetSelect] 
    = document.getElementsByTagName('select');

const [sourceTextArea, targetTextArea] 
    = document.getElementsByTagName('textarea');

let timerID;
sourceTextArea.addEventListener('input', event => {
    if(timerID)
        clearTimeout(timerID);
    timerID = setTimeout( ()=> {
        console.log(event.target.value);
    }, 2000);
});