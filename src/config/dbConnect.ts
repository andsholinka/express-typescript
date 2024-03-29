import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.MYSQL_CONFIG_DATABASE as string;
const dbHost = process.env.MYSQL_CONFIG_HOST;
const dbUser = process.env.MYSQL_CONFIG_USER as string;
const dbPass = process.env.MYSQL_CONFIG_PASSWORD;
const dbDialect = "mysql";

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: dbDialect
})

export default sequelizeConnection