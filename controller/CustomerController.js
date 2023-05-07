const { Customer } = require("../models");
const Validator = require("fastest-validator");
const { Op } = require("sequelize");

// get
const getCustomer = async (req, res) => {
  const page = parseInt(req.query.page) + 1 || 1; // Ambil nomor halaman dari query parameter
  const limit = parseInt(req.query.limit) || 10; // Batasan jumlah data per halaman
  const offset = (page - 1) * limit;
  const searchName = req.query.name || null;
  const searchPhone = req.query.phone || null;
  // console.log('nameeeee', searchName);
  const totalItems = await Customer.count();
  const id = req.params.id;

  const where1 = searchName ? {name: { [Op.like]: `%${searchName}%` }} : {}
  const where2 = searchPhone ? {phone: { [Op.like]: `%${searchPhone}%` }} : {}
  
  const where = Object.assign({}, where1, where2)

  console.log('INi where woy ',where);
  const users =
    id != null
      ? await Customer.findByPk(id, {
          attributes: ["id", "name", "phone", "email", "address"],
        })
      : await Customer.findAll({
          where: Object.keys(where).length === 0 ? {} : {
            [Op.or]: [where]
          },
          attributes: ["id", "name", "phone", "email", "address"],
          limit: limit,
          offset: offset,
          order: [["createdAt", "DESC"]],
        });
  res.status(200).json({
    status: "success",
    data: users,
    meta: {
      currentPage: page - 1,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
    },
  });
};

// store
const storeCustomer = async (req, res) => {
  const v = new Validator();
  const schema = {
    name: "string|empty:false",
    email: "email|empty:false",
    phone: "string|min:6",
    address: "string|min:3",
  };
  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const customer = await Customer.findOne({
    where: {
      [Op.or]: [{ email: req.body.email }, { name: req.body.name }],
    },
  });

  if (customer) {
    return res.status(409).json({
      status: "error",
      message: "email or name already exist",
    });
  }

  const data = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  };

  const createdCustomer = await Customer.create(data);

  return res.status(201).json({
    status: "success",
    data: {
      id: createdCustomer.id,
    },
  });
};

// update
const updateCustomer = async (req, res) => {
  const v = new Validator();
  const schema = {
    name: "string|empty:false",
    email: "email|empty:false",
    phone: "string|min:6",
    address: "string|min:3",
  };
  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const id = req.params.id;
  const customer = await Customer.findByPk(id);
  if (!customer) {
    return res.status(404).json({
      status: "error",
      message: "customer not found",
    });
  }

  if (req.body.email || req.body.name) {
    checkMailandName = await Customer.findOne({
      where: {
        [Op.or]: [{ email: req.body.email }, { name: req.body.name }],
        [Op.not]: { id: id },
      },
    });

    if (checkMailandName) {
      return res.status(409).json({
        status: "error",
        message: "email or name already exist",
        checkMailandName,
      });
    }
  }
  const { name, email, phone, address } = req.body;
  await customer.update({
    name,
    email,
    phone,
    address,
  });

  return res.json({
    status: "success",
    data: {
      id: customer.id,
      name,
      email,
      phone,
      address,
    },
  });
};

const destroyCustomer = async (req, res) => {
  await Customer.destroy({ where: { id: req.params.id } });

  if (!customer) {
    return res.status(404).json({
      status: "error",
      message: "customer not found",
    });
  }

  return res.json({
    status: "success",
    message: "customer deleted",
  });
};

module.exports = {
  getCustomer,
  storeCustomer,
  updateCustomer,
  destroyCustomer,
};
