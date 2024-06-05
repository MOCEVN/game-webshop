import { ProductAddModel } from "@shared/formModels/ProductAddModel";
import { OrderItem } from "@shared/types";
import { getQueryParameters } from "@shared/types/SortFIlter";

export interface IOrderItemRepository {
    addItem(formData: ProductAddModel): Promise<boolean>;
    getAllWithParameters(params: getQueryParameters): Promise<OrderItem[]>;
    getProduct(id: string): Promise<OrderItem | undefined>;
    
    getAll(): Promise<OrderItem[]>
}