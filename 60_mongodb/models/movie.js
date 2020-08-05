const mongoose = require("mongoose");

// 스키마 정의
// 컬렉션에 들어가는 Document의 구조를 정의
// 필드, 타입, 필수여부 등

const MovieSchema = new mongoose.Schema({
    // 필드, 타입, 필수여부
    title: {
        type: String,
        required: true, // 필수
        trim: true, // 앞뒤 스페이스 자동자르기
    },
    director: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: String,
        required: true,
        trim: true,
    },
    created: {
        type: Date,
        default: Date.now,
    }
});

// 스키마 -> 모델
// 컬렉션 -> musics 컬렉션 생성 < Music을 생성했는데 자동으로 s 붙이고 컬렉션만듬. s 떼고싶으면 세번째인자에 컬렉션 이름 넣어야함 ex) "music"
const Movie = mongoose.model("movie", MovieSchema);
module.exports = Movie;
