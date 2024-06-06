import { OrderItem } from "@shared/types";
import { TokenService } from "./TokenService";

const headers: { "Content-Type": string } = {
    "Content-Type": "application/json",
};

/**
 * Handles order item related functionality
 */
// TODO Omar: Voeg commentaar toe om token-truc uit te leggen
export class ShoppingcartService {
    private _tokenService: TokenService = new TokenService();
    public async checkcart(id: number): Promise<OrderItem[] | undefined> {
        const token: string | undefined = this._tokenService.getToken();
        if (token) {
            const response: Response = await fetch(`${viteConfiguration.API_URL}users/cart/${id}`, {
                method: "get",
                headers: { ...headers, authorization: token },
            });
            if (!response.ok) {
                console.error(response);
                return undefined;
            }

            return (await response.json()) as OrderItem[];
        } else {
            return undefined;
        }
    }
}
