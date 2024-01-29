require("dotenv").config();

module.exports = {
  development: {
    username: process.env.USERNAME || "postgres",
    password: process.env.PASSWORD || "komang26",
    database: process.env.DATABASE || "surya",
    host: process.env.HOST || "localhost",
    dialect: process.env.DIALECT || "postgres",
  }
};
