import { ProductAddModel } from "@shared/formModels/ProductAddModel";
import { Order, OrderItem, OrderItemSortableColumns } from "@shared/types";
import { Catagory } from "@shared/types/Catagory";
import { getQueryParameters } from "@shared/types/SortFIlter";
import { PoolConnection, ResultSetHeader } from "mysql2/promise";
import { getConnection, queryDatabase } from "../databaseService";

/*
OrderItemRepository
handles the database requests of the api 
*/
export class OrderItemRepository {
    /**
     * Adds an item to the database.
     * @param formData Data entered in the form.
     */
    public async addItem(formData: ProductAddModel): Promise<boolean> {
        const connection: PoolConnection = await getConnection();
        try {
            const catagoryQueryResult: [{id: string}] = await queryDatabase(connection,"SELECT id FROM category WHERE name = ?",formData.catagory);
            const catagoryId: string = catagoryQueryResult.length > 0 ? catagoryQueryResult[0].id : "1";
            const query: string = "INSERT INTO product(title, description, price, categoryId, thumbnail) VALUES (?,?,?,?,?)";
            const values: string[] = [formData.title,formData.description,formData.price,catagoryId,formData.thumbnail ?? ""];
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

    /*
    getAllWithParameters
    composes the query and sends it to the database
    params: getQueryParameters the sortOrder, searchType etc
    returns the rows of the database in correct order
    */
    public async getAllWithParameters(params: getQueryParameters): Promise<OrderItem[]> {
        const connection: PoolConnection = await getConnection();
        try {
            let query: string = "SELECT * FROM product";
            const values: any[] = [];

            // TODO: add filters
            
            // mysql2 parameter binding doesn't work for searchType here
            if (params.search && params.searchType && OrderItemSortableColumns.has(params.searchType)) {
                query += ` WHERE ${params.searchType} LIKE ?`;
                values.push(params.search);
            }
            // mysql2 parameter binding doesn't work with ORDER BY
            if (params.orderBy && OrderItemSortableColumns.has(params.orderBy)) {
                query += ` ORDER BY ${params.orderBy} ${params.sortOrder}`;
            }
            
            const result: any = await queryDatabase(connection, query, ...values);
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
            const productQuery: string = "SELECT `id`, `title`, `description`, `price`, `categoryId`, `thumbnail` FROM `product` WHERE `id` = ?";
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
            const result: any = await queryDatabase(connection, "SELECT * FROM product");
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

    public async getOrders(userId: string): Promise<Order | undefined> {
        const connection: PoolConnection = await getConnection();
        try {
            const order: any = await queryDatabase(connection, "SELECT `orderId`, `order_date`, `total_amount`, `status` FROM `orders` WHERE `userId` = ? ",userId);
            return {
                id: order[0].orderId,
                order_date: order[0].order_date,
                total_amount: order[0].total_amount,
                status: order[0].status
            };
        } catch (err) {
            console.error(err);
            
            return;
        } finally {
            connection.release();
        }
    }
    public async editProduct(product: OrderItem): Promise<boolean>{
        const connection: PoolConnection = await getConnection();
        try {
            const productOld: OrderItem | undefined = await this.getProduct(product.id.toString());
            const oldImages: string[] | undefined = productOld?.imageURLs;
            await connection.beginTransaction();
            const catagoryQueryResult: [{id: string}] = await queryDatabase(connection,"SELECT id FROM category WHERE name = ?",product.catagory ?? "");
            const catagoryId: string = catagoryQueryResult.length > 0 ? catagoryQueryResult[0].id : "1";
            const editQuery: string = "UPDATE `product` SET `title`= ? ,`description`= ? ,`price`= ? ,`thumbnail`= ? ,`categoryId`= ? WHERE `id` = ?";
            console.log(product);
            
            const result: any = await queryDatabase(connection,editQuery,product.title,product.description,product.price ?? 0,product.thumbnail ?? "",catagoryId,product.id);
            if (oldImages && result && product.imageURLs !== oldImages && product.imageURLs) {
                const deleteQuery: string = "DELETE FROM `image` WHERE `ItemId` = ?";
                await queryDatabase(connection,deleteQuery,product.id);
                const addQuery: string = "INSERT INTO `image`(`ItemId`, `url`) VALUES (?,?)";
                for (const image of product.imageURLs) {
                    await queryDatabase(connection,addQuery,product.id,image);
                }
            }
            await connection.commit();
            return true;
        } catch (err) {
            console.error(err);
            
            return false;
        } finally {
            connection.release();
        }
    }

    public async topPicks():Promise<[]>{
        const connection: PoolConnection = await getConnection();
        try {
            const results: any = queryDatabase(connection, "SELECT * FROM product WHERE top_picks = ?", 1);
            return results;
        } catch (error) {
            console.log(error);
            return [];
        } finally{
            connection.release();
        }
    }
}