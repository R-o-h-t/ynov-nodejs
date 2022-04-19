import express from "express";
import controller from "./auth.controller.js";
import { checkRegisterParams, checkLoginParams } from "./auth.middleware.js";
const authRouter = express.Router();

authRouter.use(express.json());

authRouter.post("/register", checkRegisterParams, controller.register);
authRouter.post("/login", checkLoginParams, controller.login);

export default authRouter;