const Sequelize = require("sequelize");

const sequelize = new Sequelize("postapp", "root", "ramonramos9137", {
  host: "localhost",
  dialect: "mysql",
  query: { raw: true },
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};
