"use strict";

const { randomUUID } = require("crypto");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    var dataCustomer = [];

    for (let index = 0; index < 100; index++) {
      dataCustomer[index] = {
        id: uuidv4(),
        name: "customer" + index,
        phone: "987654321" + index,
        email: "customer@orenda" + index + ".com",
        address: "Bali Badung" + index,
      };
    }

    var data = [
      {
        id: uuidv4(),
        name: "Admin",
        phone: "123456789",
        email: "admin@orenda.com",
        address: "Pekan Baru Riau",
      },
      {
        id: uuidv4(),
        name: "customer",
        phone: "987654321",
        email: "customer@orenda.com",
        address: "Bali Badung",
      },
    ];

    const mergeData = [...data, ...dataCustomer];

    return queryInterface.bulkInsert("customers", mergeData);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete("customers", null, {});
  },
};
