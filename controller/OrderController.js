const Validator = require("fastest-validator");
const { Order, Product, Customer, sequelize, OrderItem } = require("../models");
const { Op } = require("sequelize");

// store data
const storeOrder = async (req, res) => {
  const v = new Validator();
  const schema = {
    customerId: "string|empty:false",
    products: {
      type: "array",
      empty: false,
    },
    discount: "number|empty:false",
  };
  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const { products, customerId, discount } = req.body;

  // get customer
  const customer = await Customer.findByPk(customerId);

  if (!customer) {
    return res.status(404).json({
      status: "error",
      message: "customer not found",
    });
  }

  // get data by product
  const productData = await Product.findAll({
    where: {
      id: {
        [Op.in]: products,
      },
    },
  });

  if (productData.length <= 0) {
    return res.status(404).json({
      status: "error",
      message: "product not found",
    });
  }

  var price = productData.reduce(
    (accumulator, item) => accumulator + parseInt(item.price),
    0
  );

  if (discount > 0) {
    totalDiscount = price - price * (discount / 100);
  }

  sequelize.transaction(async (transaction) => {
    try {
      const order = await Order.create({
        discount,
        price,
        customerId,
        total: totalDiscount ?? price,
      }).then(async (order) => {
        const itemData = [];
        productData.map((item, index) => {
          itemData[index] = {
            orderId: order.id,
            name: item.name,
            unit: item.unit,
            price: item.price,
          };
        });
        // console.log('order id',item);
        await OrderItem.bulkCreate(itemData);
      });

      // const orderItem = await OrderItem.bulkCreate([
      //   { orderId: order.id, name: "mie", unit: "123", price: 20000 },
      //   { orderId: order.id, name: "mie sedap", unit: "123", price: 70000 },
      // ]);

      transaction.commit();
      res.status(201).json({ status: "success", message: "Order succesfully" });
    } catch (error) {
      transaction.rollback();
      return res.status(404).json({
        status: "error",
        message: error.message,
      });
    }
  });
};

const getCustomerOrder = async (req, res) => {
  const customerId = req.params.customerId;

  await Customer.findByPk(customerId, {
    include: [
      {
        model: Order,
        include: [
          {
            model: OrderItem,
            attributes: ["name", "unit", "price"],
          },
        ],
        attributes: ["price", "discount", "total"],
      },
    ],
    attributes: ["name", "phone", "email", "address"],
  })
    .then((customer) => {
      return res.status(200).json({ status: "success", data: customer });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: "customer not found" });
    });

  // res.status(200).json({status : 'success', data : customer})
};

module.exports = {
  storeOrder,
  getCustomerOrder,
};
