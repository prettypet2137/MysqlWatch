import dotenv from "dotenv";

export default function config() {
    dotenv.config();

    process.env.RDS_HOSTNAME = process.env.RDS_HOSTNAME || "alumicankun.cluster-cn0murwkj4bw.ap-northeast-1.rds.amazonaws.com";
    process.env.RDS_PORT = process.env.RDS_PORT || "3306";
    process.env.RDS_DB_NAME = process.env.RDS_DB_NAME || "alumicankun";
    process.env.RDS_USERNAME = process.env.RDS_USERNAME || "admin";
    process.env.RDS_PASSWORD = process.env.RDS_PASSWORD || "alumicankunmanager";
    process.env.RDS_TIMEOUT = process.env.RDS_TIMEOUT || "60";
}