import { AppError } from "../error/app.errors.js";
import hash from "../../common/token.util.js";

export const checkToken = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split("Bearer ")[1];
        if (token) {
            hash.verifyToken(token).then((payload) => {
                if (payload) {
                    res.locals.user = payload;
                    res.locals.authenticated = true;
                    next();
                } else {
                    console.log("AUTH.MIDDLEWARE : token is invalid");
                    next(new AppError("Invalid token", 401));
                }
            });
        } else {
            console.log("AUTH.MIDDLEWARE : token is missing");
            next(new AppError("Missing token", 401));
        }
    }
};

export const checkRoles = (roles) => (_req, res, next) => {
    console.log(
        `checking roles : expecting ${roles} got ${res.locals.user.role}`
    );
    if (res.locals.authenticated) {
        if (roles.includes(res.locals.user.role)) {
            next();
        } else {
            next(new AppError("Unauthorized", 403));
        }
    } else {
        next(new AppError("Unauthorized", 403));
    }
};

export const checkLoginParams = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    const errors = [];

    if (!username) errors.push("username is undefined");
    if (!password) errors.push("password is undefined");
    if (username && typeof username != "string")
        errors.push("username is not a string");
    if (password && typeof password != "string")
        errors.push("password is not a string");

    if (errors.length > 0) {
        next(new AppError(404, errors.join(", ")));
    } else {
        res.locals.username = username;
        res.locals.password = password;
        next();
    }
};

export const checkRegisterParams = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const errors = [];

    if (!username) errors.push("username is undefined");
    if (!email) errors.push("email is undefined");
    if (!password) errors.push("password is undefined");
    if (username && typeof username != "string")
        errors.push("username is not a string");
    if (email && typeof email != "string") errors.push("email is not a string");
    if (password && typeof password != "string")
        errors.push("password is not a string");
    if (!role) errors.push("role is undefined");
    if (role && role !== "admin" && role !== "user")
        errors.push("role must be admin or user");

    if (errors.length > 0) {
        next(new AppError(404, errors.join(", ")));
    } else {
        res.locals.username = username;
        res.locals.email = email;
        res.locals.password = password;
        res.locals.date = new Date();
        res.locals.role = role;
        next();
    }
};

export default {
    checkLoginParams,
    checkRegisterParams,
    checkToken,
    checkRoles,
};