import { UserData } from "@shared/types";

export interface IShoppingcartRepository {
    checkcart(id: number): Promise<UserData | undefined>;
    getproductinfo(id: number): Promise<UserData | undefined>;
}
