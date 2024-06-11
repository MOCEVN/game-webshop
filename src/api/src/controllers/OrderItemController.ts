import { Request, Response } from "express";
import { AuthorizationLevel, Order, OrderItem } from "@shared/types";
import { CustomJwtToken } from "../types/jwt";
import { IOrderItemController } from "../interfaces/IOrderItemController";
import { IOrderItemRepository } from "../interfaces/IOrderItemRepository";

/**
 * OrderItemController
 * Handles all endpoints related to the Order Item resource
 * requires aa orderItemRepository object in the constructor
 */
export class OrderItemController implements IOrderItemController {
    private _orderItemRepository: IOrderItemRepository;

    public constructor(orderItemRepository: IOrderItemRepository) {
        this._orderItemRepository = orderItemRepository;
    }
    /**
     * getAll
     * Gets all order items
     * @param _ Request object (unused)
     * @param res Response object
     */
    public async getAll(_: Request, res: Response): Promise<void> {
        const result: OrderItem[] = await this._orderItemRepository.getAll();
        res.json(result);
    }
    
    /*
    getAllWithParameters
    initialises orderItemRepository with the data from the request and then sends the order items back as a json
    req: Request = the request that was sent to the api
    res: Response = the response the api will give
    */
    public async getAllWithParameters(req: Request,res: Response): Promise<void> {
        const result: OrderItem[] = await this._orderItemRepository.getAllWithParameters({
            orderBy: req.query.orderBy as string ?? "",
            sortOrder: req.query.sortOrder as string ?? "ASC",
            search: req.query.search as string ?? "",
            searchType: req.query.searchType as string ?? "name",
        });
        res.json(result);
    }
    public async getProduct(req: Request,res: Response): Promise<void> {
        const result: OrderItem | undefined = await this._orderItemRepository.getProduct(req.params["id"]);
        res.json(result);
    }
    /**
     * Adds an array of products
     * @param req Request object
     * @param res Response object
     */
    public async add(req: Request, res: Response): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const userToken: CustomJwtToken = req.token!;
        
        if (userToken.authorization !== AuthorizationLevel.ADMIN){
            res.status(401).end();
            return;
        }
        const products: any = req.body;
        let succeeded: number = 0;
        let failed: number = 0;
        for (const product of products) {
            if (await this._orderItemRepository.addItem({
                title: product.title ?? product.name ?? "",
                description: product.descriptionMarkdown ?? product.description ?? "",
                price: product.price ?? "0",
                catagory: product.catagory ?? (product.tags ? product.tags[0] : ""),
                imageURLs: product.images ?? product.imageURLs ?? [],
                thumbnail: product.thumbnail ?? ""
            })) {
                succeeded++;
            } else {
                failed++;
            }
        }
        res.json({succeeded: succeeded, failed: failed, error: false});
    }

    public async topPicks(_:Request, res:Response): Promise<void>{
        const results: any = await this._orderItemRepository.topPicks();
        res.json(results);
        
    }

    public async getOrderInfo(req: Request, res: Response): Promise<void> {
        const result: Order | undefined = await this._orderItemRepository.getOrders(req.user!.id.toString());
        res.json(result);
    }

    public async editProduct(req: Request,res: Response): Promise<void>{
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const userToken: CustomJwtToken = req.token!;
        
        if (userToken.authorization !== AuthorizationLevel.ADMIN){
            res.status(401).end();
            return;
        }
        const result: boolean = await this._orderItemRepository.editProduct(req.body);
        res.json(result);
    }
}
