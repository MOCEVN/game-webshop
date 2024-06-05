import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { OrderItemService } from "../services/OrderItemService";
import { OrderItem } from "@shared/types";

@customElement("products-root")
export class productsRoot extends LitElement {
    // Define the styles for this component
    public static styles = css`
    .productname{
        cursor: pointer;
    }
        .container {
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .header {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            height: 10vh;
        }
        .ProductsH1 {
            color: #373e98;
        }
        .ProductsContainer {
            /* background image */
            padding-top: 1vw;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            background-color: #d3d3d3;
            width: 90vw;
            height: 80vh;
            overflow-y: scroll;
            border-radius: 10px;
            margin-bottom: 4vw;
        }
        .products {
            justify-content: space-evenly;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 1vw;
            margin-right: 1vw;
            margin-bottom: 1vh;
            background-color: #ffffff;
            width: 20vw;
            /* min-width: 150px; */
            height: 25vh;
            border-radius: 10px;
            padding: 15px, 15px, 15px, 15px;
        }
        .description {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 20%;
            width: 90%;
            padding: 10px;
            overflow-y: auto;
            overflow-wrap: anywhere;
        }
        .price {
            display: flex;
            flex-direction: row-reverse;
            width: 100%;
            padding-right: 10%;
            color: green;
        }
        .image {
            border-radius: 10px;
            height: 40%;
            width: 50%;
        }
    `;

    // Initialize an instance of OrderItemService
    @state()
    private _orderItemService: OrderItemService = new OrderItemService();

    // State to hold the array of order items
    @state()
    private _orderItems!: OrderItem[];

    // The string to initialize getAllWithParameters with the sort type
    private _sortOrder: string = "DESC";

    // Lifecycle method that runs when the component is added to the DOM
    public connectedCallback(): void {
        super.connectedCallback();
        // Fetch the order items when the component is loaded
        this.getOrderItems();

        console.log(new URL(window.location.toString()));
    }

    // Fetch order items from the API
    private async fetchOrderItems(): Promise<OrderItem[]> {
        // Perform a GET request with the API to retrieve all items and store them in an array
        const result: OrderItem[] | undefined = await this._orderItemService.getAllWithParameters("id", this._sortOrder);
        // If there is no result, return an empty array
        if (!result) {
            return [];
        }
        // Return the result
        return result;
    }

    // Get order items and update the state
    private getOrderItems(): void {
        // Execute fetchOrderItems
        void this.fetchOrderItems().then((res: OrderItem[]) => {
            // If successful, store the returned OrderItem array in the _orderItems state
            this._orderItems = res;
        });
    }

    // Handle changes to the sort order
    private handleChange(e: Event): void {
        const target: any = e.target;
        console.log(target.value);
        if (target.value === "old-new") {
            this._sortOrder = "ASC";
        } else if (target.value === "new-old") {
            this._sortOrder = "DESC";
        }
        this.getOrderItems();
        this.requestUpdate();
    }

    // Handle clicks on product names
    private handleClick(e: Event): void {
        // Store the HTML element that was clicked in the target const
        const target: HTMLElement = e.target as HTMLElement;
        // Navigate to the product page with the clicked product's id
        window.location.href = `/productpage?id=${target.id}`;
    }

    // Polymorphism: Override the render method to define the HTML structure
    protected render(): unknown {
        return html`
            <div class="container">
                <div class="header">
                    <h1 class="ProductsH1">Products</h1>
                    <form>
                        <label for="sort">Sort:</label>
                        <select name="sort" id="sort" @change=${this.handleChange}>
                            <option value="new-old">New to old</option>
                            <option value="old-new">Old to new</option>
                        </select>
                    </form>
                </div>
                <div class="ProductsContainer">
                    <!-- For each row of _orderItems, create a product HTML element -->
                    ${map(this._orderItems, (product) => {
                        return html`
                            <div class="products">
                                <!-- When the product name is clicked, execute handleClick -->
                                <div class="productname" @click="${this.handleClick}" id=${product.id}>${product.title}</div>
                                <div
                                    class="image"
                                    style="background: url(${product.thumbnail}) ;
                        background-position: center;
                        background-size: 100%;
                        background-repeat: no-repeat;
            "
                                ></div>
                                <div class="description">${product.description}</div>
                                <div class="price">${product.price}</div>
                            </div>
                        `;
                    })}
                </div>
            </div>
        `;
    }
}
