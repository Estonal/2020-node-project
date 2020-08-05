function foo() {
    if (true) {
        let tmp = 0; // let - if 안에서만 사용 가능
        console.log("1:" + tmp);
    }
    console.log("2:" + tmp);
}

foo();