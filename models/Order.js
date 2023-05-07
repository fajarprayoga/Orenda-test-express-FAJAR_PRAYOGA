"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const OrderItem = require("./OrderItem");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasMany(models.OrderItem, { foreignKey: "orderId" });
    }
  }
  Order.init(
    {
      customerId: DataTypes.UUID,
      discount: DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
      total: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
      freezeTableName: true,
      paranoid: true,
      timestamps: true,
    }
  );
  Order.beforeCreate((order) => (order.id = uuidv4()));
  return Order;
};
