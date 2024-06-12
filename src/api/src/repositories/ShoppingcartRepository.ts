import { UserData } from "@shared/types";
import { PoolConnection } from "mysql2/promise";
import { getConnection, queryDatabase } from "../databaseService";
import { IShoppingcartRepository } from "../interfaces/ShoppingcartRepository";

export class ShoppingcartRepository implements IShoppingcartRepository {
    /**
     * Gets user data from an id.
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
        // hier nog een async neezetten richting het ophalen van productnames.
        connection.release();
        return checkcart;
    }
    /**
     * Gets user data from an id.
     * @param id
     * @returns UserData
     */
    public async getproductinfo(id: number): Promise<UserData | undefined> {
        const connection: PoolConnection = await getConnection();
        const getproductname: any = await queryDatabase(connection, "select * from product", id);
        connection.release();
        return getproductname;
    }
}
