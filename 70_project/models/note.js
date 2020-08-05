const mongoose = require("mongoose");

// 스키마 정의
// 컬렉션에 들어가는 Document의 구조를 정의
// 필드, 타입, 필수여부 등

const NoteSchema = new mongoose.Schema({
    // 필드, 타입, 필수여부

    email: {
        type: String,
        required: true, // 필수
        trim: true, // 앞뒤 스페이스 자동자르기
    },

    title: {
        type: String,
        required: true, // 필수
        trim: true, // 앞뒤 스페이스 자동자르기
    },
    
    subject: {
        type: String,
        required: true,
        trim: true,
    },
    created: {
        type: Date,
        default: Date.now,
    }
});

const Note = mongoose.model("note", NoteSchema);
module.exports = Note;
