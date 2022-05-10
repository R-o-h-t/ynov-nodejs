import userService from "../user/user.service.js";
import { AppError } from "../error/app.errors.js";

const register = (_req, res, next) => {
    console.log(
        `AUTH.CONTROLLER : register user with credentials ${res.locals.username}, ${res.locals.email}, ${res.locals.role}, ${res.locals.date}`
    );
    userService
        .create(
            res.locals.username,
            res.locals.email,
            res.locals.password,
            res.locals.role,
            res.locals.date
        )
        .then((item) =>
            item.generateAuthToken().then((token) => res.send({ token: token }))
        )
        .catch((err) => next(err));
};

const login = (_req, res, next) => {
    console.log(
        `AUTH.CONTROLLER : login user with credentials ${res.locals.username}`
    );
    userService
        .findByCredentials(res.locals.username, res.locals.password)
        .then((item) =>
            item.generateAuthToken().then((token) => res.send({ token: token }))
        )
        .catch((err) => {
            if (err instanceof AppError) next(err);
            else next(new AppError(404, "Incorrect username or password"));
        });
};

export default { register, login };