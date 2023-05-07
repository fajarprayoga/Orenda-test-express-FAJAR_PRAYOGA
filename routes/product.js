const {
  getProduct,
  storeProduct,
  updateProduct,
  destroyProduct,
} = require("../controller/ProductController");

var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/:id?", getProduct);
router.post("/", storeProduct);
router.put("/:id", updateProduct);
router.delete("/:id", destroyProduct);
module.exports = router;
