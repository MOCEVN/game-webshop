import jwt from "jsonwebtoken";
import { CustomJwtToken } from "../types/jwt";
import asyncHandler from "express-async-handler";
import { IUserRepository } from "../interfaces/IUserRepository";
import { UserRepository } from "../repositories/UserRepository";

type ExpressMiddleware = (req: any, res: any, next: any) => void;

const userRepository: IUserRepository = new UserRepository();

/**
 * Handles token-based authentication. If the token is valid, the user object is added to the request object.
 * If the token is invalid, a 401 error is returned.
 *
 * @param req - Request object
 * @param res - Response object
 *
 * @returns NextFunction | Status 401
 */
export function handleTokenBasedAuthentication(): ExpressMiddleware {
    return asyncHandler(async (req, res, next) => {
        const authenticationToken: string | undefined = req.headers["authorization"];

        // Check if there is a token
        if (!authenticationToken) {
            res.status(401).send("Unauthorized");

            return;
        }

        // Check if the token is valid
        let jwtToken: CustomJwtToken | undefined;

        try {
            jwtToken = jwt.verify(authenticationToken, process.env.JWT_SECRET_KEY) as CustomJwtToken;
        } catch {
            // Do nothing
        }

        if (!jwtToken) {
            res.status(401).send("Unauthorized");

            return;
        }

        req.token = jwtToken;

        // Retrieve user
        req.user = await userRepository.getFromId(jwtToken.userId);
        return next();

    });
}
