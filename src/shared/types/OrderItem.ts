import { Catagory } from "./Catagory";

export type OrderItem = {
    thumbnail: string;
    id: number;
    name: string;
    description?: string;
    price: number;
    catagory?: Catagory;
    imageURLs?: string[];
};

export const OrderItemSortableColumns: Set<string> = new Set(
    [
        "id",
        "description",
        "name",
        "price"   
    ]
);