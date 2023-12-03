// const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST || "127.0.0.1",
    port: process.env.POSTGRES_PORT,
    dialect: "postgresql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },

  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: "postgresql",
    // dialectOptions: {
    //   bigNumberStrings: true,
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
    //   }
    // }
  },
};
