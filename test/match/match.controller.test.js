import request from "supertest";
import app from "../../app/app.js";

describe("/matches", () => {
    describe("POST", () => {
        describe("missing token", () => {
            test("It should response missing token", async() => {
                const response = await request(app).post("/matches");
                expect(response.statusCode).toBe(401);
            });
        });
        describe("missing parameter", () => {
            test("It should response 404", async() => {
                const response = await request(app).post("/matches");
                expect(response.statusCode).toBe(401);
            });
        });
    });
    describe("POST", () => {
        describe("GET /matches", () => {
            test("It should response 200", async() => {
                const response = await request(app).get("/matches");
                expect(response.statusCode).toBe(200);
            });
        });
    });
});