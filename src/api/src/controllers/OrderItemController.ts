import { Request, Response } from "express";
import { AuthorizationLevel, OrderItem, UserData } from "@shared/types";
import { ProductAddModel } from "@shared/formModels/ProductAddModel";
import { getConnection, queryDatabase } from "../databaseService";
import { PoolConnection, ResultSetHeader } from "mysql2/promise";
import { SortFilter } from "@shared/types/SortFIlter";
import { Catagory } from "@shared/types/Catagory";
// import { connect } from "http2";

class ItemDatabase {
    /**
     * Adds an item to the database.
     * @param formData Data entered in the form.
     */
    public async addItem(formData: ProductAddModel): Promise<boolean> {
        const connection: PoolConnection = await getConnection();
        try {
            const catagoryQueryResult: [{id: string}] = await queryDatabase(connection,"SELECT id FROM category WHERE name = ?",formData.catagory);
            const catagoryId: string = catagoryQueryResult.length > 0 ? catagoryQueryResult[0].id : "1";
            const query: string = "INSERT INTO orderitem(name, description, price, categoryId, thumbnail) VALUES (?,?,?,?,?)";
            const values: string[] = [formData.name,formData.description,formData.price,catagoryId,formData.thumbnail ?? ""];
            await connection.beginTransaction();
            const result: ResultSetHeader = await queryDatabase(connection, query, ...values);
            if (formData.imageURLs){
                for (const image of formData.imageURLs) {
                    if (image) {
                        await queryDatabase(connection,"INSERT INTO image(ItemId, url) VALUES (?,?)",result.insertId,image);
                    }
                }
            }
            await connection.commit();
            return true;
        } catch (err) {
            console.log(formData);
            console.error(err);
            return false;
        } finally {
            connection.release();
        }
    }
    public async getAllSortedFiltered(params: SortFilter): Promise<OrderItem[]> {
        const connection: PoolConnection = await getConnection();
        try {
            let query: string = "SELECT * FROM orderitem";
            // TODO: add filters
            
            if (params.orderBy) {
                query += ` ORDER BY ${params.orderBy} ${params.sortOrder ?? "ASC"}`;
            }
            const result: any = await queryDatabase(connection, query);
            return result;
        } catch (err) {
            console.error(err);
            
            return [];
        } finally {
            connection.release();
        }
    }
    public async getProduct(id: string): Promise<OrderItem | undefined> {
        const connection: PoolConnection = await getConnection();
        try {
            const productQuery: string = "SELECT `id`, `name`, `description`, `price`, `categoryId`, `thumbnail` FROM `orderitem` WHERE `id` = ?";
            const queryProductResult: OrderItem[] & {categoryId: string}[] = await queryDatabase(connection,productQuery, id);
            const imageQuery: string = "SELECT `url` FROM `image` WHERE `ItemId` = ?";
            const queryImageResult: {url: string}[] = await queryDatabase(connection,imageQuery,id);
            const catagoryQuery: string = "SELECT `name`, `description` FROM `category` WHERE `id` = ?";
            const queryCatagoryResult: Catagory[] = await queryDatabase(connection,catagoryQuery,queryProductResult[0].categoryId);
            
            const result: OrderItem = queryProductResult[0];
            result.imageURLs = queryImageResult.map((val) => val.url);
            result.catagory = queryCatagoryResult[0];
            
            return result;
        } catch (err) {
            console.error(err);
            return undefined;
        } finally {
            connection.release();
        }
    }
    public async getAll(): Promise<OrderItem[]> {
        const connection: PoolConnection = await getConnection();
        try {
            const result: any = await queryDatabase(connection, "SELECT * FROM orderitem");
            return result;
        } catch (err) {
            console.error(err);
            
            return [];
        } finally {
            connection.release();
        }
    }
    /**
     * name
     */
    public async getImages(): Promise<any> {
        const connection: PoolConnection = await getConnection();
        try {
            
        } catch (error) {
            return[];
        } finally{
            connection.release();
        }
    }

}

const itemDatabase: ItemDatabase = new ItemDatabase();

/**
 * Handles all endpoints related to the Order Item resource
 */
export class OrderItemController {
    /**
     * Get all order items
     * 
     * @param _ Request object (unused)
     * @param res Response object
     */
    public async getAll(_: Request, res: Response): Promise<void> {
        const result: OrderItem[] = await itemDatabase.getAll();
        res.json(result);
    }
    public async getAllSortedFiltered(req: Request,res: Response): Promise<void> {
        const result: OrderItem[] = await itemDatabase.getAllSortedFiltered({
            orderBy: req.query.orderBy as string ?? "",
            sortOrder: req.query.sortOrder as string ?? "ASC"
        });
        res.json(result);
    }
    public async getProduct(req: Request,res: Response): Promise<void> {
        const result: OrderItem | undefined = await itemDatabase.getProduct(req.params["id"]);
        res.json(result);
    }
    /**
     * Adds an array of products
     * @param req Request object
     * @param res Response object
     */
    public async add(req: Request, res: Response): Promise<void> {
        const userData: UserData = req.user!;
        if (userData.authorizationLevel !== AuthorizationLevel.ADMIN){
            res.status(401).end();
            return;
        }
        const products: any = req.body;
        let succeeded: number = 0;
        let failed: number = 0;
        for (const product of products) {
            if (await itemDatabase.addItem({
                name: product.title ?? product.name ?? "",
                description: product.descriptionMarkdown ?? product.description ?? "",
                price: "0",
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
}
