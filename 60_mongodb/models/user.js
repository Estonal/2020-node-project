const mongoose = require("mongoose");

// 스키마 정의 (사용자정보)
// 컬렉션에 들어가는 Document의 구조를 정의
// 필드, 타입, 필수여부 등

const UserSchema = new mongoose.Schema({
    // 필드, 타입, 필수여부
    name: {
        type: String,
        required: true, // 필수
        trim: true, // 앞뒤 스페이스 자동자르기
        maxlength: 50, // 최대 길이
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true, //유니크한 값만 담음 - 키값으로 사용가능
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: Number,
        default: 0 // 0: 일반 사용자, 1: 관리자
    },
    token: {
        type: String,
    },
});

// 스키마 -> 모델
const User = mongoose.model("user", UserSchema);
module.exports = User;
