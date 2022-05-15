import request from "supertest";
import app from "../../app/app.js";

describe("/matches", () => {
    afterAll(async() => {
        await request(app).delete("/wipe");
    });
    let tokenAdmin = "";
    let tokenUser = "";
    let id = 0;
    beforeAll(async() => {
        tokenAdmin = (
            await request(app)
            .post("/auth/register")
            .set("Content-type", "application/json")
            .send({
                username: "admin",
                email: "admin@email.com",
                password: "password",
                role: "admin",
            })
        ).body.token;
        tokenUser = (
            await request(app)
            .post("/auth/register")
            .set("Content-type", "application/json")
            .send({
                username: "user",
                email: "user@email.com",
                password: "password",
                role: "user",
            })
        ).body.token;
        id = (
            await request(app)
            .post("/matches")
            .set("Authorization", `Bearer ${tokenAdmin}`)
            .send({
                team1: "A",
                team2: "B",
                score: "1-0",
            })
        ).body.id;
    });
    describe("POST", () => {
        describe("missing token", () => {
            test("It should response 401", async() => {
                const response = await request(app).post("/matches");
                expect(response.statusCode).toBe(401);
            });
        });
        describe("missing parameter", () => {
            test("It should response 400", async() => {
                const response = await request(app)
                    .post("/matches")
                    .set("Authorization", `Bearer ${tokenAdmin}`);
                expect(response.statusCode).toBe(400);
            });
        });
        describe("everything great", () => {
            test("It should response 200", async() => {
                const response = await request(app)
                    .post("/matches")
                    .set("Authorization", `Bearer ${tokenAdmin}`)
                    .send({
                        team1: "A",
                        team2: "B",
                        score: "1-1",
                    });
                expect(response.statusCode).toBe(200);
            });
        });
    });
    describe("GET", () => {
        describe("GET /matches/{id}", () => {
            describe("GET /matches/{unknown}", () => {
                test("It should response 200", async() => {
                    const response = await request(app).get("/matches/1");
                    expect(response.statusCode).toBe(404);
                });
            });
            describe("GET /matches/{known}", () => {
                test("It should response 200", async() => {
                    const response = await request(app).get(`/matches/${id}`);
                    expect(response.statusCode).toBe(200);
                });
            });
        });
        describe("GET /matches", () => {
            describe("GET /matches", () => {
                test("It should response 200", async() => {
                    const response = await request(app).get("/matches");
                    expect(response.statusCode).toBe(200);
                    expect(response.body.length).toBeGreaterThan(0);
                });
            });
            describe("GET /matches incorrect filter", () => {
                test("It should response 400", async() => {
                    const response = await request(app).get("/matches").send({
                        team1: 1,
                    });
                    expect(response.statusCode).toBe(400);
                });
            });
            describe("GET /matches filtered empty", () => {
                test("It should response 200 and be empty", async() => {
                    const response = await request(app).get("/matches").send({
                        team1: "Z",
                    });
                    expect(response.statusCode).toBe(200);
                    expect(response.body.length).toBe(0);
                });
            });
        });
    });
    describe("PUT", () => {
        describe("existing item no token", () => {
            test("It should response 401", async() => {
                const response = await request(app).put(`/matches/${id}`).send({
                    team1: "A",
                    team2: "B",
                    score: "1-1",
                });
                expect(response.statusCode).toBe(401);
            });
        });
        describe("unknown item", () => {
            test("It should response 404", async() => {
                const response = await request(app)
                    .put("/matches/1")
                    .set("Authorization", `Bearer ${tokenAdmin}`)
                    .send({
                        team1: "A",
                        team2: "B",
                        score: "1-1",
                    });
                expect(response.statusCode).toBe(404);
            });
        });
        describe("existing item missing param", () => {
            test("It should response 400", async() => {
                const response = await request(app)
                    .put(`/matches/${id}`)
                    .set("Authorization", `Bearer ${tokenAdmin}`)
                    .send({
                        team1: "A",
                        team2: "B",
                    });
                expect(response.statusCode).toBe(400);
            });
        });
        describe("existing item all params", () => {
            test("It should response 200", async() => {
                const response = await request(app)
                    .put(`/matches/${id}`)
                    .set("Authorization", `Bearer ${tokenAdmin}`)
                    .send({
                        team1: "A",
                        team2: "B",
                        score: "1-1",
                    });
                expect(response.statusCode).toBe(200);
            });
        });
    });
    describe("PATCH", () => {
        describe("existing item no token", () => {
            test("It should response 401", async() => {
                const response = await request(app).patch(`/matches/${id}`).send({
                    team1: "A",
                    team2: "B",
                    score: "1-1",
                });
                expect(response.statusCode).toBe(401);
            });
        });
        describe("unknown item", () => {
            test("It should response 404", async() => {
                const response = await request(app)
                    .patch("/matches/1")
                    .set("Authorization", `Bearer ${tokenAdmin}`)
                    .send({
                        team1: "A",
                        team2: "B",
                        score: "1-1",
                    });
                expect(response.statusCode).toBe(404);
            });
        });
        describe("existing item missing param", () => {
            test("It should response 200", async() => {
                const response = await request(app)
                    .patch(`/matches/${id}`)
                    .set("Authorization", `Bearer ${tokenAdmin}`)
                    .send({
                        team1: "A",
                        team2: "B",
                    });
                expect(response.statusCode).toBe(200);
            });
        });
        describe("existing item all params", () => {
            test("It should response 200", async() => {
                const response = await request(app)
                    .patch(`/matches/${id}`)
                    .set("Authorization", `Bearer ${tokenAdmin}`)
                    .send({
                        team1: "A",
                        team2: "B",
                        score: "1-1",
                    });
                expect(response.statusCode).toBe(200);
            });
        });
    });
    describe("DELETE", () => {
        describe("existing item no token", () => {
            test("It should response 401", async() => {
                const response = await request(app).delete(`/matches/${id}`);
                expect(response.statusCode).toBe(401);
            });
        });
        describe("unknown item", () => {
            test("It should response 404", async() => {
                const response = await request(app)
                    .delete("/matches/1")
                    .set("Authorization", `Bearer ${tokenAdmin}`);
                expect(response.statusCode).toBe(404);
            });
        });
        describe("existing item user role", () => {
            test("It should response 403", async() => {
                const response = await request(app)
                    .delete(`/matches/${id}`)
                    .set("Authorization", `Bearer ${tokenUser}`);

                expect(response.statusCode).toBe(403);
            });
        });
        describe("existing item admin role", () => {
            test("It should response 200", async() => {
                const response = await request(app)
                    .delete(`/matches/${id}`)
                    .set("Authorization", `Bearer ${tokenAdmin}`);

                expect(response.statusCode).toBe(204);
            });
        });
    });
});