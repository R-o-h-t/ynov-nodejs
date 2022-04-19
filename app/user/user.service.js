import hash from "../../common/token.util.js";
import { AppError } from "../error/app.errors.js";
import { UserModel } from "./user.model.js";
const Model = UserModel;

const findByCredentials = async(username, password) => {
    console.log(`USER.SERVICE : finding user with credentials ${username}`);
    return findByUsername(username).then(async(u) => {
        const hashedPassword = await hash.password(username, password);
        if (!u) throw new AppError(404, "User not found");
        if (u.password != hashedPassword) {
            console.log(
                `USER.SERVICE : password is incorrect : expected ${u.password} got ${hashedPassword}`
            );
            throw new AppError(401, "Incorrect password");
        }

        return u;
    });
};

const findByUsername = async(username) => {
    console.log(`USER.SERVICE : finding user with username ${username}`);
    return Model.findOne({ where: { username } });
};

const create = async(username, email, password, roles, date) => {
    console.log(
        `USER.SERVICE : creating user with params ${username}, ${email},`
    );
    const u = await findByUsername(username);
    if (u) throw new AppError(409, "Username already exists");

    let item = new Model({ username, email, password, roles, date });
    return item.save();
};

export default { create, findByCredentials };