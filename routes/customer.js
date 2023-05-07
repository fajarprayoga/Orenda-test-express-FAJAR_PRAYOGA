const {
  getCustomer,
  storeCustomer,
  updateCustomer,
  destroyCustomer,
} = require("../controller/CustomerController");

var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/:id?", getCustomer);
router.post("/", storeCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", destroyCustomer);

module.exports = router;
