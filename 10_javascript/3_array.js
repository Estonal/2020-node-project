//2. 배열

var arr = [1, 2, 3, 4, 5]; // 대괄호임
console.log(arr.length); // 5, arr도 하나의 Object임 .length = property
console.log(arr[2]); // 3

let arr2 = [1, 2, "apple", "banana"];
//apple 출력
console.log(arr2[2]);


// 반복문
for (i = 0; i < arr2.length; i++) {
    console.log(i, arr2[i]);
}

// for-in
for (i in arr2) {
    console.log(i); // i : index
}

// for-of (ES6)
for (i of arr2) {
    console.log(i); // i : element
}


// splice
// index(시작시점), howmany(몇개의 데이터를 삭제? 개수), elements(추가할 데이터)
let a = ["a", "b", "c"];
a.splice(1, 0, "d") // a, d, b, c 삭제할 거 없으면 두번째 0
console.log(a);

// [ 'a', 'd', 'b', 'c' ]
// a, d, x, y, c
a.splice(2, 1, 'x', 'y'); // b 하나 삭제, 'x', 'y' 추가
console.log(a);

const b = [1, 2, 3, 4, 5];
console.log(b.slice(0, 3));

const result = b.find((item) => item >= 3) //입력받은 item이 3보다 이상 3(o),4,5
console.log(result); // 3

const result2 = b.filter(item => item >= 3) // [3, 4, 5] 새로운 '배열'을 만들어서 리턴
console.log(result2);

const result3 = b.map(item => item * 2);
console.log(result3);