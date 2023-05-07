const { getToken, verifyToken } = require("../controller/JwtController");

var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/get-token/:email", getToken);
router.get("/verify", verifyToken);

module.exports = router;
