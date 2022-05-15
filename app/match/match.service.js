import { AppError } from "../error/app.errors.js";
import { MatchModel } from "./match.model.js";
const Model = MatchModel;

const getOne = async(id) => {
    console.log(`MATCH.SERVICE : requesting matches with id ${id}`);

    return Model.findByPk(id).then((i) => {
        if (i !== null) return i;
        throw new AppError(404, "Not Found");
    });
};

const getAll = async(where, order, limit, offset) => {
    console.log("MATCH.SERVICE : requesting all matches");

    const data = await Model.findAndCountAll({
        where,
        order,
        limit,
        offset,
    }).catch((err) => {
        throw new AppError("500", err.message);
    });

    console.log("data", data);

    return {
        data: data.rows,
        total: data.count,
    };
};

const create = async(team1, team2, score, date) => {
    console.log(
        `MATCH.SERVICE : creating match with params ${team1}, ${team2}, ${score}, ${date}`
    );

    let item = new Model({ team1, team2, score, date });
    return item.save();
};

const update = async(id, team1, team2, score, date) => {
    console.log(
        `MATCH.SERVICE : updating match id:${id} with params ${team1}, ${team2}, ${score}, ${date}`
    );
    let item = await getOne(id).catch((e) => {
        throw e;
    });
    if (team1) item.team1 = team1;
    if (team2) item.team2 = team2;
    if (score) item.score = score;
    if (date) item.date = date;
    return item.save();
};

const destroy = (id) => {
    console.log(`MATCH.SERVICE : deleting match with id:${id} `);
    return getOne(id).then(
        (i) => {
            return i.destroy();
        },
        (e) => {
            throw e;
        }
    );
};

export default { getOne, getAll, create, update, destroy };