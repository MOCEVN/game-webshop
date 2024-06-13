import { Request, Response } from "express";

export interface IShoppingcartController {
    checkcart(req: Request, res: Response): Promise<void>;
    getproductinfo(req: Request, res: Response): Promise<void>;
    clearcart(req: Request, res: Response): Promise<void>;
    insertintocart(req: Request, res: Response): Promise<void>;
    deleteitem(req: Request, res: Response): Promise<void>;
}
