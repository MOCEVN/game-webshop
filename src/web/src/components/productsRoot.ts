import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { OrderItemService } from "../services/OrderItemService";
import { OrderItem } from "@shared/types";

@customElement("products-root")
export class productsRoot extends LitElement {
    // static
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
            /* background-image */
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
            overflow-x: scroll;
            overflow-y: scroll;
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

    @state() private game = "";

    @state()
    private _orderItemService: OrderItemService = new OrderItemService();

    @state()
    private _orderItems!: OrderItem[];

    private _sortOrder: string = "DESC";

    public connectedCallback(): void {
        super.connectedCallback();
        // als de component word geladen voer dan deze code uit
        this.getOrderItems();
    }

    private async fetchOrderItems(): Promise<OrderItem[]> {
        // do een get request met de api om alle items te krijgen en sla deze op in een array
        const result: OrderItem[] | undefined = await this._orderItemService.getAllWithParameters("id",this._sortOrder);

        if (!result) {
            return [];
        }

        return result;
        // console.log(this._orderItems);
    }

    private getOrderItems(): void {
        void this.fetchOrderItems().then((res: OrderItem[]) => {
            this._orderItems = res;
        });
    }

    private handleChange(e:Event):void {
        const target : any = e.target;
        console.log(target.value);
        if (target.value === "old-new") {
            this._sortOrder = "ASC";
        }else if (target.value = "new-old"){
            this._sortOrder = "DESC";
        }
        this.getOrderItems();
        this.requestUpdate();
    }

    private handleClick(e: Event): void{
        const target : HTMLElement = e.target as HTMLElement;
        console.log(target.id);
        window.location.href = `/productpage?id=${target.id}`;
    }

    // polymorphism
    protected render(): unknown {
        return html`
            <div class="container">
                <div class="header">
                    <h1 class="ProductsH1">Products</h1>
                    <form>
                        <label for="sort">Sort:</label>
                        <select name="sort" id="sort" @change = ${this.handleChange}>
                            <option value="new-old">New to old</option>
                            <option value="old-new">Old to new</option>
                        </select>
                    </form>
                </div>
                <div class="ProductsContainer">
                    <!-- voor elke  row van _orderItems maak je een products html-->
                    ${map(this._orderItems, (product) => {
                        // console.log(row.thumbnail);

                        if (product.thumbnail) {
                            // const image : string = row.imageURLs;
                        }

                        return html`
                            <div class="products">
                                <!-- zet per div de toebehoren gegevens uit de row in de innerhtmls -->
                                <div class="productname" @click = "${this.handleClick}" id=${product.id}>${product.title}</div>
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
