import "dotenv/config";
import express from "express";
import authRouter from "./auth/auth.router.js";
import "./common/orm.config.js";
import { catchError } from "./error/app.errors.js";
import { MatchModel } from "./match/match.model.js";
import matchRouter from "./match/match.router.js";
import { UserModel } from "./user/user.model.js";

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

export default app;