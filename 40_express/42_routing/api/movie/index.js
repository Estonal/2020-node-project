const express = require('express');
const router = express.Router();
const ctrl = require("./movie.ctrl");

// localhost:3000/movie, get
// 또 /movie 하면 중첩됨
// 할 시 localhost:3000/movie/movie/

router.get("/", ctrl.list);

router.get("/:id", ctrl.detail);

router.post("/", ctrl.create);

router.put("/:id", ctrl.update);

router.delete("/:id", ctrl.remove);


module.exports = router;