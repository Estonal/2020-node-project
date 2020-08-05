const express = require('express');
const router = express.Router();

router.use("/note", require("./note"));
router.use("/user", require("./user"));


module.exports = router;