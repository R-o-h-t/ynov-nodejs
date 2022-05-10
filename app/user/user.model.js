import { Model, DataTypes } from "sequelize";
import sequelize from "../common/orm.config.js ";
import hash from "../common/token.util.js";
import moment from "moment";
export class UserModel extends Model {
    async generateAuthToken() {
        const header = {
            alg: "HS256",
            typ: "JWT",
        };
        const payload = {
            id: this.id,
            username: this.username,
            email: this.email,
            date: moment(this.date).format("YYYY-MM-DD HH:mm:ss"),
            role: this.roles,
            iat: moment().unix(),
            exp: moment().add(10, "minutes").unix(),
        };

        const headerEncoded = await hash.encode(JSON.stringify(header));
        const payloadEncoded = await hash.encode(JSON.stringify(payload));
        const signature = await hash.sign(headerEncoded + "." + payloadEncoded);
        return `${headerEncoded}.${payloadEncoded}.${signature}`;
    }
}

UserModel.init({
    username: {
        type: DataTypes.STRING,
        comment: "username",
    },
    email: {
        type: DataTypes.STRING,
        comment: "email address",
    },
    password: {
        type: DataTypes.STRING,
        set(value) {
            hash
                .password(this.username, value)
                .then((hashedPassword) =>
                    this.setDataValue("password", hashedPassword)
                );
        },
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        comment: "Date of creation",
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
        comment: "Time from creation",
    },
    roles: {
        type: DataTypes.ENUM("user", "admin"),
        comment: "Role of the user (admin||user)",
    },
}, {
    sequelize,
    modelName: "user-model",
    comment: "User table",
});