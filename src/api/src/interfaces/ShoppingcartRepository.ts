import { UserData } from "@shared/types";

export interface IShoppingcartRepository {
    checkcart(id: number): Promise<UserData | undefined>;
    getproductname(id: number): Promise<UserData | undefined>;
}
