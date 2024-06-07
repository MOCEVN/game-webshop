import { ProductAddModel } from "@shared/formModels/ProductAddModel";
import { Order, OrderItem } from "@shared/types";
import { getQueryParameters } from "@shared/types/SortFIlter";

export interface IOrderItemRepository {
    addItem(formData: ProductAddModel): Promise<boolean>;
    getAllWithParameters(params: getQueryParameters): Promise<OrderItem[]>;
    getProduct(id: string): Promise<OrderItem | undefined>;
    
    getAll(): Promise<OrderItem[]>;
    getOrders(userId: string): Promise<Order | undefined>;
    editProduct(product: OrderItem): Promise<boolean>;
}