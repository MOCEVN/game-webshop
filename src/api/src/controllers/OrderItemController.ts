import { Request, Response } from "express";
import { AuthorizationLevel, OrderItem, UserData } from "@shared/types";
import { ProductAddModel } from "@shared/formModels/ProductAddModel";
import { getConnection, queryDatabase } from "../databaseService";
import { PoolConnection, ResultSetHeader } from "mysql2/promise";

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
            const query: string = "INSERT INTO orderitem(name, description, price, categoryId) VALUES (?,?,?,?)";
            const values: string[] = [formData.name,formData.description,formData.price,catagoryId];
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
        } catch {
            return false;
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
        console.log(result);
        
        res.json(result);
    }
    /**
     * Adds an item
     * @param req Request object
     * @param res Response object
     */
    public async adminAdd(req: Request, res: Response): Promise<void> {
        const userData: UserData = req.user!;
        if (userData.authorizationLevel !== AuthorizationLevel.ADMIN){
            res.status(401).end();
            return;
        }
        if (await itemDatabase.addItem(req.body)) {
            res.json("true");
            return;
        };
        res.json("false");
    }
}
