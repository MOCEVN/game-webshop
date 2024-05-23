import { Catagory } from "./Catagory";

export type OrderItem = {
    thumbnail: string;
    id: number;
    name: string;
    description?: string;
    price: number;
<<<<<<< HEAD
    imageURLs?: string[];
    catagory?: Catagory;
=======
    // imageURLs?: string[];
>>>>>>> 0efa8d3 (img)
};

export const OrderItemSortableColumns: Set<string> = new Set(
    [
        "id",
        "description",
        "name",
        "price"   
    ]
);