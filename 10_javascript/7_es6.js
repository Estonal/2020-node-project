// 6. ES6
// let, const 추가
// var vs let (var : 함수레벨 스코프, let : 블록레벨 스코프)
let a = 10;
let b = [1, 2, 3];
let c = {};

const d = 10; // 상수를 만듬

// 템플릿 문자열 (백틱 이용(`))
let n1 = "펭", n2 = "수";
// My name is 펭 수.
let name = "My name is " + n1 + " " + n2 + ".";
console.log(name);

let name2 = `My name is ${n1} ${n2}.`; // 백틱 이용
console.log(name2);

// 화살표 함수 (arrow function)
function hello() {
    console.log("hello");
}

var hello = function () {
    console.log("hello");
}
hello();
//괄호쳐서 정의부 넣고
(function () {
    console.log("hello");
})(); // 입력부 넣기

var hello = () => {
    console.log("hello");
}
hello();

{(() => console.log("hello"))()};

//매개변수 1개 함수
function print() {
    console.log("hello");
}
print("펭수");

// 익명함수
let f = function (a) {
    console.log(a);
};
f("펭수");

// 함수정의 + 호출
((a) => {
    console.log(a);
})("펭수");

// 매개변수 2개
function add(a, b) {
    return a + b;
}

// 익명 함수
let add = function (a, b) {
    return a + b;
}
console.log(add(2, 3));

// 함수 정의 + 호출
var result = function(a, b) {
    console.log(a + b);
}(2, 3);

// 화살표 함수
var result = ((a, b) => {
    console.log(a + b);
})(2, 3);

var result = (((a, b) => a + b)(2, 3));
