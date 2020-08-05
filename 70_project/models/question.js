const mongoose = require("mongoose");

// 스키마 정의
// 컬렉션에 들어가는 Document의 구조를 정의
// 필드, 타입, 필수여부 등

const QuestionSchema = new mongoose.Schema({
  // 필드, 타입, 필수여부

  noteid: {
    type: String,
    required: true,
    trim: true,
  },

  title: {
    type: String,
    required: true, // 필수
    trim: true, // 앞뒤 스페이스 자동자르기
  },

  contents: {
    type: String,
    trim: true, // 앞뒤 스페이스 자동자르기
  },

  qimage: {
    data: Buffer,
    contentType: String,
  },

  created: {
    type: Date,
    default: Date.now,
  },
});

const Question = mongoose.model("question", QuestionSchema);
module.exports = Question;
