import { AppError } from "../error/app.errors.js";
import service from "./match.service.js";

const getOne = (_req, res, next) => {
    let id = res.locals.id;

    service.getOne(id).then(
        (item) => res.send(item),
        (e) => {
            if (e instanceof AppError) next(e);
            else next(new AppError(404, "Not Found"));
        }
    );
};

const getAll = (_req, res, next) => {
    console.log("MATCH.CONTROLLER : requesting all matches");
    const page = res.locals.page;
    const size = res.locals.size;

    const order = [
        ["date", res.locals.order]
    ];
    const team1 = res.locals.team1;
    const team2 = res.locals.team2;
    const where = {};
    if (team1) where.team1 = team1;
    if (team2) where.team2 = team2;

    service.getAll(where, order, size, page * size).then(
        (items) => {
            res.header("total-count", items.total).send(items.data);
        },
        (e) => {
            if (e instanceof AppError) next(e);
            else next(new AppError(500, "Internal Server Error"));
        }
    );
};

const create = (_req, res, next) => {
    let team1 = res.locals.team1;
    let team2 = res.locals.team2;
    let score = res.locals.score;
    let date = res.locals.date;

    service.create(team1, team2, score, date).then(
        (item) => res.send(item),
        (e) => {
            if (e instanceof AppError) next(e);
            else next(new AppError(500, "Internal Server Error"));
        }
    );
};

const update = (_req, res, next) => {
    let id = res.locals.id;

    let team1 = res.locals.team1;
    let team2 = res.locals.team2;
    let score = res.locals.score;
    let date = res.locals.date;

    service.update(id, team1, team2, score, date).then(
        (item) => res.send(item),
        (e) => {
            if (e instanceof AppError) next(e);
            else next(new AppError(500, "Internal Server Error"));
        }
    );
};

const destroy = (_req, res, next) => {
    let id = res.locals.id;

    service.destroy(id).then(
        () => res.status(204).send(),
        (e) => {
            if (e instanceof AppError) next(e);
            else next(new AppError(500, "Internal Server Error"));
        }
    );
};

export default { getOne, getAll, create, update, destroy };