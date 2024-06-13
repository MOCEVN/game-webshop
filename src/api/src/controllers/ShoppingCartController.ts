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
    public async getproductinfo(req: Request, res: Response): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const id: any = req.params.id;
        const getproductinfo: UserData | undefined = await this._ShoppingcartRepository.getproductinfo(id);
        if (!getproductinfo) {
            res.status(200).json({ message: "something went wrong whilst getting product data" });
        } else {
            res.json(getproductinfo);
        }
    }
    public async clearcart(req: Request, res: Response): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const token: CustomJwtToken = req.token!;
        const userId: number = token.userId;
        const clearcart: UserData | undefined = await this._ShoppingcartRepository.clearcart(userId);
        if (!clearcart) {
            res.status(200).json({ message: "something went wrong whilst clearing" });
        } else {
            res.json(clearcart);
        }
    }
    public async insertintocart(req: Request, res: Response): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const token: CustomJwtToken = req.token!;
        const itemId: any = req.params["itemid"];
        const userId: number = token.userId;
        const insertintocart: UserData | undefined = await this._ShoppingcartRepository.insertintocart(
            userId,
            itemId
        );
        if (!insertintocart) {
            res.status(200).json({ message: "could not insert item into shoppingcart" });
        } else {
            res.json(insertintocart);
        }
    }
    public async deleteitem(req: Request, res: Response): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const token: CustomJwtToken = req.token!;
        const itemId: any = req.params["itemid"];
        const userId: number = token.userId;
        const deleteitem: UserData | undefined = await this._ShoppingcartRepository.deleteitem(
            userId,
            itemId
        );
        if (!deleteitem) {
            res.status(200).json({ message: "could not delete item into shoppingcart" });
        } else {
            res.json(deleteitem);
        }
    }
}
