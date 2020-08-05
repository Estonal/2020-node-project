//1. 변수

var a = 1;                // 변수 선언
var b = 2;                    
c = 3;                    // var 안써도 에러 안남
// 마치 자료형이 없는 것처럼 보이지만 사실은 있다! typeof "변수명"

console.log("a:" + a);    // 콘솔 출력
console.log("b:%d", b);
console.log(a);
console.log(b);
console.log(c);
console.log("%d, %d, %d", a, b, c);
console.log(a, b, c); // 공백으로 각각 구분되어 출력

var s1 = "Hello";
var s2 = "World!";

console.log("s1:" + s1);
console.log("s2:%s", s2);
console.log("%s %s", s1, s2);
console.log(s1 + s2);

console.log(typeof a);  // number
console.log(typeof s1); // string
console.log(typeof true); // boolean
console.log(typeof {}); // object


//함수만들기
function foo() {
    //변수 호이스팅(hoisting)
    console.log(d); // underfined - d 변수는 선언되었지만 아직 값이 정해지지 않음
    var d = 10;
    console.log(d); // 10

}
foo();

// ES6(2015) let, const 추가
let e = 10;

//ES5까지는 함수 레벨 스코프(비록 나중에 선언했지만 모든 함수에서 접근 가능)
//ES6 : let 추가 -> 블럭 레벨 스코프
function foo2() {
    if (true) {
        var tmp = 0; // var -> let으로 바꿀 시 48Line에서 컴파일에러 발생
        console.log("1:", tmp);
    }
    console.log("2:", tmp); // C나 Java의 경우 컴파일 에러, 그러나 js에서는 에러 안남
}
foo2();

console.log(1 == true); // 값 비교
console.log(1 === true); // 값, 타입 비교 ===
console.log(0 == false); // 값 비교
console.log(0 === true); // 값, 타입 비교 ===

const v = 10;
v++; // Assignment to constant variable