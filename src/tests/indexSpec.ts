import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("server tests:", () => {
  it("server exists", async () => {
    const res = await request.get("/");
    
    expect(res.status).toBe(200);
  });
});