import { Catagory } from "./Catagory";

export type OrderItem = {
    itemId: any;
    thumbnail: string;
    id: number;
    title: string;
    description: string;
    price: number;
    catagory?: Catagory;
    imageURLs?: string[];
};

export const OrderItemSortableColumns: Set<string> = new Set(
    [
        "id",
        "description",
        "title",
        "price"   
    ]
);