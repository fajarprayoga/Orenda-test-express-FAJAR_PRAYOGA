const {
  storeOrder,
  getCustomerOrder,
} = require("../controller/OrderController");

var express = require("express");
var router = express.Router();

/* GET users listing. */
router.post("/", storeOrder);
router.get("/customer/:customerId", getCustomerOrder);
module.exports = router;
