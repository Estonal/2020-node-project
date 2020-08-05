// 기본모듈
// path : 파일/URL 경로를 다루는 모듈
const path = require("path");

console.log(__dirname);
console.log(__filename);


console.log(path.basename);

//string -> object (잘 조립해서 객체를 만들어줌)
const obj = path.parse(__filename);
console.log(obj);