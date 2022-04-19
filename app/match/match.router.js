import express from "express";
import controller from "./match.controller.js";
import { checkGetParams, checkId, checkParams } from "./match.middleware.js";
import { checkRoles, checkToken } from "../auth/auth.middleware.js";
const matchRouter = express.Router();

matchRouter.use(express.json());

matchRouter.get("/", checkGetParams, controller.getAll);
matchRouter.get("/:id", checkId, controller.getOne);

matchRouter.post(
    "/",
    checkToken,
    checkRoles(["admin", "user"]), //
    checkParams(),
    controller.create
);
matchRouter.put(
    "/:id",
    checkToken,
    checkRoles(["admin", "user"]), //
    checkId,
    checkParams(),
    controller.update
);
matchRouter.patch(
    "/:id",
    checkToken,
    checkRoles(["admin", "user"]), //
    checkId,
    checkParams(true),
    controller.update
);
matchRouter.delete(
    "/:id",
    checkToken,
    checkRoles(["admin"]), //admin only
    checkId,
    controller.destroy
);

export default matchRouter;