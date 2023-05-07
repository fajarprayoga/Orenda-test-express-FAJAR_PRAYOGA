"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const Order = require("./Order");
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderItem.init(
    {
      orderId: DataTypes.UUID,
      name: DataTypes.STRING,
      unit: DataTypes.STRING,
      price: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "OrderItem",
      tableName: "orderItems",
      freezeTableName: true,
      paranoid: true,
      timestamps: true,
    }
  );
  // OrderItem.beforeCreate((item) => {item.id = uuidv4()});
  OrderItem.beforeBulkCreate((users) => {
    users.forEach((user) => {
      user.id = uuidv4();
    });
  });

  // OrderItem.belongsTo(Order);
  return OrderItem;
};
