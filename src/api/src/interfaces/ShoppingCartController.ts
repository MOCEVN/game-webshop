import { Request, Response } from "express";

export interface IShoppingcartController {
    checkcart(req: Request, res: Response): Promise<void>;
    getproductinfo(req: Request, res: Response): Promise<void>;
}
