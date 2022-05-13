import { Model, DataTypes } from "sequelize";
import sequelize from "../common/orm.config.js";
import moment from "moment";
export class MatchModel extends Model {}
MatchModel.init({
    team1: {
        type: DataTypes.STRING,
    },
    team2: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        comment: "Date of the match",
    },
    dateAgo: {
        type: DataTypes.VIRTUAL(DataTypes.STRING),
        get() {
            const date = this.date;
            if (!date) return "No date";
            return moment(date).fromNow();
        },
        set() {
            throw new Error("Cannot set dateAgo");
        },
        comment: "Date of the match",
    },
    score: {
        type: DataTypes.STRING,
        comment: "Score of the match",
    },
}, {
    sequelize,
    modelName: "match",
    comment: "Match table",
});