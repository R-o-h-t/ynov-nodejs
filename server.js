import "dotenv/config";
import "./app/common/orm.config.js";

import app from "./app/app.js";

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(
        `server listening on port ${process.env.PORT} :  ${process.env.HOST}:${process.env.PORT}`
    );
});