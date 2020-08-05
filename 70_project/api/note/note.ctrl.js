const NoteModel = require("../../models/note");
const QuestionModel = require("../../models/question");
const UserModel = require("../../models/user");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const mongoose = require("mongoose");

// id 유효성 체크
const checkId = (req, res, next) => {
  const id = req.params.noteid;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // true or false 유효한 Id인지
    return res.status(400).end();
  }
  next();
};

const checkQid = (req, res, next) => {
  const id = req.params.qid;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // true or false 유효한 Id인지
    return res.status(400).end();
  }
  next();
};

const list = (req, res) => {
  const token = req.cookies.token;
  UserModel.find({ token }, (err, result) => {
    if (err) return res.status(404).send("토큰에 대응하는 계정이 없습니다.");
    const { name, email } = result[0];

    NoteModel.find({ email }, (err2, result) => {
      if (err2) return res.status(500).end(); //next(err); // throw err;
      res.render("note/list", { result });
    }).sort({ _id: -1 });
  });
};

// 상세조회 (localhost:3000/api/music/:id)

const detail = (req, res) => {
  const noteid = JSON.stringify(req.params.noteid).replace(/\"/g, "");

  QuestionModel.find({ noteid: noteid }, (err, result) => {
    if (err) return res.status(500).end(); //next(err); // throw err;
    res.render("note/detail", { noteid, result });
  }).sort({ _id: -1 });
};

const create = (req, res) => {
  const { email, title, subject } = req.body;
  if (!email || !title || !subject)
    return res.status(400).end("필수항목이 입력되지 않았습니다.");
  const n = { email, title, subject };

  // 2. Model.Create()
  NoteModel.create(n, (err, result) => {
    if (err) return res.status(500).send("등록 시 오류가 발생했습니다."); //throw err;
    res.status(201).json(result);
  });
};

const update = (req, res) => {
  const noteid = req.params.noteid;

  //FindByIdAndUpdate
  const { title, subject } = req.body;
  NoteModel.findByIdAndUpdate(
    noteid,
    { title, subject },
    { new: true }, // 업데이트된 결과가 나옴
    (err, result) => {
      if (err) return res.status(500).send("수정 시 오류가 발생했습니다."); //throw err;
      if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
      res.json(result);
    }
  );
};

const remove = (req, res) => {
  // 노트 자체 Remove

  const noteid = req.params.noteid;
  // const stringified_noteid = JSON.stringify(noteid).replace(/\"/g, "");

  console.log(noteid);
  // 삭제처리 (findByIdAndDelete)
  NoteModel.findByIdAndDelete(noteid, (err, result) => {
    if (err) return res.status(500).send("삭제 시 오류가 발생했습니다.");
    if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
    res.json(result);
  });

  QuestionModel.deleteMany({ noteid }, (err, result) => {
    if (err) return res.status(500).send("삭제 시 오류가 발생했습니다.");
    if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
  });
};

const showCreatePage = (req, res) => {
  res.render("note/create");
};

const showCreateQuestionPage = (req, res) => {
  const noteid = req.params.noteid;
  res.locals.noteid = noteid;
  res.render("note/create_question");
};

const showUpdatePage = (req, res) => {
  const noteid = req.params.noteid;
  NoteModel.findById(noteid, (err, result) => {
    if (err) return res.status(500).send("조회 시 오류가 발생했습니다");
    if (!result) return res.status(404).send("해당하는 정보가 없습니다");
    res.render("note/update", { result });
  });
};

const createQuestion = (req, res) => {
  const qid = req.udbid;

  QuestionModel.findByIdAndUpdate(
    qid,
    {
      qimage: {
        data: fs.readFileSync(
          path.join(__dirname + "/../../public/images/" + qid + ".png")
        ),
        contentType: "image/png",
      },
    },
    { new: true }, // 업데이트된 결과가 나옴
    (err, result) => {
      if (err) return res.status(500).send("수정 시 오류가 발생했습니다."); //throw err;
      if (!res) return res.status(404).send("해당하는 정보가 없습니다.");
      res.redirect("/api/note/" + result.noteid);
    }
  );
};

const detailQuestion = (req, res) => {
  const noteid = req.params.noteid;
  const qid = req.params.qid;

  QuestionModel.findOne({ _id: qid }, (err, result) => {
    //_id로 받을꺼면 차라리 걍 findById를 써라
    if (err) return res.status(500).end(); //throw err;
    if (!result) return res.status(404).end();
    //res.json(result);
    res.render("note/q_detail", { result });
  });
};

const removeQuestion = (req, res) => {
  const noteid = req.params.noteid;
  const qid = req.params.qid;

  // 삭제처리 (findByIdAndDelete)
  QuestionModel.findByIdAndDelete(qid, (err, result) => {
    if (err) return res.status(500).send("삭제 시 오류가 발생했습니다.");
    if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
    res.json(result);
  });
};

const showQuestionUpdatePage = (req, res) => {
  const noteid = req.params.noteid;
  const qid = req.params.qid;
  QuestionModel.findById(qid, (err, result) => {
    if (err) return res.status(500).send("조회 시 오류가 발생했습니다");
    if (!result) return res.status(404).send("해당하는 정보가 없습니다");
    res.render("note/q_update", { result });
  });
};

const updateQuestion = (req, res) => {
  const noteid = req.params.noteid;
  const qid = req.params.qid;

  const { title, contents } = req.body;
  QuestionModel.findByIdAndUpdate(
    qid,
    { title, contents },
    { new: true }, // 업데이트된 결과가 나옴
    (err, result) => {
      if (err) return res.status(500).send("수정 시 오류가 발생했습니다."); //throw err;
      if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
      res.json(result);
    }
  );
};

module.exports = {
  list,
  detail,
  create,
  update,
  remove,
  checkId,
  checkQid,
  showCreatePage,
  showUpdatePage,
  createQuestion,
  showCreateQuestionPage,
  detailQuestion,
  removeQuestion,
  showQuestionUpdatePage,
  updateQuestion,
};
