import { AppError } from "../error/app.errors.js";

const checkId = (req, res, next) => {
    const id = +req.params.id;
    if (!id || isNaN(id)) {
        next({
            message: `Incorrect param: id : ${req.params.id} ${NaN}`,
            status: 400,
        });
    } else {
        res.locals.id = id;
        next();
    }
};

const checkParams =
    (d = true) =>
    (req, res, next) => {
        const team1 = req.body.team1;
        const team2 = req.body.team2;
        const score = req.body.score;
        const date = req.body.date;

        const errors = [];

        if (d && !team1) errors.push("team1 is undefined");
        if (d && !team2) errors.push("team2 is undefined");
        if (d && !score) errors.push("score is undefined");
        if (team1 && typeof team1 != "string") errors.push("team1 is not a string");
        if (team2 && typeof team1 != "string") errors.push("team1 is not a string");
        if (score.match("^d+-d+$")) errors.push("score must be like int-int");
        if (date && isNaN(new Date(date).valueOf()))
            errors.push("date is not a date");

        if (errors.length > 0) {
            next(new AppError(404, errors.join(", ")));
        } else {
            res.locals.team1 = team1;
            res.locals.team2 = team2;
            res.locals.score = score;
            res.locals.date = date ? new Date(date) : new Date();

            next();
        }
    };

const checkGetParams = (req, res, next) => {
    const team1 = req.body.team1;
    const team2 = req.body.team2;
    const page = req.body.page;
    const size = req.body.size;
    const order = req.body.order;

    const errors = [];

    if (team1 && typeof team1 != "string") errors.push("team1 is not a string");
    if (team2 && typeof team1 != "string") errors.push("team1 is not a string");
    if (page && page != parseInt(page)) errors.push("page is not an integer");
    if (size && size != parseInt(size)) errors.push("size is not an integer");
    if (order && order !== "asc" && order !== "des")
        errors.push("order must be asc or des");
    console.log("errors", errors);
    if (errors.length > 0) {
        next(new AppError(400, errors.join(", ")));
    } else {
        res.locals.team1 = team1;
        res.locals.team2 = team2;
        res.locals.page = page ? parseInt(page) : 0;
        res.locals.size = size ? parseInt(size) : 5;
        res.locals.order = order === "des" ? "DESC" : "ASC";
        next();
    }
};

export { checkParams, checkId, checkGetParams };
export default { checkParams, checkId, checkGetParams };