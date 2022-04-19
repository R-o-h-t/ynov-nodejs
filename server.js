import express from "express";
import { catchError } from "./app/error/app.errors.js";
import matchRouter from "./app/match/match.router.js";
import authRouter from "./app/auth/auth.router.js";
import { UserModel } from "./app/user/user.model.js";
import "dotenv/config";
import "./common/orm.config.js";
import { MatchModel } from "./app/match/match.model.js";

const app = express();

app.use("/matches", matchRouter);
app.use("/auth", authRouter);

app.use(catchError);

app.delete("/wipe", (_req, res) => {
    console.log("Wiping database");
    MatchModel.destroy({ truncate: true }).then(() => {
        UserModel.destroy({
            truncate: true,
        }).then(() => res.send("Database as been Wiped", 200));
    });
});

app.use("/tea", (_req, res) => {
    res.send("what???", 418);
});
app.use("*", (_req, res) => {
    res.send("this route is not supported", 404);
});

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(
        `server listening on port ${process.env.PORT} :  ${process.env.HOST}:${process.env.PORT}`
    );
});