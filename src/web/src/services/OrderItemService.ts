import { OrderItem } from "@shared/types";
import { TokenService } from "./TokenService";

const headers: { "Content-Type": string } = {
    "Content-Type": "application/json",
};
/**
 * Handles order item related functionality
 */
export class OrderItemService {
    private _tokenService: TokenService = new TokenService();

    /**
     * Get all order items
     * 
     * @returns A list of all order items when successful, otherwise `undefined`.
     */
    public async getAll(): Promise<OrderItem[] | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}orderItems`, {
            method: "get",
        });

        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return (await response.json()) as OrderItem[];
    }

    public async getAllWithParameters(orderBy: string = "", sortOrder: string = "ASC", search: string = "", searchType: string = "name"): Promise<OrderItem[] | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}store-content/all?${(new URLSearchParams({
            orderBy: orderBy,
            sortOrder: sortOrder,
            search: "%" + search + "%",
            searchType: searchType,
        })).toString()}`, {
            method: "get",
        });
        
        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return (await response.json()) as OrderItem[];
    }

    public async getProduct(id: string): Promise<OrderItem | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}store-content/all/${id}`, {
            method: "get",
        });
        
        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return (await response.json()) as OrderItem;
    }
    /**
     * Handles adding a product to the database
     * @param formData Data to use for adding a product
     * @returns `true` when successful, otherwise `false`.
     */
    public async add(product: OrderItem | any): Promise<boolean> {
        
        const token: string | undefined = this._tokenService.getToken();

        if (!token) {
            return false;
        }

        const response: Response = await fetch(`${viteConfiguration.API_URL}store-content`, {
            method: "post",
            headers: { ...headers, authorization: token},
            body: JSON.stringify([product])
        });
        
        if (!response.ok) {
            return false;
        }
        
        return (await response.json()) as boolean;
    }

    public async addMultiple(products: any): Promise<{succeeded?: number, failed?: number, errorOccured: boolean}> {
        
        const token: string | undefined = this._tokenService.getToken();

        if (!token) {
            return {errorOccured: true};
        }

        const response: Response = await fetch(`${viteConfiguration.API_URL}store-content`, {
            method: "post",
            headers: {...headers, authorization: token},
            body: typeof products === "string" ? products : JSON.stringify(products)
        });
        
        if (!response.ok) {
            return {errorOccured: true};
        }
        
        return await response.json();
    }
}
