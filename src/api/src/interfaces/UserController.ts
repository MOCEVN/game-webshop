import { Request, Response } from "express";

export interface IUserController {
    register(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    logout(_: Request, res: Response): void;
    requestAdminAccess(req: Request, res: Response): void;
}