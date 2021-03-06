const express = require('express');
const router = express.Router();
const ctrl = require("./music.ctrl");


// localhost:3000/music, get
// 또 / 하면 중첩됨
// 할 시 localhost:3000/music/music/


//라우팅 설정
router.get("/", ctrl.list); // 목록조회 (/music)

router.get("/new", ctrl.showCreatePage); // 등록페이지 보여주기

router.get("/:id", ctrl.checkId, ctrl.detail); // 상세조회 (/music:/id)

router.get("/:id/edit", ctrl.checkId, ctrl.showUpdatePage); // 수정 페이지



router.post("/", ctrl.create); // 등록 (/music)

router.put("/:id", ctrl.checkId, ctrl.update); // 수정 (/music/:id)

router.delete("/:id", ctrl.checkId, ctrl.remove); // 삭제 (/music/:id)

//router.get("/new", ctrl.showCreatePage); // 등록페이지 보여주기


module.exports = router;