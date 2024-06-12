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
    /**
     * Get all order items
     *
     * @returns A list of all order items when successful, otherwise `undefined`.
     */
    public async checkcart(): Promise<OrderItem[] | undefined> {
        const token: string | undefined = this._tokenService.getToken();
        if (!token) {
            return undefined;
        }
        const response: Response = await fetch(`${viteConfiguration.API_URL}users/cart`, {
            method: "get",
            headers: { ...headers, authorization: token },
        });
        if (!response.ok) {
            console.error(response);
            return undefined;
        }

        return (await response.json()) as OrderItem[];
    }
    public async getproductinfo(id: number): Promise<OrderItem[] | undefined> {
        const token: string | undefined = this._tokenService.getToken();
        if (!token) {
            return undefined;
        }
        const response: Response = await fetch(`${viteConfiguration.API_URL}users/cart/${id}`, {
            method: "get",
            headers: { ...headers, authorization: token },
        });
        if (!response.ok) {
            console.error(response);
            return undefined;
        }

        return (await response.json()) as OrderItem[];
    }
    public async clearcart(): Promise<OrderItem[] | undefined> {
        const token: string | undefined = this._tokenService.getToken();
        if (!token) {
            return undefined;
        }
        const response: Response = await fetch(`${viteConfiguration.API_URL}users/cart`, {
            method: "post",
            headers: { ...headers, authorization: token },
        });
        if (!response.ok) {
            console.error(response);
            return undefined;
        }

        return (await response.json()) as OrderItem[];
    }
    public async insertintocart(itemid: number): Promise<OrderItem[] | undefined> {
        const token: string | undefined = this._tokenService.getToken();
        if (!token) {
            return undefined;
        }
        const response: Response = await fetch(`${viteConfiguration.API_URL}users/cart/${itemid}`, {
            method: "post",
            headers: { ...headers, authorization: token },
        });
        if (!response.ok) {
            console.error(response);
            alert("je moet ingelogd zijn om hier te zijn");
            return undefined;
        }

        return (await response.json()) as OrderItem[];
    }
}
