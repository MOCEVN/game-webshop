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
    it("return a 200 status", async () => {
        // Arrange

        // Act
        const res: any = await request(app).get("/");

        // Assert
        expect(res.status).toEqual(200);
    });

    it("return a 400 for an invalid login where the email is not found", async () => {
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

    it("return a 400 for an invalid login where the password is wrong", async () => {
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

    it("return a 200 for a valid login", async () => {
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

    it("return a 200 for getting all products", async () => {
        // Arrange

        // Act
        const res: any = await request(app)
            .get("/store-content/all")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");
        
        // Assert
        expect(res.status).toEqual(200);
    });

    it("return the correct product for getting a product", async () => {
        // Arrange

        // Act
        const res: Response = await request(app)
            .get("/store-content/all/45")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");
        
        // Assert
        expect(res.body).toEqual({
            "id": 45,
            "title": "Terror Trial",
            "description": "Terror Trial is een angstaanjagend huis vol met valstrikken en duistere geheimen, waar wanhopige reizigers gevangen zitten en enkel kunnen ontsnappen door raadsels op te lossen voordat de klok tikt naar hun ondergang.",
            "price": "0.00",
            "categoryId": 1,
            "thumbnail": "https://lucastars.hbo-ict.cloud/media/6918722fe0104049b27aa218c692a417/00000006000000000000000000000000.png",
            "imageURLs": [
              "https://lucastars.hbo-ict.cloud/media/999069f72f4c4c5a98b8e7d25a3ce366/00000006000000000000000000000000.png",
              "https://lucastars.hbo-ict.cloud/media/a37d086f50f14dca8c365448957a2139/00000006000000000000000000000000.png",
              "https://lucastars.hbo-ict.cloud/media/aadfdef650f94bc9a8a99afe21978aa9/00000006000000000000000000000000.png",
              "https://lucastars.hbo-ict.cloud/media/ad5e059aeb314f34b3385bb8b9e91083/00000006000000000000000000000000.png"
            ],
            "catagory": {
              "name": "no catagory",
              "description": "this product has no catagory"
            }
          });
          expect(res.status).toEqual(200);
    });
});
