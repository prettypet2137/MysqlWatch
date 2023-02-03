import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.RDS_HOSTNAME,
    port: +process.env.RDS_PORT,
    database: process.env.RDS_DB_NAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    connectTimeout: +(process.env.RDS_TIMEOUT) * 1000,
});

export default pool;