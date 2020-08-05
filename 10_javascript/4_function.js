// 3. 함수

// 첫번째 방식
function add(a, b) // 함수 인자를 받을때는 var 아예 생략
{
    return a + b;
}

console.log(add(2, 3)); // 5

// 두번째 방식
// (익명 함수)
let add2 = function (a, b) { // 변수명 적어도 되고 안적어도 됨 - 함수를 가리키는 변수를 만들었으므로 생략O
    
    return a + b;
};

console.log(typeof add2);
console.log(add2(2, 3));

let add3 = (function (a, b) { 
    
    return a + b;
})(2, 3); // () 선언부 (2, 3) - 함수에 입력하는거

console.log(typeof add3); // number
console.log(add3);

// 네번째 방식 (ES6, arrow function) 가장 간단한 형태
let add4 = ((a, b) => a + b)(2, 3);

console.log(add4);
