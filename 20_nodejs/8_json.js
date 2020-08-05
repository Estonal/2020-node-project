const singer = {
    name: "퀸",
    members: ["프레디 머큐리", "브라이언 메이", "존 디콘", "킴도훈"],
    songs: [
        {
            title: "We are the champions",
            year: 1977,
        },
        {
            title: "Radio Ga Ga",
            year: 1984,
        },
    ],
};

// 킴도훈 출력
console.log(singer.members[3]);
// Radio Ga Ga 출력
console.log(singer.songs[1].title);


// JSON Object -> string (http, tcp/ip에서는(통신 프로그램 만들때에는) string으로 받아야 함)
const str = JSON.stringify(singer);
console.log(str);


// string -> JSON Object
console.log(JSON.parse(str));