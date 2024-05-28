import express, { Express } from "express";
import request from "supertest";
import app from "../../../api/src/index";
import { expect, it, describe } from "vitest";
import { IUserController } from "../../../api/src/interfaces/UserController";
import { UserController } from "../../../api/src/controllers/UserController";
import { IUserRepository } from "../../../api/src/interfaces/UserRepository";
import { UserData } from "@shared/types";
import asyncHandler from "express-async-handler";


class mockUserRepository implements IUserRepository {
    public async getFromEmail(email: string): Promise<UserData | undefined> {
        await new Promise<void>((resolve) => {resolve();});
        
        if (email === "test@test.nl"){
            return <UserData><unknown>{password: "$2a$10$bj9bHsCNpW0OIZZC.8iG7ODGI4fW/QxOShEZXDoJaAoYf2K.IxrtS", id: "1", authorizationLevel: "user"};
        }
        return <UserData><unknown>{password: "", id: "1", authorizationLevel: "user"};
    }
    public getFromId(_id: number): Promise<UserData | undefined> {
        throw new Error("Method not implemented.");
    }
    public add(_email: string, _password: string, _name: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    
}
const mockUserController: IUserController = new UserController(new mockUserRepository());

const mockApp: Express = express();
mockApp.use(express.json());
mockApp.post("/users/login",asyncHandler(mockUserController.login.bind(mockUserController)));

describe("API endpoints", () => {
    it("return a 200 status", async () => {
        // Arrange
        const res: any = await request(app).get("/");

        // Act / Assert
        expect(res.status).toEqual(200);
    });

    it("return a 400 for an invalid login", async () => {
        // Arrange
        process.env.JWT_SECRET_KEY = "test";
        
        const res: any = await request(mockApp)
            .post("/users/login")
            .send({ email: "xyz@sadfjak.com", password: "2342388" })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        // Act / Assert
        expect(res.status).toEqual(400);
    });

    it("return a 200 for a valid login", async () => {
        // Arrange
        const res: any = await request(mockApp)
            .post("/users/login")
            .send({ email: "test@test.nl", password: "test" })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        // Act / Assert
        expect(res.status).toEqual(200);
    });
});
