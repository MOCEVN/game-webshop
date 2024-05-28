import { Request, Response } from "express";

export interface IOrderItemController {
    getAllWithParameters(req: Request,res: Response): Promise<void>;
    getProduct(req: Request,res: Response): Promise<void>;
    add(req: Request, res: Response): Promise<void>;
}