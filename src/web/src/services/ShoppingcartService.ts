import { OrderItem } from "@shared/types";

/**
 * Handles order item related functionality
 */
export class ShoppingcartService {

    public async checkcart(id: string): Promise<OrderItem | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}users/cart/${id}`, {
            method: "get",
        });

        console.log(response);
        
        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return (await response.json()) as OrderItem;
    
    }
}
