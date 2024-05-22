import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { OrderItemService } from "../services/OrderItemService";
import { OrderItem } from "@shared/types";

@customElement("products-root")
export class productsRoot extends LitElement {

    // static
    public static styles = css`
        .container {
            /* max-height: 95vh; */
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .header {
            height: 10vh;
        }
        .ProductsH1 {
            color: #373e98;
        }
        .ProductsContainer {
            padding-top: 1vw;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            background-color: #d3d3d3;
            width: 90vw;
            /* height: 90vh; */
            overflow-y: scroll;
            border-radius: 10px;
        }
        .products {
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
        .description{
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 60%;
            width: 90%;
            padding:10px;
            overflow-x: scroll;
            overflow-y: scroll;
        }
        .price{
            display: flex;
            flex-direction: row-reverse;
            width: 100%;
            padding-right: 10%;
            color: green;
        }
    `;

    @state() private game = "";

    @state()
    private _orderItemService: OrderItemService = new OrderItemService();

    @state()
    private _orderItems: OrderItem[] = [];

    public async connectedCallback(): Promise<void> {
        super.connectedCallback();
        // als de component word geladen voer dan deze code uit
        await this.getOrderItems();
    }

    private async getOrderItems(): Promise<void> {
        // do een get request met de api om alle items te krijgen en sla deze op in een array
        const result: OrderItem[] | undefined = await this._orderItemService.getAll();

        if (!result) {
            return;
        }

        this._orderItems = result;
        // console.log(this._orderItems);
    }

    // polymorphism
    protected render(): unknown {
        return html`
            <div class="container">
                <div class="header">
                    <h1 class="ProductsH1">Products</h1>
                </div>
                <div class="ProductsContainer">
                    <!-- voor elke  row van _orderItems maak je een products html-->
                    ${map(this._orderItems, (row) => {

                        console.log(row.thumbnail);

                        if(row.imageURLs){
                            // const image : string = row.imageURLs;
                        };

                        return html `
                        <div class="products">
                            <!-- zet per div de toebehoren gegevens uit de row in de innerhtmls -->
                            <div class="productname">${row.name}</div>
                            <div class="description">${row.description}</div>
                            <div class="price">${row.price}</div>
                        </div>
                        `;
                    })}
                </div>
            </div>
        `;
    }
}
