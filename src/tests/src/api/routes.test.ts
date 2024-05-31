import request, { Response } from "supertest";
import app from "../../../api/src/index";
import { expect, it, describe } from "vitest";
import { config } from "dotenv";
import path from "path";
import { UserLoginFormModel } from "@shared/formModels";


config({ path: path.resolve(__dirname,"../../../api/.env")});
config({ path: path.resolve(__dirname,"../../../api/.env.local"), override: true });
process.env.DB_DATABASE = "pb4b2324_toosuutooxii35_test";

describe.concurrent("API endpoints", () => {
    it("route \"/\", get request, success status 200", async () => {
        // Arrange

        // Act
        const res: any = await request(app).get("/");

        // Assert
        expect(res.status).toEqual(200);
    });

    it("route \"/users/login\", email not found, error status 400", async () => {
        // Arrange
        const loginForm: UserLoginFormModel = { email: "xyz@sadfjak.com", password: "2342388" };
        
        // Act
        const res: any = await request(app)
            .post("/users/login")
            .send(loginForm)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        // Assert
        expect(res.status).toEqual(400);
    });

    it("route \"/users/login\", wrong password, error status 400", async () => {
        // Arrange
        const loginForm: UserLoginFormModel = { email: "test@test.nl", password: "wrong-password" };

        // Act
        const res: any = await request(app)
            .post("/users/login")
            .send(loginForm)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        // Assert
        expect(res.status).toEqual(400);
    });

    it("route \"/users/login\", valid login, success status 200", async () => {
        // Arrange
        const loginForm: UserLoginFormModel = { email: "test@test.nl", password: "test" };

        // Act
        const res: any = await request(app)
            .post("/users/login")
            .send(loginForm)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        // Assert
        expect(res.status).toEqual(200);
    });

    it("route \"/store-content/all\", get request, success status 200", async () => {
        // Arrange

        // Act
        const res: any = await request(app)
            .get("/store-content/all")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");
        
        // Assert
        expect(res.status).toEqual(200);
    });

    it("route \"/store-content/all/:id\", get request, return correct product and status 200", async ({expect}) => {
        // Arrange

        // Act
        const res: Response = await request(app)
            .get("/store-content/all/45")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");
        
        // Assert
        expect(res.body).toMatchSnapshot();
        expect(res.status).toEqual(200);
    });
});
