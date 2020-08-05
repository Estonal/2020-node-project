//모듈을 만드는 두번째 방식.
const myCalc = {
    mul: (a, b) => {
        return a * b;
    },
    div: (a, b) => {
        return a / b;
    },
};

module.exports = myCalc; // 가능함. 3_module.js와의 차이