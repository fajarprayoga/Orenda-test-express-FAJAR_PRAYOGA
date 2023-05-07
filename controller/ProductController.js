const { Product } = require("../models");
const Validator = require("fastest-validator");

// get
const getProduct = async (req, res) => {
  const id = req.params.id;
  const users =
    id != null ? await Product.findByPk(id) : await Product.findAll();
  res.status(201).json({ status: "success", data: users });
};

// store
const storeProduct = async (req, res) => {
  const v = new Validator();
  const schema = {
    name: "string|empty:false",
    unit: "string|empty:false",
    price: "number|empty:false",
  };
  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const product = await Product.findOne({
    where: { name: req.body.name },
  });

  if (product) {
    return res.status(409).json({
      status: "error",
      message: "product already exist",
    });
  }

  const data = {
    name: req.body.name,
    unit: req.body.unit,
    price: req.body.price,
  };

  const createdProduct = await Product.create(data);

  return res.status(201).json({
    status: "success",
    data: {
      id: createdProduct.id,
    },
  });
};

// update
const updateProduct = async (req, res) => {
  const v = new Validator();
  const schema = {
    name: "string|empty:false",
    unit: "string|empty:false",
    price: "number|empty:false",
  };
  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const id = req.params.id;
  const product = await Product.findByPk(id);
  if (!product) {
    return res.status(404).json({
      status: "error",
      message: "product not found",
    });
  }

  if (req.body.name) {
    checkName = await Product.findOne({
      where: { name: req.body.name },
    });

    if (checkName && req.body.name != product.name) {
      return res.status(409).json({
        status: "error",
        message: "email or name already exist",
      });
    }
  }
  const { name, unit, price } = req.body;
  await product.update({
    name,
    unit,
    price,
  });

  return res.json({
    status: "success",
    data: {
      id: product.id,
      name,
      unit,
      price,
    },
  });
};

// delete
const destroyProduct = async (req, res) => {
  product = await Product.destroy({ where: { id: req.params.id } });

  if (!product) {
    return res.status(404).json({
      status: "error",
      message: "product not found",
    });
  }

  return res.json({
    status: "success",
    message: "product deleted",
  });
};

module.exports = {
  getProduct,
  storeProduct,
  updateProduct,
  destroyProduct,
};
