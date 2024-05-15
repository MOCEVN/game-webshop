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

    public async addFromJson(json: string): Promise<{succeeded?: number, failed?: number, errorOccured: boolean}> {
        
        const token: string | undefined = this._tokenService.getToken();

        if (!token) {
            return {errorOccured: true};
        }

        const response: Response = await fetch(`${viteConfiguration.API_URL}store-content/admin/add-json`, {
            method: "post",
            headers: {...headers, authorization: token},
            body: json
        });
        
        if (!response.ok) {
            return {errorOccured: true};
        }
        
        return await response.json();
    }
}
