var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var customersRouter = require("./routes/customer");
var productRouter = require("./routes/product");
var jwtRouter = require("./routes/jwtToken");
var orderRouter = require("./routes/order");
const verifyToken = require("./middleware/verifyToken");
const cors = require("cors");
var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/customer", verifyToken, customersRouter);
app.use("/product", verifyToken, productRouter);
app.use("/jwt", jwtRouter);
app.use("/order", verifyToken, orderRouter);

module.exports = app;
