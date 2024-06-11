import { LitElement, TemplateResult, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { OrderItemService } from "../services/OrderItemService";
import { OrderItem } from "@shared/types";

@customElement("products-root")
export class productsRoot extends LitElement {
    // Define the styles for this component
    public static styles = css`
    .productname {
        cursor: pointer;
    }
    .container {
        /* max-height: 90vh; */
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
    .topPicksH1{
        color: rgb(236 174 31);
        font-size: 2vw;
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
        margin-top: 1vw;
        margin-bottom: 1vw;
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
    .topPicksContainer{
        
        display: flex;
        width: 90vw;
        height: 30vh;
        background-color: #d3d3d3;
        width: 90vw;
        overflow-y: scroll;
        border-radius: 10px;
        margin-bottom: 4vw;
        overflow: scroll;
    }
    .topPick{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 70vw;
        margin: 2vw
    }
    `;

    // Initialize an instance of OrderItemService
    @state()
    private _orderItemService: OrderItemService = new OrderItemService();

    // State to hold the array of order items
    @state()
    private _orderItems!: OrderItem[];
    private _topPicks!: OrderItem[];

    // The string to initialize getAllWithParameters with the sort type
    private _sortOrder: string = "DESC";

    /*
    connectedCallback
    method that runs when the component is added to the DOM and then executes this.getOrderItems() and super.connectedCallback()
    */
    public async connectedCallback(): Promise<void> {
        super.connectedCallback();
        this.getOrderItems();
        await this.fetchTopPicks();

        console.log(new URL(window.location.toString()));
    }


    private async fetchTopPicks(): Promise<void> {
       const result1: any= await this._orderItemService.topPicks();
       console.log(result1);
       this._topPicks = result1;
    }
    /**
     * fetchOrderItems
     * Fetch order items from the API and initialises getAllWithParameters with _sortOrder
     * @returns Promise<OrderItem[]> A promise becomes an array of OrderItem objects
     */
    private async fetchOrderItems(): Promise<OrderItem[]> {
        const result: OrderItem[] | undefined = await this._orderItemService.getAllWithParameters("id", this._sortOrder);
        if (!result) {
            return [];
        }
        return result;
    }

    /**
     * getOrderItems
     * Get order items and update the state
     */
    private getOrderItems(): void {
        // Execute fetchOrderItems
        void this.fetchOrderItems().then((res: OrderItem[]) => {
            // If successful, store the returned OrderItem array in the _orderItems state
            this._orderItems = res;
        });
    }

    /**
     * handleChange
     * Handle change events on the sort dropdown and assigns values to _sortOrder
     * @param e event
     */
    private handleChange(e: Event): void {
        const target: any = e.target;
        // console.log(target.value);
        if (target.value === "old-new") {
            this._sortOrder = "ASC";
        } else if (target.value === "new-old") {
            this._sortOrder = "DESC";
        }
        this.getOrderItems();
        this.requestUpdate();
    }

    /**
     * handleClick
     * Handle clicks on product names and send you to a productpage url with the id in the query string
     * @param e event
     */
    private handleClick(e: Event): void {
        const target: HTMLElement = e.target as HTMLElement;
        window.location.href = `/productpage?id=${target.id}`;
    }


    protected render(): TemplateResult {
        return html`
            <div class="container">
                <div class="header">
                    <h1 class="ProductsH1">Products</h1>
                    <form>
                        <label for="sort">Sort:</label>
                        <!-- If you choose an option of the dropdown, then execute handleChange -->
                        <select name="sort" id="sort" @change=${this.handleChange}>
                            <option value="new-old">New to old</option>
                            <option value="old-new">Old to new</option>
                        </select>
                    </form>
                </div>
                <h1 class="topPicksH1" >Top Picks!</h1>
                <div class= "topPicksContainer">
                ${map( this._topPicks, (product)=>{
                    return html`
                   
                        <div class= "topPick">
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
                <div class="ProductsContainer">
                

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
