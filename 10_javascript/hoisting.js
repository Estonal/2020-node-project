function foo() {
    console.log(a);  // undefined
    //JavaScript는 함수의 시작 위치로 변수를 끌어올림
    var a = 100;
    console.log(a);  // 100
}

foo();