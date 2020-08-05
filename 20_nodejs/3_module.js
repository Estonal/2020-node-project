/*exports.add = (a, b) => {
    return a + b;
};

exports.sub = (a, b) => {
    return a - b;
}; */

const myCalc = {
    add(a, b) {
        return a + b;
    },
    sub(a, b) {
        return a - b;
    }
};

//exports.xxx = myCalc;
exports.calc = myCalc; // exports는 반드시 점 뒤에 property명을 써야함.
//exports = myCalc; -> exports라는 변수에 myCalc를 넣는다 란 뜻으로 이해해버림

