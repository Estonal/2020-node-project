// 2. 전역 객체
// - console : 콘솔과 관련된 기능
// - process : 프로그램과 관련된 기능
// - exports : 모듈과 관련된 기능
console.time("test");
// 수행
console.timeEnd("test");

console.log(process.version); // 노드 버전
console.log(process.arch);
console.log(process.memoryUsage());


process.exit(); // 이거 뒤에 쓴 명령어들은 실행안됨
console.log("??");