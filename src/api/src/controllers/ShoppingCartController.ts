import { UserData } from "@shared/types";
import { IShoppingcartController } from "../interfaces/ShoppingCartController";
import { IShoppingcartRepository } from "../interfaces/ShoppingcartRepository";
import { Request, Response } from "express";
import { Jwt } from "jsonwebtoken";
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
        let jwtToken: CustomJwtToken | undefined;
        console.log(jwtToken.userId);
        const checkcart: UserData | undefined = await this._ShoppingcartRepository.checkcart(jwtToken.userId);
        if (!checkcart) {
            res.status(200).json({ message: "Shoppingcart is empty" });
        } else {
            res.json(checkcart);
        }
    }
}
