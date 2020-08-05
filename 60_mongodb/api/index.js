const express = require('express');
const router = express.Router();

router.use("/music", require("./music")); // /다음 생략 시 index.js 우선으로 찾아봄
router.use("/movie", require("./movie"));
router.use("/user", require("./user"));

module.exports = router;