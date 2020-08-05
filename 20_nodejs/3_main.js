const calc2 = require("./3_module") // 밖에서 필요한 모듈을 불러옴
const calc3 = require("./3_module2")


console.log(calc2.calc.add(1, 2));    // exports.add = (a, b) => {}
console.log(calc2.calc.sub(1, 2));    //exports = myCalc; {}


// module.exports = myCalc;
console.log(calc3.mul(2, 3));
console.log(calc3.div(2, 3));

console.log(exports === module.exports); // true exports는 module.export의 숏 = 같은 객체임.
// 주의해야할 점은 exports 뒤에는 무조건 property