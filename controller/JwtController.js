const { Customer } = require("../models");
const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_SECRET_REFRESH_TOKEN_EXPIRED,
} = process.env;
// syncronus
const getToken = async (req, res) => {
  // start
  const params = req.params;

  // get user
  customer = await Customer.findOne({
    attributes: ["id"],
    where: {
      email: params.email,
    },
  });

  if (!customer) {
    return res.status(404).json({
      status: "error",
      message: "customer not found",
    });
  }

  const token = jwt.sign(
    {
      data: customer,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
    }
  );
  res.status(201).json({ status: "success", data: token });
};

const verifyToken = async (req, res) => {
  // start
  // const JWT_SECRET = "fajar-prayoga";
  const token = jwt.sign(
    {
      data: { kelas: "learn micro" },
    },
    JWT_SECRET,
    {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
    }
  );
  //   res.status(201).json({ status: "success", data: token });
  jwt.verify(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiMjJjMzc5MGMtZWExNS0xMWVkLThkY2QtOTZiNWZmYmJiOWRhIiwibmFtZSI6ImZhamFyIiwiZW1haWwiOiJmYWphcnByYXlvZ2EyM0BnbWFpbC5jb20iLCJwaG9uZSI6IjA4MjE0NTkzMTUxMyIsImFkZHJlc3MiOiJNZW5nd2kgQmFoYSJ9LCJpYXQiOjE2ODMxNzI1ODUsImV4cCI6MTY4MzIwODU4NX0.pyp9W3jpN6ljb_kxoomRCBYYxdOzVi6EYoc4bhzrNM8",
    JWT_SECRET,
    (err, decode) => {
      if (err) {
        return res.status(400).json({ status: "success", data: err.message });
      }
      return res.status(200).json({ status: "success", data: decode });
    }
  );
};

module.exports = {
  getToken,
  verifyToken,
};
