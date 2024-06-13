import { UserData } from "@shared/types";

export interface IShoppingcartRepository {
    checkcart(id: number): Promise<UserData | undefined>;
    getproductinfo(id: number): Promise<UserData | undefined>;
    clearcart(id: number): Promise<UserData | undefined>;
    insertintocart(id: number, itemid: number): Promise<UserData | undefined>;
    deleteitem(id: number, itemid: number): Promise<UserData | undefined>;
}
