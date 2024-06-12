import { UserData } from "@shared/types";
import { PoolConnection } from "mysql2/promise";
import { getConnection, queryDatabase } from "../databaseService";
import { IShoppingcartRepository } from "../interfaces/ShoppingcartRepository";

export class ShoppingcartRepository implements IShoppingcartRepository {
    /**
     * gets all info from shoppingcartitem
     * @param id
     * @returns UserData
     */

    public async checkcart(id: number): Promise<UserData | undefined> {
        const connection: PoolConnection = await getConnection();
        const checkcart: any = await queryDatabase(
            connection,
            "select * from shoppingcartitem WHERE userId = ?",
            id
        );

        connection.release();
        return checkcart;
    }
    /**
     * Gets all info from products
     * @param id
     * @returns UserData
     */
    public async getproductinfo(id: number): Promise<UserData | undefined> {
        const connection: PoolConnection = await getConnection();
        const getproductname: any = await queryDatabase(connection, "select * from product", id);
        connection.release();
        return getproductname;
    }
    /**
    * clears cart of all items
    * @param id
     @returns UserData
    */

    public async clearcart(id: number): Promise<UserData | undefined> {
        const connection: PoolConnection = await getConnection();
        const clearcart: any = await queryDatabase(
            connection,
            "delete from shoppingcartitem where userId = ?",
            id
        );
        connection.release();
        return clearcart;
    }
    /**
    * insert data into the cart.
    * @param id
    * @param itemid
     @returns UserData
    */
    public async insertintocart(id: number, itemid: number): Promise<UserData | undefined> {
        const connection: PoolConnection = await getConnection();
        const insertintocart: any = await queryDatabase(
            connection,
            "INSERT INTO shoppingcartitem (userId, amount, itemId) VALUES (?, ?, ?)",
            id,
            1,
            itemid
        );
        connection.release();
        return insertintocart;
    }
}
