// 5. 콜백 함수

// 동기식 처리
function add(a, b) {
    let sum = a + b;
    return sum;
}

function print(result) {
    console.log(result);
}

print(add(2, 3)); // 동기식 처리 방식

// 비동기식 처리 (콜백함수) - 여기서는 print
// 인자로 callback함수를 넘겨줌.
// 시스템적으로 더 효율적
function add2(a, b, callback) {
    let sum = a + b;
    callback(sum); //거꾸로 print가 호출당함
}

add2(2, 3, print);

// 익명 함수
add2(2, 3, function (result) {
    console.log(result);
});
add2(2, 3, (result) => console.log(result));