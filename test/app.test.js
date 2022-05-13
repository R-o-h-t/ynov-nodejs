import request from "supertest";
import app from "../app/app.js";

describe("app", () => {
    describe("Test the root path", () => {
        test("It should response 404", async() => {
            const response = await request(app).get("/");
            expect(response.statusCode).toBe(404);
        });
    });
});