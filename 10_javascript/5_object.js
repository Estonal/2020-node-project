// 4. 객체

// 객체 선언
let a = {}; // 배열은 [], 객체는 {}, 빈 객체
let b = new Object();
console.log(typeof a);

// 객체 : 속성, 메소드
let Person = {};
Person.age = 19; // object.속성명
Person["name"] = "효연이"; // objct["속성명"]
console.log(Person);

// key : value
let Person2 = {
    age: 10,
    name: "펭수"
}
var name = "name";
console.log(Person2.age);
console.log(Person2["name"]); // 문자열 식으로 [ ] 안에 들어가야 됨.
console.log(Person2[name]); // 이게 되는 이유는 var name = "name"을 만들었기 때문

Person2.add = function () {
    console.log("저는 %d살 %s입니다", this.age, this.name); // this를 넣어 객체 안의 age라는 것을 알려줘야 함
}

Person2.add();


let Person3 = {
    age: 10,
    name: "펭수",
    print: function () {
        console.log("저는 %d살 %s입니다", this.age, this.name); // this를 넣어 객체 안의 age라는 것을 알려줘야 함
    }
};

Person3.print();

// 배열 Friends안에 2개 객체를 생성
// 객체 property = no, name
let Friends = [ // 배열
    { no: 1, name: "ㅇ" },
    { no: 2, name: "ㄴ" }
];

//ㅇ 출력
console.log(Friends[0].name);
console.log(Friends[1]["name"]);

let grades = {
    data: {
        kor: 100,
        mat: 90,
        eng: 95
    },
    print() { // print : function()
        for (subject in this.data) { // key값을 꺼내옴, kor, mat, eng를 subject에 순서대로 저장
            console.log(subject + ":" + this.data.subject); // X 결과가 제대로 안나옴 this.data.subject를 찾는데 kor,mat,eng밖에 없어서 undefined 출력

            console.log(subject + ":" + this.data[subject]); // 정상출력
        }
    }
};

grades.print();

// 수학 점수 출력
console.log(grades.data.mat);
console.log(grades.data["mat"]);
console.log(grades["data"].mat);
console.log(grades["data"]["mat"]);


var id = 3401;
var name = "강지윤";
//ES6
let obj = {
    id, // 3401
    name, // 강지윤
};
console.log("%d, %s", obj.id, obj.name);