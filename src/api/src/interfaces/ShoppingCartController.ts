import { Request, Response } from "express";

export interface IShoppingcartController {
    checkcart(req: Request, res: Response): Promise<void>;
}