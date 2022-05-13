import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    logging: false,
});
sequelize.authenticate().then(
    () => {
        console.log(" Database Connection OK");
        sequelize.sync({ alter: true }).then(
            () => console.log("Database Sync OK"),
            (err) => console.log("Database Sync KO", err)
        );
    },
    (err) => console.log("Database Connection  KO", err)
);

export default sequelize;