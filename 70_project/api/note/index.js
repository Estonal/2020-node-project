const express = require("express");
const router = express.Router();
const ctrl = require("./note.ctrl");
const multer = require("multer");
const path = require("path");
const NoteModel = require("../../models/note");
const QuestionModel = require("../../models/question");
const UserModel = require("../../models/user");
const fs = require("fs");

let storage = multer.diskStorage({
  destination: (req, files, cb) => {
    cb(null, __dirname + "/../../public/images");
  },
  filename: (req, files, cb) => {
    const noteid = req.params.noteid;
    const { title, contents } = req.body;
    const q = {
      noteid,
      title,
      contents,
    };

    QuestionModel.create(q, (err, result) => {
      // if (!title)
      // return res.status(400).end("필수항목이 입력되지 않았습니다.");

      if (!title) return cb(new Error("necessity not inputed"));
      if (err) return cb(err);

      req.udbid = JSON.stringify(result._id).replace(/\"/g, "");
      cb(null, JSON.stringify(result._id).replace(/\"/g, "") + ".png");
    });
  },
});

var upload = multer({ storage: storage });

//라우팅 설정
router.get("/", ctrl.list); // 노트목록조회

router.get("/new", ctrl.showCreatePage); // 노트 생성 페이지 보여주기

router.get("/:noteid", ctrl.checkId, ctrl.detail); // 문제 조회

router.get("/:noteid/edit", ctrl.checkId, ctrl.showUpdatePage); // 노트 수정 페이지

router.get("/:noteid/new", ctrl.showCreateQuestionPage); // Question 생성 페이지 보여주기

router.get("/:noteid/:qid", ctrl.checkId, ctrl.checkQid, ctrl.detailQuestion); // Question Detail 페이지 보여주기

router.get(
  "/:noteid/:qid/edit",
  ctrl.checkId,
  ctrl.checkQid,
  ctrl.showQuestionUpdatePage
); // 노트 수정 페이지 보여주기

router.post("/", ctrl.create); // 노트 생성

router.post("/:noteid", ctrl.checkId, upload.any(), ctrl.createQuestion); // 문제 정리 등록

router.put("/:noteid", ctrl.checkId, ctrl.update); // 노트 수정

router.put("/:noteid/:qid", ctrl.checkId, ctrl.checkQid, ctrl.updateQuestion); // 문제 정리 수정

router.delete("/:noteid", ctrl.checkId, ctrl.remove); // 노트 삭제

router.delete(
  "/:noteid/:qid",
  ctrl.checkId,
  ctrl.checkQid,
  ctrl.removeQuestion
); // 문제 정리 삭제

module.exports = router;
