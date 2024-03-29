require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.MYSQL_CONFIG_USER,
    "password": process.env.MYSQL_CONFIG_PASSWORD,
    "database": process.env.MYSQL_CONFIG_DATABASE,
    "host": process.env.MYSQL_CONFIG_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.MYSQL_CONFIG_USER,
    "password": process.env.MYSQL_CONFIG_PASSWORD,
    "database": process.env.MYSQL_CONFIG_DATABASE,
    "host": process.env.MYSQL_CONFIG_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.MYSQL_CONFIG_USER,
    "password": process.env.MYSQL_CONFIG_PASSWORD,
    "database": process.env.MYSQL_CONFIG_DATABASE,
    "host": process.env.MYSQL_CONFIG_HOST,
    "dialect": "mysql"
  }
}