import { UserData } from "@shared/types";
import { IShoppingcartController } from "../interfaces/ShoppingCartController";
import { IShoppingcartRepository } from "../interfaces/ShoppingcartRepository";
import { Request, Response } from "express";
import { CustomJwtToken } from "../types/jwt";

export class ShoppingcartController implements IShoppingcartController {
    private _ShoppingcartRepository: IShoppingcartRepository;
    public constructor(ShoppingcartRepository: IShoppingcartRepository) {
        this._ShoppingcartRepository = ShoppingcartRepository;
    }
    /**
     * Check de shoppingcart voor items
     *
     * Always a returns a 200 with the total number of order items in the cart as the body.
     *
     * @param req Request object
     * @param res Response object
     */

    public async checkcart(req: Request, res: Response): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const token: CustomJwtToken = req.token!;
        const userId: number = token.userId;
        const checkcart: UserData | undefined = await this._ShoppingcartRepository.checkcart(userId);
        if (!checkcart) {
            res.status(200).json({ message: "Shoppingcart is empty" });
        } else {
            res.json(checkcart);
        }
    }
    public async getproductname(req: Request, res: Response): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const id: number = parseInt(req.params.id);
        const getproductname: UserData | undefined = await this._ShoppingcartRepository.getproductname(id);
        console.log("task1", getproductname);
        console.log("gameid", req.params.id);
        if (!getproductname) {
            res.status(200).json({ message: "Shoppingcart is empty" });
        } else {
            res.json(getproductname);
        }
    }
}
