import { UserData } from "@shared/types/UserData";
import { CustomJwtToken } from "./types/jwt";

declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            JWT_SECRET_KEY: string;
        }
    }

    namespace Express {
        export interface Request {
            user?: UserData;
            token?: CustomJwtToken;
        }
    }
}
